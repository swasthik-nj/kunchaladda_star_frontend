import React, { useState, useEffect } from "react";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
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
  };

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
    <div className="relative w-full px-6 py-12 bg-gray-50/50">
  <div className="max-w-7xl mx-auto mb-10">
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Community Directory</h2>
    <p className="text-slate-500 mt-2">Connecting with {members.length} registered members.</p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {members.map((member) => (
      <div 
        key={member._id} 
        className="group relative flex flex-col bg-white rounded-[2rem] border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
      >
        
        <div className="h-20 w-full bg-gradient-to-r from-emerald-400 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity" />

        <div className="px-6 pb-8 flex flex-col items-center">
          <div className="relative -mt-10 mb-4">
            <img
              src={member.avatar?.url || "https://placehold.co/200x200"}
              alt={member.fullname}
              className="h-24 w-24 rounded-2xl object-cover border-4 border-white shadow-md transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105"
            />
            {member.isEmailVarified && (
              <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-lg border-2 border-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>

          
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800 capitalize leading-tight">
              {member.fullname}
            </h1>
            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">
              Registered Member
            </p>
          </div>

          <div className="grid grid-cols-2 w-full mt-6 py-4 border-y border-slate-50">
            <div className="text-center border-r border-slate-50">
              <span className="block text-xs text-slate-400 font-medium">Age</span>
              <span className="text-sm font-bold text-slate-700">{member.age}</span>
            </div>
            <div className="text-center">
              <span className="block text-xs text-slate-400 font-medium">Verified</span>
              <span className={`text-sm font-bold ${member.isEmailVarified ? 'text-emerald-600' : 'text-slate-400'}`}>
                {member.isEmailVarified ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="w-full mt-4 space-y-2">
            <div className="flex items-center gap-3 text-slate-500 group/item cursor-pointer">
              <div className="p-2 bg-slate-50 rounded-lg group-hover/item:bg-blue-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover/item:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium truncate group-hover/item:text-slate-800 transition-colors">{member.email}</span>
            </div>
            
            <div className="flex items-center gap-3 text-slate-500">
              <div className="p-2 bg-slate-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium">{new Date(member.dob).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Profile CTA */}
          <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.98] hover:bg-slate-800 hover:shadow-lg">
            View Full Profile
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
