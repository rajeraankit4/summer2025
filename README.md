# Summer2025 Project Setup and Run Instructions

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd summer2025backened
   ```

2. Create a `.env` file based on `.env.example` and set your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string_here
   PORT=5000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Seed the database with initial data (optional but recommended):
   ```bash
   node seed.js
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

   The backend server will run on `http://localhost:5000` by default.

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontened
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` by default.

## Testing the Application

- Open your browser and go to `http://localhost:5173`.
- Use the signup flow to register a new student account.
- Verify email, fill personal details, upload documents, and complete registration.
- Use the login page to log in as a student or admin.
- Explore role-based dashboards and features.

## Notes

- Ensure MongoDB is running and accessible via the connection string you provide.
- The backend uses CORS to allow requests from the frontend development server.
- If you change ports, update the `baseURL` in `Frontened/src/api/axiosConfig.js` accordingly.

## Troubleshooting

- Check terminal logs for errors during startup or API calls.
- Verify environment variables are correctly set.
- Ensure all dependencies are installed.

---

This setup should get your full project running with working frontend and backend.
