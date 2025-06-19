import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      toast.error('Please fill in both fields');
      return;
    }
    if (username === 'kesav' && password === '1234') {
      localStorage.setItem('isAdmin', 'true');
      toast.success('Login successful');
      setTimeout(() => navigate('/admin'), 1000);
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-emerald-100 via-green-50 to-white font-['Poppins'] relative overflow-hidden">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1.4 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-300 rounded-full filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1.4 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-emerald-400 rounded-full filter blur-3xl"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg overflow-hidden flex flex-col md:flex-row z-10"
      >
        <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-emerald-500 text-white px-10 py-14 flex flex-col justify-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-extrabold mb-6">🧵 Cloths Admin</h1>
            <p className="text-base mb-2">Use these demo credentials:</p>
            <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3 text-sm">
              <p>👤 <b>Username:</b> kesav</p>
              <p>🔐 <b>Password:</b> 1234</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-10 bg-white/50 backdrop-blur-xl flex justify-center items-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
              Admin Login
            </h2>
            <div className="relative mb-6">
              <input
                type="text"
                id="username"
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
              >
                Username
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="peer w-full px-4 pt-6 pb-2 pr-12 border border-gray-300 rounded-xl bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-600 hover:text-green-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleLogin}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md"
            >
              Login
            </motion.button>

           
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}