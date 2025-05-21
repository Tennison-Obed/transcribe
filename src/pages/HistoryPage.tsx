import React from 'react';
import { motion } from 'framer-motion';
import { FileAudio, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - in a real app this would come from an API
const transcripts = [
  {
    id: '1',
    title: 'Interview with John Doe',
    createdAt: new Date('2023-05-15T14:30:00').toISOString(),
    duration: '12:35',
    wordCount: 2130
  },
  {
    id: '2',
    title: 'Product Meeting Notes',
    createdAt: new Date('2023-05-10T10:15:00').toISOString(),
    duration: '45:20',
    wordCount: 7500
  },
  {
    id: '3',
    title: 'Conference Call',
    createdAt: new Date('2023-05-05T16:00:00').toISOString(),
    duration: '33:45',
    wordCount: 5600
  }
];

const HistoryPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Transcripts</h1>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Sort by date</option>
              <option>Sort by name</option>
              <option>Sort by duration</option>
            </select>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors">
              Filter
            </button>
          </div>
        </div>
        
        {transcripts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FileAudio className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No transcripts yet</h3>
            <p className="text-gray-500 mb-4">
              Upload your first audio file to get started with transcription.
            </p>
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors inline-block"
            >
              Upload Audio
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {transcripts.map((transcript) => (
                <TranscriptItem key={transcript.id} transcript={transcript} />
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

interface TranscriptItemProps {
  transcript: {
    id: string;
    title: string;
    createdAt: string;
    duration: string;
    wordCount: number;
  };
}

const TranscriptItem: React.FC<TranscriptItemProps> = ({ transcript }) => {
  const formattedDate = new Date(transcript.createdAt).toLocaleDateString();
  
  return (
    <motion.li
      whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
      className="transition-colors"
    >
      <Link to={`/transcript/${transcript.id}`} className="block p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileAudio className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{transcript.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span className="mr-3">{formattedDate}</span>
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{transcript.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">{transcript.wordCount} words</div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </Link>
    </motion.li>
  );
};

export default HistoryPage;