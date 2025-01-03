import React from 'react';
import './LeaderboardPage.css'; // Import the CSS file for animations

const LeaderboardPage: React.FC = () => {
  // Demo leaderboard data for six users with avatar URLs, excluding Sita
  const demoUsers = [
    { name: 'Utkalesh', points: 95, avatar: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=U' },
    { name: 'Khushar', points: 85, avatar: 'https://via.placeholder.com/40/33FF57/FFFFFF?text=K' },
    { name: 'Omkar', points: 75, avatar: 'https://via.placeholder.com/40/3357FF/FFFFFF?text=O' },
    { name: 'Govind', points: 65, avatar: 'https://via.placeholder.com/40/FF33A1/FFFFFF?text=G' },
    { name: 'Ravi', points: 55, avatar: 'https://via.placeholder.com/40/FF33FF/FFFFFF?text=R' },
    { name: 'Sita', points: 45, avatar: 'https://via.placeholder.com/40/33FFFF/FFFFFF?text=S' }, // Remove this line
  ].filter(user => user.name !== 'Sita'); // Filter out Sita

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Demo Leaderboard</h1>
        
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-indigo-800">Leaderboard</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {demoUsers.map((user, index) => (
              <div key={index} className="flex items-center p-6 hover:bg-gray-50 transition-colors">
                <span className="text-lg font-medium text-gray-600 w-8">#{index + 1}</span>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
                </div>
                <span className="text-lg font-semibold text-indigo-600">{user.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
