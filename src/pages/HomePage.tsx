import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Aperture as Gesture, Home, Lock } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-white font-bold text-2xl">GestureHub</div>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-white hover:text-purple-300 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </nav>

        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Control Your Home with Gestures
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Experience the future of home automation. Control your devices with natural hand movements.
            No more switches, just simple gestures.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started Free
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-[#1E293B] p-8 rounded-2xl backdrop-blur-lg border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
            <div className="text-purple-400 mb-4">
              <Gesture className="w-12 h-12" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-4">Gesture Recognition</h3>
            <p className="text-gray-400">
              Advanced AI-powered gesture recognition for precise and reliable control of your devices
            </p>
          </div>

          <div className="bg-[#1E293B] p-8 rounded-2xl backdrop-blur-lg border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
            <div className="text-blue-400 mb-4">
              <Home className="w-12 h-12" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-4">Smart Home Control</h3>
            <p className="text-gray-400">
              Seamlessly integrate with your existing smart home devices for complete control
            </p>
          </div>

          <div className="bg-[#1E293B] p-8 rounded-2xl backdrop-blur-lg border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
            <div className="text-pink-400 mb-4">
              <Lock className="w-12 h-12" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-4">Secure Access</h3>
            <p className="text-gray-400">
              Enterprise-grade security ensuring your home automation system stays protected
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Trusted by Smart Home Enthusiasts</h2>
          <div className="flex justify-center space-x-12 opacity-50">
            <div className="text-white text-xl font-semibold">SmartLife</div>
            <div className="text-white text-xl font-semibold">HomeConnect</div>
            <div className="text-white text-xl font-semibold">AutoHome</div>
            <div className="text-white text-xl font-semibold">GestureIO</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;