import React from 'react';
import { User } from '../types/User';
import { LogOut, Plus, ShieldCheck, Wifi, WifiOff, LayoutGrid } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  isConnected: boolean;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCreateTask: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  isConnected,
  onOpenAuth,
  onLogout,
  onOpenCreateTask,
}) => {
  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo-badge">
          <LayoutGrid className="logo-icon" size={24} />
          <span className="logo-text">SyncBoard</span>
        </div>
        <div className={`status-pill ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{isConnected ? 'Real-Time Sync Active' : 'Disconnected'}</span>
        </div>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <button className="btn btn-primary" onClick={onOpenCreateTask}>
              <Plus size={18} />
              <span>Create Task</span>
            </button>
            <div className="user-profile">
              <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
              <span className="username">{user.username}</span>
            </div>
            <button className="btn btn-ghost" onClick={onLogout} title="Logout">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={onOpenAuth}>
            <ShieldCheck size={18} />
            <span>Login / Register</span>
          </button>
        )}
      </div>
    </header>
  );
};
