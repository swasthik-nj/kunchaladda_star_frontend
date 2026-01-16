import React, { useState, useEffect } from "react";

export default function FeaturedMembers() {
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
        .sort((a, b) => b.age - a.age) 
        .slice(0, 4);
      
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
        <div className="text-center text-2xl font-semibold text-white">Loading members...</div>
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
        <div className="text-center text-2xl font-semibold text-white">No members found</div>
      </div>
    );
  }

  return (
    <div className="relative w-full px-6 py-16 bg-transparent">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {members.map((member) => (
      <div 
        key={member._id} 
        className="group relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden"
      >
        {/* Subtle decorative background blob */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl group-hover:bg-blue-200/60 transition-colors duration-500" />
        
        <div className="relative bg-white/50 rounded-[2.2rem] p-6 h-full border border-white/50 flex flex-col items-center">
          
          {/* Avatar Section with Status Ring */}
          <div className="relative mb-6">
            <div className={`absolute inset-0 rounded-full blur-md opacity-20 scale-110 ${member.isEmailVarified ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
            <img
              src={member.avatar?.url || "https://placehold.co/200x200"}
              alt={member.fullname}
              className="relative h-28 w-28 rounded-full ring-4 ring-white shadow-xl object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {member.isEmailVarified && (
              <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full shadow-lg border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Identity Section */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-slate-800 capitalize tracking-tight group-hover:text-blue-600 transition-colors">
              {member.fullname}
            </h1>
            <span className="inline-block px-3 py-1 mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 rounded-full">
              Community Member
            </span>
          </div>

          {/* Info Grid */}
          <div className="w-full grid grid-cols-2 gap-2 pt-6 border-t border-slate-100/80">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Age</span>
              <span className="text-sm font-semibold text-slate-700">{member.age} yrs</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Status</span>
              <span className={`text-sm font-semibold ${member.isEmailVarified ? 'text-emerald-600' : 'text-orange-500'}`}>
                {member.isEmailVarified ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="col-span-2 mt-2">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Email</span>
              <span className="text-xs font-medium text-slate-600 truncate block w-full">{member.email}</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="mt-8 w-full py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 active:scale-95">
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
