import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Dumbbell } from 'lucide-react';

export default function Layout() {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-64 h-64 bg-purple-200 rounded-full -top-32 -left-32 opacity-30 animate-float"></div>
        <div className="absolute w-72 h-72 bg-indigo-200 rounded-full -bottom-40 -right-40 opacity-30 animate-float-reverse"></div>
      </div>

      <nav className="bg-white/80 backdrop-blur-md shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
              <Dumbbell className="h-9 w-9 text-indigo-600" />
              <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Monocled
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium hover:-translate-y-0.5 transform"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium hover:-translate-y-0.5 transform"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={signOut}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:scale-105 transition-transform font-medium shadow-lg hover:shadow-indigo-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium hover:-translate-y-0.5 transform"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:scale-105 transition-transform font-medium shadow-lg hover:shadow-indigo-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Dumbbell className="h-6 w-6 text-indigo-600" />
              <span className="text-gray-700 font-medium">Monocled</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} FitQuest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}