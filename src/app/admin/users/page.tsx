"use client"
import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  permissions: string;
  isSuperAdmin: boolean;
  isActive: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create User Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  // 🟢 New State for Super Admin creation
  const [isNewUserSuperAdmin, setIsNewUserSuperAdmin] = useState(false);

  // Edit Permissions Modal
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editPerms, setEditPerms] = useState<string[]>([]);

  // Reset Password State
  const [resetId, setResetId] = useState<string | null>(null);
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username, 
        password, 
        permissions: selectedPerms,
        // 🟢 Send the Super Admin status
        isSuperAdmin: isNewUserSuperAdmin 
      }),
    });
    
    if (res.ok) {
      alert("User Created!");
      // Reset Form
      setUsername('');
      setPassword('');
      setSelectedPerms([]);
      setIsNewUserSuperAdmin(false);
      fetchUsers();
    } else {
      alert("Error creating user");
    }
  };

  const handleResetPass = async () => {
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

  const toggleBan = async (userId: string, currentStatus: boolean) => {
    const action = currentStatus ? "Ban" : "Unban";
    if(!confirm(`Are you sure you want to ${action} this user?`)) return;

    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId, isActive: !currentStatus }), 
    });

    if (res.ok) fetchUsers();
  };

  const toggleSuperAdmin = async (userId: string, currentStatus: boolean) => {
     const action = currentStatus ? "Demote from" : "Promote to";
     if(!confirm(`Are you sure you want to ${action} Super Admin?`)) return;

     const res = await fetch('/api/admin/users', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ userId: userId, isSuperAdmin: !currentStatus }),
     });

     if (res.ok) fetchUsers();
  };

  const handleDelete = async (userId: string) => {
    if(!confirm("Permanently delete this user?")) return;
    const res = await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' });
    if (res.ok) fetchUsers();
  };

  const savePermissions = async () => {
    if (!editingUser) return;
    const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: editingUser.id, permissions: editPerms }),
    });
    if(res.ok) {
        setEditingUser(null);
        fetchUsers();
    }
  };

  // Helpers
  const toggleCreatePerm = (perm: string) => {
    if (selectedPerms.includes(perm)) setSelectedPerms(selectedPerms.filter(p => p !== perm));
    else setSelectedPerms([...selectedPerms, perm]);
  };

  const toggleEditPerm = (perm: string) => {
    if (editPerms.includes(perm)) setEditPerms(editPerms.filter(p => p !== perm));
    else setEditPerms([...editPerms, perm]);
  };

  const openEditModal = (user: User) => {
      setEditingUser(user);
      setEditPerms(user.permissions ? user.permissions.split(',') : []);
  };

  if (loading) return <div className="p-10 text-black">Loading users...</div>;

  return (
    <div className="p-6 text-black relative">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* CREATE USER FORM */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add New User</h2>
        <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-1">Username</label>
            <input className="w-full border p-2 rounded" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          
          <div className="col-span-2 space-y-3">
             {/* 🟢 SUPER ADMIN TOGGLE */}
             <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <input 
                  type="checkbox" 
                  id="isSuper" 
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                  checked={isNewUserSuperAdmin}
                  onChange={(e) => setIsNewUserSuperAdmin(e.target.checked)}
                />
                <div>
                  <label htmlFor="isSuper" className="font-bold text-blue-900 cursor-pointer">Make this user a Super Admin</label>
                  <p className="text-xs text-blue-700">Super Admins have full access to everything (including creating/deleting users).</p>
                </div>
             </div>

             {/* Permissions (Only show if NOT super admin, for clarity) */}
             {!isNewUserSuperAdmin && (
               <>
                <label className="block text-sm font-bold mb-2">Permissions:</label>
                <div className="flex gap-4">
                  {['dashboard', 'products', 'orders'].map(perm => (
                    <label key={perm} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-2 rounded border hover:bg-gray-100">
                      <input type="checkbox" checked={selectedPerms.includes(perm)} onChange={() => toggleCreatePerm(perm)} />
                      <span className="capitalize">{perm}</span>
                    </label>
                  ))}
                </div>
               </>
             )}
          </div>
          
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 w-fit">
             Create {isNewUserSuperAdmin ? 'Super Admin' : 'User'}
          </button>
        </form>
      </div>

      {/* USER LIST TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-sm uppercase text-gray-500">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Permissions</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id} className={`group transition-colors ${!user.isActive ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                
                {/* User Name */}
                <td className="p-4">
                  <div className="font-bold text-gray-900">{user.username}</div>
                  {user.isSuperAdmin && <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold tracking-wide">SUPER ADMIN</span>}
                </td>

                {/* Permissions */}
                <td className="p-4">
                  {user.isSuperAdmin ? (
                    <span className="text-gray-500 italic font-medium">All Access</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.split(',').filter(Boolean).map(p => (
                        <span key={p} className="bg-gray-100 border text-xs px-2 py-1 rounded capitalize">{p}</span>
                      ))}
                      <button onClick={() => openEditModal(user)} className="text-blue-600 text-xs hover:underline ml-2">Edit</button>
                    </div>
                  )}
                </td>

                {/* Status */}
                <td className="p-4">
                  {user.isActive ? (
                    <span className="text-green-600 font-bold text-sm flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Active</span>
                  ) : (
                    <span className="text-red-600 font-bold text-sm flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Banned</span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex justify-end items-center gap-3">
                    
                    {/* Password Reset */}
                    {resetId === user.id ? (
                      <div className="flex gap-2 animate-fadeIn">
                        <input 
                          type="text" 
                          placeholder="New Pass" 
                          className="border p-1 rounded text-xs w-24"
                          value={newPass}
                          onChange={e => setNewPass(e.target.value)}
                        />
                        <button onClick={handleResetPass} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Save</button>
                        <button onClick={() => setResetId(null)} className="text-gray-400 text-xs">X</button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setResetId(user.id)}
                        className="text-blue-600 hover:underline text-xs font-bold"
                      >
                        Change Pass
                      </button>
                    )}

                    <div className="h-4 w-px bg-gray-300"></div>

                    {/* Super Admin Toggle */}
                    <button 
                      onClick={() => toggleSuperAdmin(user.id, user.isSuperAdmin)}
                      className="text-yellow-600 hover:text-yellow-700 text-xs font-bold"
                    >
                       {user.isSuperAdmin ? 'Demote' : 'Make Super'}
                    </button>

                    {/* Ban / Unban */}
                    <button 
                      onClick={() => toggleBan(user.id, user.isActive)}
                      className={`px-3 py-1 rounded text-xs font-bold text-white transition ${user.isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                      {user.isActive ? 'Ban' : 'Unban'}
                    </button>

                    {/* Delete */}
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT PERMISSIONS MODAL */}
      {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                  <h3 className="text-lg font-bold mb-4">Edit Permissions: {editingUser.username}</h3>
                  <div className="flex flex-col gap-2 mb-6">
                    {['dashboard', 'products', 'orders'].map(perm => (
                        <label key={perm} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                        <input type="checkbox" checked={editPerms.includes(perm)} onChange={() => toggleEditPerm(perm)} />
                        <span className="capitalize font-medium">{perm}</span>
                        </label>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingUser(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                      <button onClick={savePermissions} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">Save</button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
}