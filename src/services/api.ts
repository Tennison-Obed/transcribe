import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Transcription services
export const transcriptionService = {
  // Upload audio file for transcription
  transcribeAudio: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        // This could be used to update a progress bar
        console.log(`Upload progress: ${Math.round((progressEvent.loaded / (progressEvent.total || 0)) * 100)}%`);
      },
    });
    
    return response.data;
  },
  
  // Get list of transcripts
  getTranscripts: async () => {
    const response = await api.get('/transcripts');
    return response.data;
  },
  
  // Get a specific transcript by ID
  getTranscript: async (id: string) => {
    const response = await api.get(`/transcripts/${id}`);
    return response.data;
  },
};

export default api;