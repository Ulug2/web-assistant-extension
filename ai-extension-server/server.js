import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import { fetch, FormData } from 'undici';

dotenv.config();

const app = express();
const upload = multer();

const USE_MOCK = true; 

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'chrome-extension://ieogfolmecdhhjccphgbjpplgegppnja',
      'http://localhost:5173'
    ];
    // Allow requests with no origin (like curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

/* ---------------------- TRANSCRIBE ---------------------- */
app.post('/transcribe', upload.single('file'), async (req, res) => {
  try {
    if (USE_MOCK) {
      console.log("Mock transcription response sent ✅");
      return res.json({ text: "This is a mocked transcription of your audio 🎤" });
    }

    console.log("File received:", req.file?.originalname, req.file?.size);
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded');

    const formData = new FormData();
    formData.append('file', new Blob([file.buffer]), 'audio.webm');
    formData.append('model', 'whisper-1');

    console.log("Sending request to OpenAI Whisper...");

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI Whisper error:", errText);
      return res.status(500).json({ error: errText });
    }

    const data = await response.json();
    console.log("Response from OpenAI Whisper:", data);
    res.json(data);
  } catch (error) {
    console.error("Error in /transcribe:", error);
    res.status(500).send('Server error');
  }
});

/* ---------------------- CHAT ---------------------- */
app.post('/chat', async (req, res) => {
  try {
    const { text } = req.body;

    if (USE_MOCK) {
      console.log("Mock chat response sent ✅");
      const mockReplies = [
        "I totally understand what you’re saying ❤️",
        "That makes a lot of sense, thanks for sharing.",
        "I hear you — how about we figure this out together?",
        "Haha 😅 that’s funny, tell me more!"
      ];
      const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
      return res.json({ reply: randomReply });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an assistant helping me respond naturally in conversations with my partner." },
          { role: "user", content: text },
        ],
      }),
    });

    const data = await response.json();
    console.log("ChatGPT raw response:", data);
    const reply = data.choices?.[0]?.message?.content || "No response";

    res.json({ reply });
  } catch (e) {
    console.error("Error in /chat:", e);
    res.status(500).json({ error: "ChatGPT request failed" });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));