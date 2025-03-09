

# SpiritX_Byte_Builders_01

## Overview
SpiritX_Byte_Builders_01 is a web application built using React, Node.js, and MySQL that implements a login and signup system. The app integrates various tools and technologies to ensure efficient communication between the frontend and backend, secure password management, and seamless user authentication.

### Features
- User signup and login functionality
- Secure password hashing using bcrypt
- API calls using Axios for frontend-backend communication
- MySQL for database management
- Use of CORS, Express, and Nodemon for server and request handling
- Real-time updates with Nodemon

## Technologies Used
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Security:** bcrypt for password hashing
- **API Integration:** Axios
- **Server Management:** Nodemon
- **Request Handling:** BodyParser, CORS, and MySQL2

## Installation

### Prerequisites
- Node.js and npm installed on your machine.
- MySQL database installed and configured.

### Steps to Run Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/SpiritX_Byte_Builders_01.git
   ```

2. **Install Backend Dependencies:**
   Go to the backend folder and install the required dependencies:
   ```bash
   cd backend
   npm install
   ```

3. **Configure MySQL Database:**
   - Set up your MySQL database.
   - Update your MySQL connection details in the backend environment configuration (e.g., `.env` file).

4. **Run the Backend:**
   Use Nodemon to run the server:
   ```bash
   npm run dev
   ```

5. **Install Frontend Dependencies:**
   Go to the frontend folder and install the required dependencies:
   ```bash
   cd frontend
   npm install
   ```

6. **Run the Frontend:**
   ```bash
   npm start
   ```

7. **Access the Application:**
   Open your browser and visit `http://localhost:3000` for the frontend and `http://localhost:4008` for the backend (or your configured backend port).

## Commit Messages
- **Release Project 01 - v1.0:** Initial commit with React, Node.js, and MySQL login and signup system. Integrated CORS, Express, Axios, bcrypt, MySQL2, and Nodemon.
