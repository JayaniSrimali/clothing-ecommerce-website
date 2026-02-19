# Luxe Clothing E-Commerce

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React/Next.js, Node.js).

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Axios
- **Backend**: Node.js, Express, MongoDB
- **Key Features**: 
  - JWT Authentication
  - Stripe Payments (Integration ready)
  - Cloudinary Image Uploads (Integration ready)
  - Shopping Cart State Management

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` or use the provided one. Update `MONGO_URI` with your local or Atlas connection string.
4. Run the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Folder Structure

- `/backend`: API Server and Database Models
- `/frontend`: Next.js Client Application
  - `/app`: Pages and Layouts
  - `/components`: Reusable UI Components
  - `/context`: Global State (Cart)

## Notes

- Ensure MongoDB is running locally or provide a valid Atlas URI.
- For image uploads and payments, configure Cloudinary and Stripe API keys in `.env` files.
