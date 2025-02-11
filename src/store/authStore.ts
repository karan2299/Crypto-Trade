import { create } from 'zustand';
import { AuthState } from '../types';

// In a real app, this would be handled by a backend
const MOCK_USER = {
  email: 'demo@example.com',
  id: '1',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email: string, password: string) => {
    // Mock authentication - in real app would call API
    if (email && password) {
      set({ user: MOCK_USER });
    }
  },
  logout: () => {
    set({ user: null });
  },
}));