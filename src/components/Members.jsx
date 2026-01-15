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
    <div className="relative w-full px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {members.map((member) => (
          <div key={member._id} className="bg-blue-200/50 border border-gray-400 shadow-2xl rounded-xl flex justify-center items-center p-6">
            <div className="p-4 w-full">
              <img
                src={member.avatar?.url || "https://placehold.co/100x100"}
                alt={member.fullname}
                className="h-32 w-32 rounded-full bg-amber-950 mx-auto mb-4 object-cover"
              />
              <h1 className="text-2xl font-semibold text-center capitalize">{member.fullname}</h1>
              <div className="pt-4 text-sm">
                <p>Email: {member.email}</p>
                <p>Age: {member.age} years</p>
                <p>DOB: {new Date(member.dob).toLocaleDateString()}</p>
                <p>Verified: {member.isEmailVarified ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
