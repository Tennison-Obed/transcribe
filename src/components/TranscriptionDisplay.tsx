import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, CheckCircle, Edit, Save } from 'lucide-react';

interface TranscriptionDisplayProps {
  text: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editedText : text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([isEditing ? editedText : text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Transcription Result</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Download as text file"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={handleEditToggle}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title={isEditing ? "Save changes" : "Edit transcript"}
            >
              {isEditing ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          {isEditing ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full h-80 p-4 text-gray-700 focus:outline-none resize-none font-mono text-sm"
            />
          ) : (
            <div className="bg-gray-50 p-4 h-80 overflow-y-auto text-gray-700 font-mono text-sm whitespace-pre-wrap">
              {text}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>Generated on {new Date().toLocaleString()}</span>
          <span>Word count: {(isEditing ? editedText : text).split(/\s+/).filter(Boolean).length}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TranscriptionDisplay;