import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from './ui/Button';
import { LoginModal } from './LoginModal';
import { Coins } from 'lucide-react';

export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Coins className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">CryptoTrade</span>
            </Link>
            <nav className="ml-8 flex items-center space-x-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/trade"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === '/trade' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                Trade
              </Link>
            </nav>
          </div>
          <div>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user.email}</span>
                <Button variant="secondary" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
            )}
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};