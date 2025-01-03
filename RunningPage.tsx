import React from 'react';
import { Link } from 'react-router-dom';

const RunningPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Running Activities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/running/treadmill" 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Treadmill Running"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Treadmill Running</h3>
              <p className="text-purple-700">Controlled environment with adjustable settings</p>
            </div>
          </Link>
          <Link 
            to="/running/outdoor" 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Outdoor Running"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Outdoor Running</h3>
              <p className="text-purple-700">Experience nature while improving fitness</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RunningPage;
