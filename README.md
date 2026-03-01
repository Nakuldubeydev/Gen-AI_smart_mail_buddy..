# Smart Email GenAI Assistant

An AI-powered email automation system that turns multi-step email drafting into a single intelligent action. Built with Java, Spring Boot, and the Google Gemini API — available as a Chrome Extension, Web App, and standalone backend service.

---

## The Problem

Writing professional email replies is repetitive and time-consuming. Every response involves reading the email, identifying key points, drafting a reply, adjusting tone, checking grammar, and formatting — all before you hit send. Multiply that by dozens of emails a day and you're spending hours on communication alone.

## The Solution

Smart Email GenAI collapses that entire workflow into one click. Paste or inject an email, choose a tone, and get a polished, context-aware reply in seconds — directly inside Gmail or via the web interface.

---

## What's Inside

```
smart-email-genai/
├── Backend/        Spring Boot REST API — handles AI generation logic
├── Frontend/       Standalone web interface
├── Extension/      Chrome Extension with native Gmail integration
└── README.md
```

---

## Tech Stack

**Backend**
- Java 23
- Spring Boot
- Spring WebFlux (Reactive WebClient)
- Google Gemini API
- Jackson (JSON processing)
- Maven

**Frontend**
- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Fetch API / Async-Await
- DOM Manipulation

**Chrome Extension**
- Manifest V3
- Content Scripts
- Gmail DOM Injection
- Event-driven scripting

---

## Features

- One-click AI reply generation from any email content
- Tone selection — professional, casual, assertive, empathetic
- Gmail compose and reply button injection via Chrome Extension
- Reactive backend with non-blocking API calls to Gemini
- Secure API key handling via environment variables
- Modular architecture — use any layer independently

---

## Getting Started

### Prerequisites

- Java 23+
- Maven 3.8+
- A valid [Google Gemini API Key](https://makersuite.google.com/app/apikey)
- Google Chrome (for the extension)

### 1. Set Your API Key

**Windows (PowerShell)**
```powershell
setx GEMINI_API_KEY "your_api_key_here"
```

**macOS / Linux**
```bash
export GEMINI_API_KEY=your_api_key_here
```

Restart your terminal after setting the variable.

### 2. Run the Backend

```bash
cd Backend
mvn spring-boot:run
```

Server starts at `http://localhost:8080`

### 3. Load the Chrome Extension

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer Mode** (top right toggle)
3. Click **Load Unpacked**
4. Select the `/Extension` folder from this repo
5. Open Gmail — you'll see the AI reply button injected into compose and reply windows

### 4. Open the Web App (Optional)

Open `Frontend/index.html` directly in your browser. No build step required.

---

## API Reference

### Generate Email Reply

```
POST /api/email/generate
Content-Type: application/json
```

**Request**
```json
{
  "emailContent": "Hi, I wanted to follow up on the proposal we discussed last week...",
  "tone": "professional"
}
```

**Response**
```json
{
  "reply": "Thank you for following up. I've reviewed the proposal and have a few thoughts I'd like to share..."
}
```

**Supported tone values:** `professional`, `casual`, `formal`, `empathetic`, `assertive`

---

## How It Works

1. The user provides an email body and selects a tone
2. The backend constructs a structured prompt using that context
3. The prompt is sent to Google Gemini via reactive WebClient
4. Gemini returns a generated reply
5. The backend parses and returns the clean response
6. The Extension or Web UI displays it — ready to copy or send

---

## Security

- API keys are loaded from environment variables at runtime
- No keys are stored in code or committed to source control
- `.gitignore` is configured to exclude any local config files

---

## Roadmap

- [ ] Streaming AI responses (real-time typing effect)
- [ ] Multi-tone generation (show 3 reply options at once)
- [ ] Email summarization mode
- [ ] Docker support
- [ ] Cloud deployment (Railway / Render / GCP)
- [ ] Firefox extension support

---

## Author

**Nakul Dubey** — Java Backend Developer  
[github.com/nakuldubeydev](https://github.com/nakuldubeydev)

---

## License

This project is open source and available under the [MIT License](LICENSE).
