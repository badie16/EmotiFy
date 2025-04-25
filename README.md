# EmotiFy - Emotion Analysis Application with Gemini AI

EmotiFy is a web application that allows users to analyze the emotions present in a text using Google Gemini's artificial intelligence.

## Features

- Clean and responsive interface  
- Text input area  
- Emotion analysis with Google Gemini AI  
- Result visualization with colorful charts (pie/bar)  
- Analysis history  
- PDF export of results  
- Public API with access key  

## Technologies Used

### Frontend

- React with Vite  
- Tailwind CSS for styling  
- Recharts for data visualization  
- React Router for navigation  
- Axios for HTTP requests  

### Backend

- Node.js with Express  
- PostgreSQL via Supabase  
- Google Gemini AI for emotion analysis  

## Installation and Startup

### Prerequisites

- Node.js (v14 or higher)  
- npm or yarn  
- Supabase account  
- Gemini API key (Google AI Studio)  

### Frontend

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file at the root of the frontend folder with:

    ```
    VITE_API_URL=http://localhost:3001/api
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

### Backend

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file at the root of the backend folder with:

    ```
    PORT=3001
    GEMINI_API_KEY=your_gemini_api_key
    SUPABASE_CONNECTION_STRING=your_supabase_connection_string
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

## Deployment

### Frontend

The frontend can be deployed on Vercel, Netlify, or any other static hosting service.

### Backend

The backend can be deployed on Vercel, Heroku, or any other Node.js hosting service.

## License

This project is licensed under the MIT License.

---

**Developed by Badie Bahida**
