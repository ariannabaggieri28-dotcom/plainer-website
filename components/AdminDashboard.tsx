
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, getBetaSignups } from '../firebase';
import { BetaSignup, UserRole } from '../types';

const AdminDashboard: React.FC = () => {
  const [signups, setSignups] = useState<BetaSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        navigate('/admin/login');
      } else {
        setUser(u);
        fetchData();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const data = await getBetaSignups();
    setSignups(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/admin/login');
  };

  const exportCSV = () => {
    const headers = ["Email", "Ruolo", "Data"];
    const rows = signups.map(s => [
      s.email,
      s.role,
      s.createdAt?.toDate().toLocaleDateString() || 'N/A'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `plainer_beta_signups_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-10 h-10 border-4 border-plainer border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium">Gestione iscrizioni beta Plainer</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={exportCSV}
              className="bg-black text-white px-6 py-3 font-bold text-sm hover:opacity-90 flex items-center gap-2"
            >
              Esporta CSV
            </button>
            <button 
              onClick={handleLogout}
              className="bg-white border border-black text-black px-6 py-3 font-bold text-sm hover:bg-black hover:text-white"
            >
              Esci
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 border border-black/5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Totale Iscritti</p>
            <p className="text-5xl font-black">{signups.length}</p>
          </div>
          <div className="bg-white p-8 border border-black/5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Privati</p>
            <p className="text-5xl font-black text-plainer">
              {signups.filter(s => s.role === UserRole.PRIVATI).length}
            </p>
          </div>
          <div className="bg-white p-8 border border-black/5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Professionisti</p>
            <p className="text-5xl font-black">
              {signups.filter(s => s.role === UserRole.PROFESSIONISTI).length}
            </p>
          </div>
        </div>

        <div className="bg-white border border-black/5 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/5 text-xs font-black uppercase tracking-widest text-gray-400">
                <th className="p-6">Email</th>
                <th className="p-6">Ruolo</th>
                <th className="p-6">Data Iscrizione</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 font-medium">
              {signups.map((s, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-6">{s.email}</td>
                  <td className="p-6 capitalize">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      s.role === UserRole.PRIVATI ? 'bg-blue-50 text-plainer' : 'bg-gray-100 text-black'
                    }`}>
                      {s.role}
                    </span>
                  </td>
                  <td className="p-6 text-gray-500">
                    {s.createdAt?.toDate().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {signups.length === 0 && (
            <div className="p-20 text-center text-gray-400 italic">
              Nessuna iscrizione trovata.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
