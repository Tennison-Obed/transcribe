import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Mic, FileAudio } from 'lucide-react';

interface UploadFormProps {
  onUpload: (file: File) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelected(files[0]);
    }
  };
  
  const handleFileSelected = (file: File) => {
    const allowedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/mp4'];
    
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.mp3') && !file.name.endsWith('.wav')) {
      alert('Please upload an audio file (MP3, WAV, M4A)');
      return;
    }
    
    setSelectedFile(file);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };
  
  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };
  
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div 
        className={`p-8 border-2 border-dashed transition-colors rounded-lg ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            {selectedFile ? (
              <FileAudio className="h-16 w-16 text-blue-500" />
            ) : (
              <Upload className="h-16 w-16 text-gray-400" />
            )}
          </div>
          
          {selectedFile ? (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedFile.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={openFileSelector}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Change file
                </button>
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Transcribe now
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop your audio file here
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Or click to upload (MP3, WAV, M4A)
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="button"
                  onClick={openFileSelector}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload file
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Mic className="h-4 w-4" />
                  Record audio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="audio/*"
        style={{ display: 'none' }}
      />
    </motion.div>
  );
};

export default UploadForm;