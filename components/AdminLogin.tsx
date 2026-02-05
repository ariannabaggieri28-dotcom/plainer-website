
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { auth } from '../firebase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      setError("Accesso negato. Credenziali non valide.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-12 border border-black/5 w-full max-w-md">
        <div className="text-3xl font-black tracking-tighter mb-12 flex items-center gap-2">
          <div className="w-10 h-10 bg-plainer rounded-none flex items-center justify-center">
            <div className="w-4 h-4 bg-white"></div>
          </div>
          PLAINER ADMIN
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 bg-gray-50 border-none outline-none focus:ring-2 focus:ring-plainer font-medium transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-6 py-4 bg-gray-50 border-none outline-none focus:ring-2 focus:ring-plainer font-medium transition-all"
            />
          </div>
          
          {error && <p className="text-red-600 text-sm font-bold bg-red-50 p-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-plainer text-white py-5 font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Accesso in corso..." : "Entra nel pannello"}
          </button>
        </form>
        
        <p className="mt-12 text-center text-gray-400 text-sm">
          Accesso riservato al personale autorizzato.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
