🚀 Smart Email GenAI Assistant

Smart Email GenAI Assistant is a full-stack AI-powered email automation system that converts multi-step email drafting into a single intelligent action. It enables professionals to generate context-aware replies instantly, reducing manual effort and accelerating communication workflows.

Available as:

✅ Chrome Extension (Gmail integration)

✅ Web Application

✅ Spring Boot AI Backend

✨ Features

One-click AI email reply generation

Context-aware professional responses

Gmail compose & reply integration

Tone-based email generation

Real-time AI response using Gemini API

Productivity-focused workflow automation

🏗️ Project Architecture
smart-email-genai/
│
├── Backend/        → Spring Boot API (AI generation service)
├── Frontend/       → Web application UI
├── Extension/      → Chrome Extension (Gmail integration)
└── README.md
⚙️ Tech Stack

Backend

Java 23

Spring Boot

WebClient (Reactive API)

Gemini AI API

Frontend

HTML / CSS / JavaScript

Extension

Chrome Extension (Manifest V3)

Gmail DOM Integration

🔑 Environment Setup

Create environment variable:

Windows (PowerShell)
setx GEMINI_API_KEY "YOUR_API_KEY"
Linux / Mac
export GEMINI_API_KEY=YOUR_API_KEY
▶️ Run Backend
cd Backend
mvn spring-boot:run

Server runs at:

http://localhost:8080
🧩 Load Chrome Extension

Open Chrome

Go to chrome://extensions

Enable Developer Mode

Click Load Unpacked

Select /Extension folder

📡 API Endpoint
POST /api/email/generate

Request:

{
  "emailContent": "email text",
  "tone": "professional"
}
🎯 Use Case

Designed for:

Developers

Executives

Fast decision-makers

High-volume email workflows

Acts as a second brain for instant communication.

🔒 Security Note

API keys are stored using environment variables and are never committed to source control.

👨‍💻 Author

Nakul Dubey
Java Backend Developer

GitHub: https://github.com/nakuldubeydev

⭐ Future Improvements

Streaming AI responses

Multi-tone generation

Email summarization

Deployment (Docker + Cloud)

