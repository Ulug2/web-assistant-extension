import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [listening, setListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startListening = async () => {
    setSuggestion('');
    setTranscription('');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };


    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

      // Play back the recorded audio for debugging
      // const audioUrl = URL.createObjectURL(audioBlob);
      // const audio = new Audio(audioUrl);
      // audio.play();

      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');

      try {
        const response = await fetch('http://localhost:3001/transcribe', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setTranscription(data.text);

        const chatRes = await fetch('http://localhost:3001/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: data.text }),
        });
        const chatData = await chatRes.json();
        setSuggestion(chatData.reply);
      } catch (error) {
        setTranscription('Error transcribing audio.');
      }
    };

    mediaRecorder.start();
    setListening(true);
  };

  const stopListening = () => {
    mediaRecorderRef.current?.stop();
    setListening(false);
  };

  const handleMicClick = () => {
    listening ? stopListening() : startListening();
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Partner Chat Assistant</h1>
        <p>Listen, transcribe, and respond naturally.</p>
      </div>
      <div className="panels-row">
        <div className="panel">
          <div className="panel-title">Partner said:</div>
          <div className="transcription-text">{transcription || <span className="placeholder">Transcription will appear here</span>}</div>
        </div>
        <div className="panel">
          <div className="panel-title">Suggested responses:</div>
          <div className="suggestion">{suggestion || <span className="placeholder">Suggestions will appear here</span>}</div>
        </div>
      </div>
      <button className="mic-btn" onClick={handleMicClick}>
        <span role="img" aria-label="Mic">🎙️</span>
      </button>
    </div>
  );
}

export default App;
