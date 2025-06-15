from fastapi import FastAPI, Form, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from bson import ObjectId

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, PyMongoError
import time
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient


# --- MongoDB Configuration ---
CONTACT_US_COLLECTION_NAME = "ContactUsEntries"
CONSULTATION_COLLECTION_NAME = "ConsultationRequests"

mongo_details = "mongodb://localhost:27017/"
db_name = "Intrior_Design"

client: AsyncIOMotorClient = None
db = None
contact_us_collection_obj = None
consultation_collection_obj = None


# Pydantic PyObjectId
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, info):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        json_schema = handler(core_schema)
        json_schema.update(type="string")
        return json_schema

# --- Pydantic Models for Data ---

class ContactUsForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    mobile_no: str = Field(..., pattern=r"^\d{10}$", description="10-digit mobile number") # Added regex validation for mobile_no
    email: EmailStr
    message: str

class ContactUsInDB(ContactUsForm):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    submitted_at: float

    class Config:
        populate_by_name = True # Renamed from allow_population_by_field_name for Pydantic V2
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ConsultationForm(BaseModel):
    fullName: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    mobileNo: str = Field(..., pattern=r"^\d{10}$", description="10-digit mobile number")
    city: str = Field(..., min_length=2, max_length=50)
    property: Literal["2 BHK", "3 BHK", "4 BHK", "Other"] = "2 BHK"

class ConsultationInDB(ConsultationForm):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    submitted_at: float
    status: Literal["new", "contacted", "resolved"] = "new"

    class Config:
        populate_by_name = True # Renamed from allow_population_by_field_name for Pydantic V2
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


# --- FastAPI Lifespan Context Manager ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db, contact_us_collection_obj, consultation_collection_obj
    try:
        client = AsyncIOMotorClient(mongo_details)
        db = client[db_name]
        contact_us_collection_obj = db[CONTACT_US_COLLECTION_NAME]
        consultation_collection_obj = db[CONSULTATION_COLLECTION_NAME]

        print(f"Connected to MongoDB: {mongo_details}")
    except ConnectionFailure as e:
        print(f"Could not connect to MongoDB: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not connect to the database during startup."
        )

    yield

    if client:
        client.close()
        print("Disconnected from MongoDB.")

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Endpoints ---

@app.post("/api/contact-us", response_model=ContactUsInDB, status_code=status.HTTP_201_CREATED)
async def submit_contact_us_form(form_data: ContactUsForm):
    if contact_us_collection_obj is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database collection not initialized.")
    
    print(f"Received contact us form data: {form_data}")

    contact_us_data_dict = form_data.model_dump()
    contact_us_data_dict["submitted_at"] = time.time() # Add submitted_at field

    try:
        result = await contact_us_collection_obj.insert_one(contact_us_data_dict)
        created_doc = await contact_us_collection_obj.find_one({"_id": result.inserted_id})
        
        if created_doc:
            # Pass the dictionary using ** to unpack it into keyword arguments
            return ContactUsInDB(**created_doc) 
        else:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to retrieve created contact us entry.")
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while inserting contact us data: {str(e)}"
        )


@app.post("/api/consultation",response_model=ConsultationInDB, status_code=status.HTTP_201_CREATED)
async def submit_consultation_form(form_data: ConsultationForm):
    if consultation_collection_obj is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database collection not initialized.")
    print(f"Received consultation form data: {form_data}")
    consultation_data_dict = form_data.model_dump()
    consultation_data_dict["submitted_at"] = time.time()

    try:
        result = await consultation_collection_obj.insert_one(consultation_data_dict)
        created_doc = await consultation_collection_obj.find_one({"_id": result.inserted_id})
        if created_doc:
            # Pass the dictionary using ** to unpack it into keyword arguments
            return ConsultationInDB(**created_doc)
        else:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to retrieve created consultation entry.")
    except PyMongoError as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail= f"An error occurred while inserting consultation data: {str(e)}"

        )

# ---
# @app.get("/api/contact-us", response_model=list[ContactUsInDB])
# async def get_all_contact_us_entries():
#     if not contact_us_collection_obj:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database not initialized.")
    
#     entries = []
#     try:
#         # Use .to_list() with await for motor's find method
#         docs = await contact_us_collection_obj.find().to_list(length=100) # Fetch up to 100 documents
#         for doc in docs:
#             entries.append(ContactUsInDB(**doc))
#         return entries
#     except PyMongoError as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error: {e}")

# ---
# @app.get("/api/consultation", response_model=list[ConsultationInDB])
# async def get_all_consultation_entries():
#     if not consultation_collection_obj:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database not initialized.")
    
#     entries = []
#     try:
#         # Use .to_list() with await for motor's find method
#         docs = await consultation_collection_obj.find().to_list(length=100) # Fetch up to 100 documents
#         for doc in docs:
#             entries.append(ConsultationInDB(**doc))
#         return entries
#     except PyMongoError as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error: {e}")

# ---
# @app.get("/")
# async def read_root():
#     return {"message": "Welcome to the Interior Design Backend API!"}