import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Target, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-6xl">
            Transform Your Fitness Journey into an Adventure
          </h1>
          <p className="mt-6 text-xl text-indigo-100">
            Join Monocled and turn your workouts into rewarding quests. Track progress,
            earn achievements, and level up your fitness game.
          </p>
          <div className="mt-10">
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-100 transition-colors"
            >
              Start Your Journey
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center">
            <Trophy className="mx-auto h-12 w-12 text-yellow-300" />
            <h3 className="mt-4 text-xl font-semibold">Earn Achievements</h3>
            <p className="mt-2 text-indigo-100">
              Complete challenges and unlock special badges to showcase your progress.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center">
            <Target className="mx-auto h-12 w-12 text-green-300" />
            <h3 className="mt-4 text-xl font-semibold">Track Goals</h3>
            <p className="mt-2 text-indigo-100">
              Set personalized fitness goals and watch yourself progress day by day.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center">
            <Activity className="mx-auto h-12 w-12 text-red-300" />
            <h3 className="mt-4 text-xl font-semibold">Custom Workouts</h3>
            <p className="mt-2 text-indigo-100">
              Get tailored exercise plans based on your fitness level and goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}