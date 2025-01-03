import React from 'react';

const RewardsPage: React.FC = () => {
  // Dummy data for demonstration
  const userPoints = 1250;
  const giftCards = [
    {
      id: 1,
      name: 'Amazon Gift Card',
      pointsRequired: 1000,
      image: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png'
    },
    {
      id: 2,
      name: 'Starbucks Gift Card',
      pointsRequired: 800,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png'
    },
    {
      id: 3,
      name: 'Uber Eats Gift Card',
      pointsRequired: 1200,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Uber_Eats_2018_logo.svg/2560px-Uber_Eats_2018_logo.svg.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Rewards</h1>
        
        {/* User Points */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Your Points</h2>
          <div className="text-4xl font-bold text-purple-700">
            {userPoints} pts
          </div>
        </div>

        {/* Available Gift Cards */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-indigo-800">Available Gift Cards</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {giftCards.map((card) => (
              <div key={card.id} className="flex items-center p-6 hover:bg-gray-50 transition-colors">
                <img 
                  src={card.image} 
                  alt={card.name}
                  className="w-16 h-16 object-contain mr-6"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{card.name}</h3>
                  <p className="text-gray-600">{card.pointsRequired} points required</p>
                </div>
                <button 
                  className={`px-6 py-2 rounded-full font-semibold ${
                    userPoints >= card.pointsRequired
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={userPoints < card.pointsRequired}
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
