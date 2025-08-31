# Partner Chat Assistant Chrome Extension

## Overview

Partner Chat Assistant is a Chrome extension that transcribes spoken audio and suggests natural responses, designed to help you communicate more effectively in real time. The extension records your voice, sends it to a local backend for transcription and chat completion, and displays both the transcription and suggested replies in a modern, responsive popup UI.

---

## Tech Stack

- **Frontend:** React (Vite), TypeScript, CSS
- **Backend:** Node.js (Express), JavaScript
- **APIs:** OpenAI (for transcription and chat completion)
- **Extension:** Chrome Extension Manifest V3
- **Other:** undici (fetch/FormData), dotenv, CORS

---

## Features

- 🎙️ Record and transcribe audio from your microphone
- 💬 Get AI-powered suggested responses instantly
- 📋 Click to copy suggestions to clipboard
- ⚡ Modern, responsive UI with loading states and animations
- 🔒 Secure: No secrets in repo, CORS configured for extension origin

---

## Demo

<div>
    <a href="https://www.loom.com/share/be426789c8b64a45922c342ddd967272">
      <p>Demo Video</p>
    </a>
    <a href="https://www.loom.com/share/be426789c8b64a45922c342ddd967272">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/be426789c8b64a45922c342ddd967272-b46cb0be28dabb64-full-play.gif">
    </a>
</div>

_Replace the link above with your actual demo video._

---

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/Ulug2/web-assistant-extension.git
cd web-assistant-extension
```

### 2. Backend Setup

```sh
cd ai-extension-server
npm install
# Create a .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_openai_key" > .env
node server.js
```

### 3. Frontend Setup

```sh
cd ../ai-extension
npm install
npm run build
```

### 4. Load Extension in Chrome

- Go to `chrome://extensions`
- Enable "Developer mode"
- Click "Load unpacked" and select the `ai-extension/dist` folder

### 5. Usage

- Click the extension icon in Chrome
- Click the mic button to start recording
- View transcription and suggested responses
- Click a suggestion to copy it

---

## How It Was Built

- Started with a React + Vite template for fast development and modern UI.
- Built a Node.js Express backend to handle audio transcription and chat completion using OpenAI APIs.
- Implemented CORS to allow requests from both localhost and the Chrome extension.
- Added undici for fetch/FormData support in Node.js.
- Designed a responsive popup UI with loading overlays, animated mic button, and copy-to-clipboard features.
- Cleaned git history to remove secrets using BFG and git-filter-repo.
- Packaged as a Chrome extension using Manifest V3.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

---

## Author

- **Ulug2** ([GitHub](https://github.com/Ulug2))

---

## Acknowledgements

- OpenAI for API access
- React and Vite for frontend tooling
- Express for backend
- Chrome Extension documentation

---
