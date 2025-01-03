import React from 'react';

const WeightLifting: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Weight Lifting Activities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative overflow-hidden">
              <img
                src="https://imgs.search.brave.com/KExpUQXDckQ9nuvG2bN4qPxzSCg7rwW27NqULpQUVSw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTAy/Njk3NjY5NC9waG90/by9iZW5jaC1wcmVz/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9cm1xQlZ3RWJa/ZmRUTzhFOGF2eUI1/ejluT2lYeERDLTc3/c0hKSUVJM25yOD0"
                alt="Bench Press"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Bench Press</h2>
              <p className="text-purple-700">Improve upper body strength</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative overflow-hidden">
              <img
                src="https://imgs.search.brave.com/PvLND80huMulFjDmmskEc9pVfyhGsAt9zAwRNioGskY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTEy/MDg1NzExL3Bob3Rv/L2RlYWRsaWZ0Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz0w/RkRLRWxpeUdISjhR/SkIxR19VTzZ5eDhm/NEpQZGtZZUdtc3Fp/LWFWMnkwPQ"
                alt="Deadlift"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Deadlift</h2>
              <p className="text-purple-700">Build overall body strength</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative overflow-hidden">
              <img
                src="https://imgs.search.brave.com/9hPQkQnca_Bymgis4wKpOrK9_10pNxBEfBBItnEf6YE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE2/MjUwMDM4L3Bob3Rv/L3NxdWF0LWV2ZXJ5/ZGF5LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz16QmZuM3Jq/WU5aT2UwTkw4c2dB/dkdlY19FMTAtUW9Z/MU5qcVdNb3RwLXNN/PQ"
                alt="Squat"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Squat</h2>
              <p className="text-purple-700">Strengthen lower body</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative overflow-hidden">
              <img
                src="https://imgs.search.brave.com/EFA-mQMCuV_lChXbQ-AILbIsshtHJfiBz8f9NrxqmL0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhldHJlbmRzcG90/dGVyLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wNS9C/aWNlcC1Xb3Jrb3V0/LmpwZw"
                alt="Biceps"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Biceps Exercises</h2>
              <p className="text-purple-700">Build arm strength and definition</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative overflow-hidden">
              <img
                src="https://imgs.search.brave.com/dK7rLILZPGU7d8a96w3AYO28PN7OJ5tupinoL1fCqZo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hdGhs/ZWFueC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDkv/bHlpbmctdHJpY2Vw/cy1leHRlbnNpb24t/MS5wbmc"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Triceps Exercises</h2>
              <p className="text-purple-700">Develop arm power and stability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightLifting;
