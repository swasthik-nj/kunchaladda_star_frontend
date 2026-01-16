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
    <div className="w-full py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {members.map((member) => (
          <div 
            key={member._id} 
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-1 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            {/* Background Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative bg-white rounded-[1.4rem] p-6 h-full flex flex-col items-center">
              {/* Avatar with Ring */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 opacity-50" />
                <img
                  src={member.avatar?.url || "https://placehold.co/400x400"}
                  alt={member.fullname}
                  className="relative h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                />
                {member.isEmailVarified && (
                   <div className="absolute bottom-1 right-1 bg-emerald-500 p-1 rounded-full border-2 border-white text-white">
                     <CheckCircle size={14} />
                   </div>
                )}
              </div>

              {/* Identity */}
              <h3 className="text-xl font-bold text-slate-800 capitalize mb-1 group-hover:text-emerald-700 transition-colors">
                {member.fullname}
              </h3>
              <p className="text-emerald-600 font-medium text-sm mb-4">Senior Member • {member.age} yrs</p>

              {/* Mini Details Table */}
              <div className="w-full space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-500">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-xs truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="text-xs">{new Date(member.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Interactive Button */}
              <button className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-600 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                View Profile <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
