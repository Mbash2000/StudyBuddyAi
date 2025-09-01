AI Study Buddy

A Vibe Coding 4-3-2 Hackathon project to generate and save AI-powered flashcards from study notes, with user authentication and premium features via Paystack.

Overview:

AI Study Buddy is a web application that helps students create flashcards instantly from study notes using the Hugging Face Question-Answering API. Users can register/login via Supabase Auth, generate flashcards, and save them for reuse with a premium subscription powered by Paystack. The app features a modern UI with Tailwind CSS and is deployed on Bolt.new.

Features:

-User Authentication: Register, login, and logout using Supabase Auth.
-Flashcard Generation: Input study notes to generate 5 flashcards via Hugging Face API.
-Premium Feature: Save flashcards to Supabase for reuse, monetized via Paystack payments.
-Secure Design: Row Level Security (RLS), input sanitization, and environment variables.
-Interactive UI: Flip-style flashcards with Tailwind CSS for a student-friendly experience.

Tech Stack:

-Frontend: HTML5, CSS (Tailwind CSS), JavaScript
-Backend: Python (Flask)
-9kDatabase: Supabase (PostgreSQL with RLS)
-AI: Hugging Face Inference API (distilbert-base-cased-distilled-squad)
-Payment: Paystack
-Deployment: Bolt.new

Setup:

Clone the Repository:
git clone 
cd AI-Study-Buddy

Install Dependencies:

python3 -m pip install flask supabase requests markupsafe python-dotenv

Create .env File: In the project root, create a .env file with:
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your-supabase-anon-key
HUGGINGFACE_API_TOKEN=your-huggingface-token
PAYSTACK_SECRET_KEY=your-paystack-secret-key

-Get SUPABASE_URL and SUPABASE_KEY from Supabase (Settings > API).
-Get HUGGINGFACE_API_TOKEN from Hugging Face (Settings > Access Tokens).
-Get PAYSTACK_SECRET_KEY from Paystack (Settings > API Keys & Webhooks).

Set Up Supabase:

-Create a Supabase project (free tier, disable email confirmation).

-Run the following SQL in SQL Editor to create the flashcards table:

CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_flashcards ON flashcards FOR ALL USING (auth.uid() = user_id);


Run Locally:
-python app.py
-Open http://localhost:5000 in the browser.

Testing:

-Unit Tests: Run automatically on startup (python app.py) to test flashcard generation, authentication, and payment initialization.
-Manual Testing:
Register/login with a password ≥6 characters.
Enter sample notes (e.g., “Python is a programming language”) and generate flashcards.
Click the Paystack button to test payment (use test card: 4084084084084081, CVV 408, expiry 12/34).
Verify flashcards in Supabase (Table Editor > flashcards).

Deployment:

-Push to GitHub (ensure .env is in .gitignore).
-Deploy on Bolt.new:
-Connect the GitHub repo.
-Add environment variables: SUPABASE_URL, SUPABASE_KEY, HUGGINGFACE_API_TOKEN, PAYSTACK_SECRET_KEY.

Developer:

Name: Muhammad Bashir
Role: Solo Developer
Email: muhammadbashir4338@gmail.com

Live Demo:

[Insert Bolt.new link after deployment]
