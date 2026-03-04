// Système d'authentification simple (frontend uniquement)
// Pour une vraie app, utilisez un backend sécurisé

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'writer';
}

const AUTH_KEY = 'numcafe_auth_user';

export function login(email: string, password: string): User | null {
  // Utilisateurs de démo (EN PRODUCTION, VALIDEZ CÔTÉ SERVEUR!)
  const users: Record<string, { password: string; user: User }> = {
    'admin@numcafe.fr': {
      password: 'admin123',
      user: {
        id: '1',
        email: 'admin@numcafe.fr',
        name: 'Admin Numcafé',
        role: 'admin',
      },
    },
    'writer@numcafe.fr': {
      password: 'writer123',
      user: {
        id: '2',
        email: 'writer@numcafe.fr',
        name: 'Writer Numcafé',
        role: 'writer',
      },
    },
  };

  const userRecord = users[email];
  if (userRecord && userRecord.password === password) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userRecord.user));
    return userRecord.user;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser(): User | null {
  const userData = localStorage.getItem(AUTH_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function hasRole(role: 'admin' | 'writer'): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  if (role === 'admin') return user.role === 'admin';
  return user.role === 'admin' || user.role === 'writer';
}
