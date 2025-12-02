"use client"
import { useState, useEffect } from 'react';
import AdminGuard from '@/components/admin/AdminGuard'; 

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  const [isNewUserSuperAdmin, setIsNewUserSuperAdmin] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editPerms, setEditPerms] = useState<string[]>([]);
  const [resetId, setResetId] = useState<string | null>(null);
  const [newPass, setNewPass] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } finally { setLoading(false); }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, permissions: selectedPerms, isSuperAdmin: isNewUserSuperAdmin }),
    });
    if (res.ok) {
      alert("User Created!");
      setUsername(''); setPassword(''); setSelectedPerms([]); setIsNewUserSuperAdmin(false);
      fetchUsers();
    } else { alert("Error creating user"); }
  };

  const handleResetPass = async () => {
    if (!resetId || !newPass) return;
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: resetId, newPassword: newPass }),
    });
    if (res.ok) { alert("Password Updated!"); setResetId(null); setNewPass(''); }
  };

  const toggleBan = async (userId: string, currentStatus: boolean) => {
    if(!confirm(`Are you sure?`)) return;
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId, isActive: !currentStatus }), 
    });
    if (res.ok) fetchUsers();
  };

  const toggleSuperAdmin = async (userId: string, currentStatus: boolean) => {
     if(!confirm(`Change Super Admin status?`)) return;
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
    if(res.ok) { setEditingUser(null); fetchUsers(); }
  };

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
    <AdminGuard requiredPermission="users">
      <div className="p-6 text-black relative min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">User Management</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-10">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Add New User</h2>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><label className="block text-sm font-bold mb-2 text-gray-700">Username</label><input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={username} onChange={e => setUsername(e.target.value)} required /></div>
            <div><label className="block text-sm font-bold mb-2 text-gray-700">Password</label><input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={e => setPassword(e.target.value)} required /></div>
            <div className="col-span-2 space-y-4">
               <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg transition-colors hover:bg-blue-100/50">
                  <input type="checkbox" id="isSuper" className="w-5 h-5 cursor-pointer accent-blue-600" checked={isNewUserSuperAdmin} onChange={(e) => setIsNewUserSuperAdmin(e.target.checked)}/>
                  <div><label htmlFor="isSuper" className="font-bold text-blue-900 cursor-pointer select-none">Make this user a Super Admin</label><p className="text-xs text-blue-700 mt-0.5">Super Admins have full access to everything.</p></div>
               </div>
               {!isNewUserSuperAdmin && (
                 <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-bold mb-3 text-gray-700">Specific Permissions:</label>
                  <div className="flex gap-4 flex-wrap">
                    {['dashboard', 'products', 'orders', 'users'].map(perm => (
                      <label key={perm} className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 px-4 py-2 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all select-none">
                        <input type="checkbox" checked={selectedPerms.includes(perm)} onChange={() => toggleCreatePerm(perm)} className="accent-blue-600 w-4 h-4" /><span className="capitalize font-medium text-gray-700">{perm}</span>
                      </label>
                    ))}
                  </div>
                 </div>
               )}
            </div>
            <div className="col-span-2"><button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform active:scale-95">Create {isNewUserSuperAdmin ? 'Super Admin' : 'User'}</button></div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <tr><th className="p-5">User</th><th className="p-5">Permissions</th><th className="p-5">Status</th><th className="p-5 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {users.map(user => (
                  <tr key={user.id} className={`group transition-colors ${!user.isActive ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                    <td className="p-5"><div className="font-bold text-gray-900 text-base">{user.username}</div>{user.isSuperAdmin && <span className="inline-block mt-1 text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold tracking-wide border border-yellow-200">SUPER ADMIN</span>}</td>
                    <td className="p-5">{user.isSuperAdmin ? <span className="text-gray-400 italic font-medium">All Access</span> : <div className="flex flex-wrap gap-2 items-center">{user.permissions.split(',').filter(Boolean).map(p => <span key={p} className="bg-gray-100 border border-gray-200 text-xs px-2.5 py-1 rounded-md capitalize text-gray-700 font-medium shadow-sm">{p}</span>)}<button onClick={() => openEditModal(user)} className="text-blue-600 text-xs font-bold hover:underline ml-1">Edit</button></div>}</td>
                    <td className="p-5">{user.isActive ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Active</span> : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200"><span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Banned</span>}</td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end items-center gap-3">
                        {resetId === user.id ? <div className="flex gap-2 animate-in fade-in slide-in-from-right-4 items-center bg-gray-100 p-1 rounded-lg border border-gray-200"><input type="text" placeholder="New Pass" className="border border-gray-300 p-1 rounded text-xs w-24 focus:ring-1 focus:ring-blue-500 outline-none" value={newPass} onChange={e => setNewPass(e.target.value)} /><button onClick={handleResetPass} className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 font-bold">Save</button><button onClick={() => setResetId(null)} className="text-gray-400 hover:text-gray-600 px-1">✕</button></div> : <button onClick={() => setResetId(user.id)} className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md text-xs font-bold transition-all">Change Pass</button>}
                        <div className="h-4 w-px bg-gray-300"></div>
                        <button onClick={() => toggleSuperAdmin(user.id, user.isSuperAdmin)} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${user.isSuperAdmin ? 'text-orange-600 hover:bg-orange-50' : 'text-purple-600 hover:bg-purple-50'}`}>{user.isSuperAdmin ? 'Demote' : 'Promote'}</button>
                        <button onClick={() => toggleBan(user.id, user.isActive)} className={`px-3 py-1.5 rounded-md text-xs font-bold text-white transition-all shadow-sm ${user.isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}>{user.isActive ? 'Ban' : 'Unban'}</button>
                        {!user.isSuperAdmin && <button onClick={() => handleDelete(user.id)} className="bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 px-3 py-1.5 rounded-md text-xs font-bold transition-all">Delete</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editingUser && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 transform scale-100 transition-all">
                    <h3 className="text-lg font-bold mb-1 text-gray-900">Edit Permissions</h3>
                    <p className="text-sm text-gray-500 mb-6">For user: <span className="font-mono font-bold text-gray-800">{editingUser.username}</span></p>
                    <div className="flex flex-col gap-2 mb-8">
                      {['dashboard', 'products', 'orders', 'users'].map(perm => (
                          <label key={perm} className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all ${editPerms.includes(perm) ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                          <input type="checkbox" checked={editPerms.includes(perm)} onChange={() => toggleEditPerm(perm)} className="w-4 h-4 accent-blue-600" /><span className="capitalize font-medium text-gray-700">{perm}</span></label>
                      ))}
                    </div>
                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button onClick={() => setEditingUser(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition">Cancel</button>
                        <button onClick={savePermissions} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-sm shadow-md transition transform active:scale-95">Save Changes</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </AdminGuard>
  );
}