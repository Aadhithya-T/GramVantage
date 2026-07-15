# GramVantage

GramVantage is a full-stack MERN application designed to support rural development and governance workflows. It connects village citizens, government officials, and NGOs on a single platform for local news, project tracking, agricultural assistance, and inter-department collaboration.

---

## E2E Core Features

### 1. User Registration & Role-based Authentication
- Multi-role support for **Village Citizens**, **Government Officials**, and **NGOs** using secure JWT authorization.
- Distinct sign-up flows validating specific fields (e.g., Aadhar numbers for citizens, 5-digit organization codes for officials and NGOs).

### 2. Available Schemes & Applications
- Officials can manage (create, retrieve, and delete) welfare schemes.
- Citizens can browse active schemes and apply directly. 
- Officials can view applications for each scheme in real-time to approve or reject them.

### 3. Job Directory & Application Hub
- Officials can post, view, and delete local employment opportunities.
- Citizens can search active job listings, apply, and view live status feedback (`Pending`, `Approved`, `Rejected`) on their dashboard.
- Officials can inspect applicant profiles (names, mobile numbers) and process their applications.

### 4. Farmer-Official Agricultural Portal
- Farmers/citizens can request consultations with agricultural officers by picking a date and detailing their inquiry (e.g., soil health, crop issues, or subsidies).
- Citizens can monitor the status of their scheduled appointments.
- Officials can access an **Agri Appointments** reviews page to approve or reject upcoming consultations.

---

## Tech Stack

- **Frontend**: React, React Router, Framer Motion, Axios (with auth interceptors)
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose schemas)
- **Security**: JWT Authentication, bcryptjs password hashing

---

## Local Setup

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/GramVantage
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.
