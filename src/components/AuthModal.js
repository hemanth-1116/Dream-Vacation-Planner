import React, { useState } from 'react';
import './AuthModal.css';

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form>
          {!isLogin && <input type="text" placeholder="Name" />}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'No account? Register' : 'Already have an account? Login'}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AuthModal;
