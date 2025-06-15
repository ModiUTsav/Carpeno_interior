## Carpeno.in Website
Welcome to the official repository for Carpeno.in, a modern interior design and architectural website. This project features a responsive frontend built with React (Vite & TypeScript) and Material-UI, powered by a robust backend developed with Python FastAPI and MongoDB.

Table of Contents
About the Project
Features
Technologies Used
Getting Started
Prerequisites
Backend Setup (FastAPI & MongoDB)
Frontend Setup (React-Vite-TS)
Project Structure
Deployment
Contributing
License
Contact
## 1. About the Project
Carpeno.in is designed to showcase the exquisite work of Carpeno Interior Design, providing users with a seamless and visually engaging experience across all devices. The website features:

Hero Section: Dynamic carousel showcasing key interior design concepts.
Services Section: Detailed overview of services offered (e.g., Turn-key Solutions, Office Interiors).
Our Work/Portfolio: A responsive gallery of completed projects, potentially including video showcases.
Contact & Inquiry Forms: Easy ways for potential clients to get in touch.
Admin Panel (if applicable): [Mention if you have one, e.g., "An administrative interface for managing projects, services, and content."]
## 2. Features
Responsive Design: Optimized for seamless viewing on desktops, tablets, and mobile devices.
Interactive UI: Built with Material-UI for a modern and consistent user experience.
Fast & Efficient Backend: FastAPI ensures high performance and easy API development.
Flexible Database: MongoDB provides a scalable and flexible NoSQL database solution.
Client-side Routing: Smooth navigation without page reloads.
## 3. Technologies Used
Frontend
React.js: A JavaScript library for building user interfaces.
Vite: A fast build tool that provides a lightning-fast development experience for modern web projects.
TypeScript: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer experience.
Material-UI (MUI): A comprehensive suite of UI tools and components for building elegant React applications.
react-responsive-carousel: For the hero image slider.
react-router-dom: For client-side routing.
axios or fetch API: For making API requests to the backend.
Backend
Python: The programming language for the backend logic.
FastAPI: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
MongoDB: A NoSQL document database used for storing website content, project details, service information, and potentially contact inquiries.
uvicorn: An ASGI server to run the FastAPI application.
pymongo or Motor: Python driver(s) for interacting with MongoDB.
python-dotenv (if used for environment variables): For loading environment variables.
pydantic: For data validation and settings management (often used implicitly by FastAPI).
## 4. Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (LTS version recommended) & npm (or Yarn)
Python 3.8+ (or your specific version)
pip (Python package installer)
MongoDB Community Server: Install MongoDB and ensure it's running.
Git
Backend Setup (FastAPI & MongoDB)
Clone the repository:

```Bash

git clone https://github.com/your-username/carpeno.in.git
cd carpeno.in/backend # Assuming your backend is in a 'backend' folder
Create a virtual environment (recommended): ````

```Bash

python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
Install backend dependencies:
```
``` Bash

pip install -r requirements.txt
If you don't have a requirements.txt yet, create one by running pip freeze > requirements.txt after installing your dependencies manually, e.g., pip install fastapi uvicorn "pymongo[srv]" python-dotenv

MongoDB Configuration:

Ensure your MongoDB server is running locally (default usually mongodb://localhost:27017/).
Create a .env file in your backend directory (at the same level as main.py or your primary FastAPI app file) and add your MongoDB connection string and database name:
Code snippet

MONGO_DB_URL="mongodb://localhost:27017/" # Or your MongoDB Atlas connection string
MONGO_DB_NAME="CarpenoDB" # Or whatever you named your database
Adjust your FastAPI code (main.py or database.py) to read these environment variables.
Run the FastAPI application:
```
``` Bash

uvicorn main:app --reload --port 8000
(Replace main:app with your actual app entry point if different).
Your backend API should now be running at http://localhost:8000. You can access the API documentation (Swagger UI) at http://localhost:8000/docs.

Frontend Setup (React-Vite-TS)
Navigate to the frontend directory: 
```

``` Bash

cd ../frontend # Assuming your frontend is in a 'frontend' folder, sibling to 'backend'
Install frontend dependencies:
```
```Bash

npm install # Or yarn install
Configure API Endpoint:

Create a .env.development file in your frontend root directory:
Code snippet

VITE_API_BASE_URL=http://localhost:8000/api # Match your FastAPI backend URL (e.g., where your API endpoints like /api/projects reside)
Vite will automatically pick this up for development.
Run the React development server:
```
``` Bash

npm run dev # Or yarn dev
Your frontend should now be running at http://localhost:5173 (or another port Vite assigns).
```
## 5. Project Structure
Here's a high-level overview of the expected project structure:

carpeno.in/
├── .git/
├── backend/
│   ├── venv/                       # Python virtual environment
│   ├── main.py                     # FastAPI application entry point
│   ├── database.py                 # MongoDB connection and utility functions
│   ├── routers/                    # API route definitions (e.g., projects.py, services.py)
│   ├── models/                     # Pydantic models for data validation
│   ├── schemas/                    # Pydantic schemas for API response/request validation
│   ├── config.py                   # Configuration settings (if not using .env directly in main)
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # Template for environment variables (copy to .env)
├── frontend/
│   ├── public/                     # Static assets (images, favicon)
│   ├── src/
│   │   ├── components/             # Reusable React components (e.g., Hero, Navbar, Footer)
│   │   ├── pages/                  # Top-level page components (e.g., Home.tsx, Work.tsx, Contact.tsx)
│   │   ├── assets/                 # Images, icons specific to frontend
│   │   ├── styles/                 # Global CSS or Material-UI theme configurations
│   │   ├── services/               # API interaction logic (e.g., api.ts)
│   │   ├── App.tsx                 # Main application component
│   │   └── main.tsx                # React entry point
│   ├── index.html                  # Main HTML file
│   ├── vite.config.ts              # Vite configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── package.json                # Frontend dependencies and scripts
│   ├── .env.development.example    # Template for development environment variables
│   ├── .env.production.example     # Template for production environment variables
│   └── README.md                   # Frontend specific README (optional, but good for large projects)
├── .gitignore                      # Specifies intentionally untracked files to ignore
└── README.md                       # This file
## 6. Deployment
Deployment to Hostinger involves:

Backend (FastAPI):

Upload your backend files (excluding venv/ and __pycache__/) to a suitable directory on your Hostinger server (e.g., api_backend/ if using a subdomain, or public_html/api/ if within the main domain).
Ensure Python and uvicorn are available on your Hostinger environment. You might need to configure a custom entry point (e.g., a Phusion Passenger setup or a WSGI file) to run your FastAPI app persistently. Hostinger support documentation might have specific guides for Python/FastAPI.
Configure your MongoDB connection string in the .env file on the server to point to your live MongoDB instance (e.g., MongoDB Atlas).
Frontend (React-Vite-TS):

Run npm run build (or yarn build) locally to create the optimized dist folder.
Upload the contents of the dist folder to your Hostinger public_html directory.
Create or update the .htaccess file in public_html to handle client-side routing for React (as provided in previous responses).
Create a .env.production file locally with your live API URL (e.g., VITE_API_BASE_URL=https://caroeno.in/api or https://api.caroeno.in). This file is used during the npm run build process.
For detailed Hostinger deployment steps, refer to their official documentation and knowledge base.

## 7. Contributing
If you wish to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/AmazingFeature).
Make your changes and commit them (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.




## Project Link: https://carpeno.in
