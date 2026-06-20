import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('adminLogin', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Username atau password salah!')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#dedee6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '360px', boxShadow: '0 4px 20px rgba(28,86,156,0.15)', borderTop: '5px solid #1c569c' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '40px' }}>🛒</div>
          <h2 style={{ color: '#1c569c', margin: '8px 0 4px' }}>Warung Budhe</h2>
          <p style={{ color: '#9ecbff', fontSize: '14px', margin: 0 }}>Login Admin</p>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #9ecbff', marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', color: '#1c569c' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #9ecbff', marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', color: '#1c569c' }}
        />

        {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #1c569c, #2d7dd2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Masuk
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href="/" style={{ color: '#9ecbff', fontSize: '13px' }}>← Kembali ke Daftar Harga</a>
        </div>
      </div>
    </div>
  )
}