# Mallikni - Real Estate Property Listing Platform

Mallikni is a real estate property listing platform where users can browse, list, and manage properties. Property owners can add, edit, or delete their listings, while seekers can filter properties and manage their favorites. The platform offers secure user authentication and allows users to manage their personal accounts.

## Tech Stack

-   **Frontend**: TypeScript, React.js, Vite
-   **Backend**: TypeScript, Node.js, Express.js, MongoDB
-   **Image Storage**: AWS S3
-   **Email Service**: Nodemailer

## Features

-   **Property Listings**: Users can browse, filter, and view properties based on various criteria such as location and price.
-   **Account Management**: Users can create accounts, update personal details, change passwords, upload profile pictures, manage data, and delete their accounts.
-   **Property Management**: Property owners can list new properties, update existing listings, and delete their properties.
-   **Favorites**: Users can save their favorite properties for later viewing.
-   **Secure Authentication**: Users can securely log in and out, with token-based authentication using JWT.
-   **Email Notifications**: Nodemailer is used to send email notifications to users for actions like account email verification.

### Client Environment Variables (`./client/.env`)

```env
VITE_API_URL = "http://localhost:3000"
```

### Server Environment Variables (`./server/.env`)

```env
CLIENT_URL = "http://localhost:5173"
PORT = "3000"
SECRET = "some very important secret"
DB_URI = "<mongodb://uri>"
DB_NAME = "<database name>"
S3_BUCKET_NAME = "<bucket name>"
S3_BUCKET_REGION = "<bucket region>"
S3_ACCESS_KEY = "<access key>"
S3_SECRET_ACCESS_KEY = "<secret access key>"
EMAIL_USER = "<example@mail.com>"
EMAIL_APP_PASS = "<email access password>"
```

## How to Run the Project Locally

To run the Mallikni project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mallikni.git
cd mallikni
```

### 2. Set up the Server

-   Navigate to the `server` directory:

```bash
cd server
```

-   Install dependencies:

```bash
npm install
```

-   Create a `.env` file in the `server` directory and configure it with the appropriate environment variables (refer to the **Server Environment Variables** section above).

-   Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

### 3. Set up the Client

-   Navigate to the `client` directory:

```bash
cd ../client
```

-   Install dependencies:

```bash
npm install
```

-   Create a `.env` file in the `client` directory and configure the API URL:

```env
VITE_API_URL = "http://localhost:3000"
```

-   Start the client:

```bash
npm run dev
```

The client will be available at `http://localhost:5173`.

### 4. Access the Application

Once both the server and client are running, you can access the application by navigating to `http://localhost:5173` in your browser.

## Deployment

-   For production deployment, configure the server and client to point to production API and bucket URLs in their respective `.env` files.
-   Server can be deployed on a service like Render.com, Heroku, AWS, or DigitalOcean.
-   Client can be hosted on a static hosting service like Vercel, Netlify, or AWS S3.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Mohamed Bakour](https://bakour.dev)
