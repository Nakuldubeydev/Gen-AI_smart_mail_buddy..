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
🧠 Technology Stack & Skills
⚙️ Backend Development

Java 23

Spring Boot

Spring Web MVC

Spring WebFlux (Reactive WebClient)

REST API Design & Development

Dependency Injection (IoC)

Environment Configuration & Secure API Handling

JSON Processing (Jackson)

Maven Build System

🤖 AI & API Integration

Google Gemini API

Generative AI Integration

Prompt Engineering

AI Response Parsing & Processing

Context-aware Content Generation

HTTP Client Architecture (Reactive APIs)

🌐 Frontend Development

HTML5

CSS3

Vanilla JavaScript (ES6+)

DOM Manipulation

Async Programming (Fetch API / Promises)

UI Interaction Design

🧩 Chrome Extension Development

Chrome Extension (Manifest V3)

Content Scripts

Gmail DOM Injection

Dynamic UI Component Injection

Browser Permissions & Host Permissions

Event-driven scripting

Gmail Compose & Reply Automation

🏗️ Full-Stack Architecture

Client–Server Architecture

Extension → Backend → AI Flow

API Communication Pipeline

Modular Project Structure

Separation of Concerns

🔐 DevOps & Configuration

Environment Variables Management

Secure API Key Handling

Git Version Control

GitHub Repository Management

Multi-module Project Organization

🛠️ Development Tools

IntelliJ IDEA

Git Bash

Maven

Chrome Developer Tools

Postman (API Testing)

📐 Software Engineering Concepts

RESTful Architecture

Asynchronous Processing

Reactive Programming Basics

Error Handling & Debugging

Production-style Code Structuring

🚀 Core Capabilities Demonstrated

Full-stack application development

AI-powered workflow automation

Gmail platform integration

Real-world productivity tooling

Backend–AI system orchestration

Extension-based product engineering

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

