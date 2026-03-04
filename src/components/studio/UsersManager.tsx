import { useState } from 'react';
import { Users, Shield, Edit2, Plus, X } from 'lucide-react';
import { Modal } from './Modal';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'writer';
  articles_count: number;
}

export function UsersManager() {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'Admin Numcafé',
      email: 'admin@numcafe.fr',
      role: 'admin',
      articles_count: 0,
    },
    {
      id: '2',
      name: 'Writer Numcafé',
      email: 'writer@numcafe.fr',
      role: 'writer',
      articles_count: 0,
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'writer' as 'admin' | 'writer',
    password: '',
    confirmPassword: '',
  });

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
      confirmPassword: '',
    });
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      email: '',
      role: 'writer',
      password: '',
      confirmPassword: '',
    });
    setShowAddModal(true);
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ));
    }
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleSaveAdd = () => {
    const newUser: UserData = {
      id: `user-${Date.now()}`,
      ...formData,
      articles_count: 0,
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Gestion des utilisateurs</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-600">Nom</th>
              <th className="px-4 py-3 text-left text-xs text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-xs text-gray-600">Rôle</th>
              <th className="px-4 py-3 text-left text-xs text-gray-600">Articles</th>
              <th className="px-4 py-3 text-right text-xs text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C69C6D] rounded-full flex items-center justify-center text-white text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    {user.role === 'admin' ? 'Admin' : 'Writer'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.articles_count}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 text-gray-600 hover:text-[#C69C6D] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Edit */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Modifier l'utilisateur"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Rôle</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'writer' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            >
              <option value="writer">Writer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="Mot de passe de l'utilisateur"
            />
          </div>

          {formData.password && (
            <div>
              <label className="block text-sm mb-2 text-gray-700">Confirmer le mot de passe</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                placeholder="Confirmer le mot de passe"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSaveEdit}
              className="flex-1 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
            >
              Sauvegarder
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Add */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un utilisateur"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="Nom complet"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="email@numcafe.fr"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Rôle</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'writer' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            >
              <option value="writer">Writer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="Mot de passe de l'utilisateur"
            />
          </div>

          {formData.password && (
            <div>
              <label className="block text-sm mb-2 text-gray-700">Confirmer le mot de passe</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                placeholder="Confirmer le mot de passe"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSaveAdd}
              className="flex-1 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
            >
              Créer l'utilisateur
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}