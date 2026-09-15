# Classifieds

Classifieds is a full-stack web application created as part of the Kodilla Web Developer Bootcamp.

The application allows users to browse and search classified advertisements, create an account, sign in and manage their own ads.

## Live Demo

https://kodilla-classifieds.onrender.com

## Features

- Browse classified advertisements
- Search advertisements by phrase
- View advertisement details
- User registration with avatar upload
- User sign in and sign out
- Persistent user sessions
- Add new advertisements with images
- Edit own advertisements
- Delete own advertisements
- Authorization of protected operations
- Responsive advertisements grid
- Loading and error handling

## Technologies

### Frontend

- React
- React Router
- Redux Toolkit
- React Redux
- Fetch API

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- express-session
- connect-mongo
- Multer
- bcryptjs

## Installation

Clone the repository:

```bash
git clone https://github.com/Kam9521/kodilla-classifieds.git
cd kodilla-classifieds
```

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

The `.env` file contains sensitive data and should not be committed to the repository.

## Running the Application

Start the backend from the project root:

```bash
npm run dev
```

Start the React frontend in a separate terminal:

```bash
cd client
npm start
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8000
```

## Production

Create the production frontend build:

```bash
cd client
npm run build
```

Start the production server from the project root:

```bash
npm start
```

The production version is deployed on Render and uses MongoDB Atlas.

## Author

Kamil Mytyl
