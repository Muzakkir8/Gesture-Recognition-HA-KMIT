import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Fan, Lightbulb, Bell, LogOut } from 'lucide-react';

function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [devices, setDevices] = useState({
    fan: false,
    light: false,
    buzzer: false,
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDevice = (device: keyof typeof devices) => {
    setDevices((prev) => ({
      ...prev,
      [device]: !prev[device],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-gray-100">
      <header className="bg-[#1E293B] border-b border-gray-800 h-16 flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          GestureHub
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fan Control */}
          <div className="bg-[#1E293B] rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Fan
                    className={`w-8 h-8 ${
                      devices.fan ? 'text-purple-400 animate-spin' : 'text-gray-400'
                    }`}
                  />
                  <h3 className="text-xl font-semibold ml-3">Fan</h3>
                </div>
                <button
                  onClick={() => toggleDevice('fan')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    devices.fan ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      devices.fan ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-400">
                {devices.fan ? 'Fan is running' : 'Fan is turned off'}
              </p>
            </div>
          </div>

          {/* Light Control */}
          <div className="bg-[#1E293B] rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Lightbulb
                    className={`w-8 h-8 ${
                      devices.light ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  />
                  <h3 className="text-xl font-semibold ml-3">Light</h3>
                </div>
                <button
                  onClick={() => toggleDevice('light')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    devices.light ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      devices.light ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-400">
                {devices.light ? 'Light is on' : 'Light is turned off'}
              </p>
            </div>
          </div>

          {/* Buzzer Control */}
          <div className="bg-[#1E293B] rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Bell
                    className={`w-8 h-8 ${
                      devices.buzzer ? 'text-red-400' : 'text-gray-400'
                    }`}
                  />
                  <h3 className="text-xl font-semibold ml-3">Buzzer</h3>
                </div>
                <button
                  onClick={() => toggleDevice('buzzer')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    devices.buzzer ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      devices.buzzer ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-400">
                {devices.buzzer ? 'Buzzer is active' : 'Buzzer is inactive'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#1E293B] rounded-2xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-6">Gesture Control Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-purple-400 font-semibold">Fan Control</div>
              <p className="text-gray-400">Wave hand up and down</p>
            </div>
            <div className="space-y-2">
              <div className="text-yellow-400 font-semibold">Light Control</div>
              <p className="text-gray-400">Swipe hand left to right</p>
            </div>
            <div className="space-y-2">
              <div className="text-red-400 font-semibold">Buzzer Control</div>
              <p className="text-gray-400">Make a circular motion</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;