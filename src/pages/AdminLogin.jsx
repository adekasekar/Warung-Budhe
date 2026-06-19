import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === 'admin' && password === 'warungbudhe123') {
      localStorage.setItem('adminLogin', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Username atau password salah!')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '360px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '40px' }}>🛒</div>
          <h2 style={{ color: '#f97316', margin: '8px 0 4px' }}>Warung Budhe</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Login Admin</p>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box' }}
        />

        {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Masuk
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href="/" style={{ color: '#9ca3af', fontSize: '13px' }}>← Kembali ke Daftar Harga</a>
        </div>
      </div>
    </div>
  )
}