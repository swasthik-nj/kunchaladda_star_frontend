import React, { useState, useEffect, useCallback } from "react";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/all-users`);
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const data = await response.json();
      

      const users = (data.data.users || [])
        .map(user => ({
          ...user,
          age: calculateAge(user.dob)
        }))
        .sort((a, b) => b.age - a.age); 
      
      setMembers(users);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (loading) {
    return (
      <div className="relative w-full px-4 py-10">
        <div className="text-center text-2xl font-semibold">Loading members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full px-4 py-10">
        <div className="text-center text-2xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="relative w-full px-4 py-10">
        <div className="text-center text-2xl font-semibold">No members found</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-y-auto bg-slate-50 px-6 py-12"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/236x/e8/7a/ee/e87aee069ed2f80d932cea4f17d669e0.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          backgroundPosition: "top left",
        }}>
  <div className="max-w-7xl mx-auto mb-10">
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Community Directory</h2>
    <p className="text-blue-900 mt-2">Connecting with {members.length} registered members.</p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {members.map((member) => (
      <div 
        key={member._id} 
        className="group relative flex flex-col overflow-hidden rounded-3xl border border-orange-200/60 bg-gradient-to-b from-white via-orange-50/40 to-amber-50/60 shadow-[0_10px_30px_rgba(148,63,15,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(148,63,15,0.18)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.22),_transparent_52%)]" />
        <div className="h-18 w-full bg-gradient-to-r from-slate-400 via-gray-700 to-slate-200 opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.01]" />

        <div className="px-6 pb-4 flex flex-col items-center">
          <div className="relative -mt-11 mb-4">
            <img
              src={member.avatar?.url || "https://placehold.co/200x200"}
              alt={member.fullname}
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105"
            />
            {member.isEmailVarified && (
              <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-lg font-extrabold text-slate-800 capitalize leading-tight tracking-tight">
              {member.fullname}
            </h1>
            <p className="text-[11px] font-semibold text-orange-600/80 mt-1 uppercase tracking-[0.22em]">
              Registered Member
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full mt-4">
            <div className="rounded-xl bg-white/80 border border-orange-100 px-3 py-2 text-center">
              <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Age</span>
              <span className="text-base font-bold text-slate-800">{member.age}</span>
            </div>
            <div className="rounded-xl bg-white/80 border border-orange-100 px-3 py-2 text-center">
              <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Status</span>
              <span className={`text-sm font-bold ${member.isEmailVarified ? 'text-emerald-600' : 'text-rose-500'}`}>
                {member.isEmailVarified ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>

          <div className="w-full mt-4 space-y-2">
            <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-white/90 px-3 py-2 text-slate-600 transition-colors group-hover:border-orange-200">
              <div className="p-2 bg-orange-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium truncate">{member.email}</span>
            </div>
            
            <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-white/90 px-3 py-2 text-slate-600 transition-colors group-hover:border-orange-200">
              <div className="p-2 bg-orange-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium">{new Date(member.dob).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
