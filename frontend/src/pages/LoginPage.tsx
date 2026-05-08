import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { axiosClient } from '../api/axiosClient';

export const LoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Generate floating particles on mount
    const colors = ['#5B4FE9','#8B5CF6','#EC4899','#06B6D4','#10B981','#F59E0B'];
    const newParticles = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
    
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await axiosClient.post('/auth/login', { email, password });
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <style>{`
        .login-wrapper {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0F0A2E;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        .login-wrapper::before {
          content: '';
          position: absolute;
          top: -120px; left: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 65%);
          border-radius: 50%;
          animation: blob1 8s ease-in-out infinite;
        }
        
        .login-wrapper::after {
          content: '';
          position: absolute;
          bottom: -100px; right: -100px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 65%);
          border-radius: 50%;
          animation: blob2 10s ease-in-out infinite;
        }
        
        @keyframes blob1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-30px, -40px) scale(1.1); }
        }
        
        .login-blob3 {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .login-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .login-dot {
          position: absolute;
          border-radius: 50%;
          animation: float linear infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20px) rotate(720deg); opacity: 0; }
        }
        
        .login-card {
          position: relative;
          z-index: 10;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 28px;
          padding: 52px 48px 44px;
          width: 440px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset;
        }
        
        .login-logo-icon {
          width: 60px; height: 60px;
          border-radius: 18px;
          background: linear-gradient(135deg, #5B4FE9, #EC4899);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 28px;
          font-size: 26px;
          box-shadow: 0 8px 24px rgba(91,79,233,0.5);
          position: relative;
        }
        
        .login-logo-icon::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(139,92,246,0.6), rgba(236,72,153,0.6));
          z-index: -1;
          filter: blur(10px);
        }
        
        .login-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: white;
          text-align: center;
          letter-spacing: -0.6px;
          margin-bottom: 8px;
        }
        
        .login-title span {
          background: linear-gradient(90deg, #8B5CF6, #EC4899, #06B6D4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .login-subtitle {
          text-align: center;
          font-size: 13.5px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 36px;
          line-height: 1.5;
        }
        
        .login-subtitle code {
          background: rgba(139,92,246,0.25);
          color: rgba(255,255,255,0.7);
          padding: 1px 6px;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
        }
        
        .login-field {
          margin-bottom: 16px;
          position: relative;
        }
        
        .login-field label {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          margin-bottom: 8px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        
        .login-field-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .login-field-icon {
          position: absolute;
          left: 16px;
          color: rgba(255,255,255,0.35);
          font-size: 16px;
          pointer-events: none;
        }
        
        .login-field input {
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 14px 16px 14px 44px;
          font-size: 14.5px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        
        .login-field input::placeholder { color: rgba(255,255,255,0.3); }
        
        .login-field input:focus {
          border-color: rgba(139,92,246,0.7);
          background: rgba(139,92,246,0.1);
          box-shadow: 0 0 0 4px rgba(91,79,233,0.15);
        }
        
        .login-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          margin: 8px 0 24px;
        }
        
        .login-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #5B4FE9 0%, #8B5CF6 50%, #EC4899 100%);
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.2px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 24px rgba(91,79,233,0.45);
        }
        
        .login-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.4s;
        }
        
        .login-btn:hover::before { left: 100%; }
        .login-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(91,79,233,0.55); }
        .login-btn:active { transform: translateY(0); }
        
        .login-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: rgba(255,255,255,0.3);
        }
        
        .login-footer a {
          color: rgba(139,92,246,0.8);
          text-decoration: none;
          font-weight: 500;
        }
        
        .login-pills {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 20px;
        }
        
        .login-pill {
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .login-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>
      
      <div className="login-blob3"></div>
      
      <div className="login-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="login-dot"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              background: p.color,
              opacity: 0.6,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      
      <div className="login-card">
        <div className="login-logo-icon">🔐</div>
      
        <div className="login-title">Sign in to <span>CRM Pro</span></div>
        <div className="login-subtitle">
          Use <code>admin@example.com</code> / <code>password123</code> to test
        </div>
      
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label>Email Address</label>
            <div className="login-field-wrap">
              <span className="login-field-icon">✉️</span>
              <input 
                type="email" 
                placeholder="admin@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        
          <div className="login-field">
            <label>Password</label>
            <div className="login-field-wrap">
              <span className="login-field-icon">🔑</span>
              <input 
                type="password" 
                placeholder="••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        
          <div className="login-divider"></div>
        
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>
      
        <div className="login-footer">
          Don't have an account? <a href="#">Request access</a>
        </div>
      
        <div className="login-pills">
          <div className="login-pill" style={{background: '#5B4FE9'}}></div>
          <div className="login-pill" style={{background: '#8B5CF6'}}></div>
          <div className="login-pill" style={{background: '#EC4899'}}></div>
          <div className="login-pill" style={{background: '#06B6D4'}}></div>
          <div className="login-pill" style={{background: '#10B981'}}></div>
        </div>
      </div>
    </div>
  );
};


