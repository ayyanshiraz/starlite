"use client"
import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  permissions: string;
  isSuperAdmin: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  
  // Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  
  // Password Reset State
  const [resetId, setResetId] = useState<string | null>(null);
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username, 
        password, 
        permissions: selectedPerms 
      }),
    });
    
    if (res.ok) {
      alert("User Created!");
      setUsername('');
      setPassword('');
      setSelectedPerms([]);
      fetchUsers();
    } else {
      alert("Error creating user");
    }
  };

  const handleAdminResetPass = async () => {
    if (!resetId || !newPass) return;
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: resetId, newPassword: newPass }),
    });

    if (res.ok) {
      alert("Password Updated!");
      setResetId(null);
      setNewPass('');
    }
  };

  const togglePerm = (perm: string) => {
    if (selectedPerms.includes(perm)) {
      setSelectedPerms(selectedPerms.filter(p => p !== perm));
    } else {
      setSelectedPerms([...selectedPerms, perm]);
    }
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* --- ADD USER FORM --- */}
      <div className="bg-white p-6 rounded shadow mb-8 border">
        <h2 className="text-lg font-bold mb-4">Add New Admin User</h2>
        <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-1">Username</label>
            <input type="text" className="w-full border p-2 rounded" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input type="text" className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">Access Permissions:</label>
            <div className="flex gap-4">
              {['dashboard', 'products', 'orders'].map(perm => (
                <label key={perm} className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded">
                  <input 
                    type="checkbox" 
                    checked={selectedPerms.includes(perm)}
                    onChange={() => togglePerm(perm)}
                  />
                  <span className="capitalize">{perm}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-fit">
            Create User
          </button>
        </form>
      </div>

      {/* --- USERS LIST --- */}
      <div className="bg-white rounded shadow border">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Username</th>
              <th className="p-4">Permissions</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-4 font-bold">
                  {user.username} 
                  {user.isSuperAdmin && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">SUPER ADMIN</span>}
                </td>
                <td className="p-4">
                  {user.isSuperAdmin ? "ALL ACCESS" : user.permissions.split(',').map(p => (
                    <span key={p} className="bg-gray-200 text-xs px-2 py-1 rounded mr-1 capitalize">{p}</span>
                  ))}
                </td>
                <td className="p-4">
                  {!user.isSuperAdmin && (
                    <div className="flex gap-2 items-center">
                      {resetId === user.id ? (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="New Pass" 
                            className="border p-1 rounded text-sm w-32"
                            value={newPass}
                            onChange={e => setNewPass(e.target.value)}
                          />
                          <button onClick={handleAdminResetPass} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Save</button>
                          <button onClick={() => setResetId(null)} className="text-gray-500 text-xs">Cancel</button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setResetId(user.id)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Change Password
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}