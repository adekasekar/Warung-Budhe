import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const [barang, setBarang] = useState([])
  const [form, setForm] = useState({ nama: '', harga: '', satuan: 'kg', kategori: 'Pokok' })
  const [editId, setEditId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('adminLogin')) {
      navigate('/admin')
      return
    }
    const data = localStorage.getItem('sembako')
    if (data) setBarang(JSON.parse(data))
  }, [])

  const simpan = () => {
    if (!form.nama || !form.harga) return alert('Nama dan harga wajib diisi!')
    let data
    if (editId !== null) {
      data = barang.map(b => b.id === editId ? { ...b, ...form, harga: Number(form.harga), diperbarui: new Date().toISOString() } : b)
    } else {
      const baru = { id: Date.now(), ...form, harga: Number(form.harga), diperbarui: new Date().toISOString() }
      data = [...barang, baru]
    }
    localStorage.setItem('sembako', JSON.stringify(data))
    setBarang(data)
    setForm({ nama: '', harga: '', satuan: 'kg', kategori: 'Pokok' })
    setEditId(null)
  }

  const hapus = (id) => {
    if (!confirm('Yakin hapus barang ini?')) return
    const data = barang.filter(b => b.id !== id)
    localStorage.setItem('sembako', JSON.stringify(data))
    setBarang(data)
  }

  const edit = (item) => {
    setEditId(item.id)
    setForm({ nama: item.nama, harga: item.harga, satuan: item.satuan, kategori: item.kategori })
  }

  const logout = () => {
    localStorage.removeItem('adminLogin')
    navigate('/admin')
  }

  const formatHarga = (h) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(h)

  const inputStyle = {
    width: '100%', padding: '10px', borderRadius: '8px',
    border: '1px solid #e5e7eb', fontSize: '14px',
    boxSizing: 'border-box', marginBottom: '10px'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff8f0', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>🛒 Warung Budhe</h2>
          <p style={{ color: '#fff3e0', margin: 0, fontSize: '12px' }}>Panel Admin</p>
        </div>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
          Keluar
        </button>
      </div>

      <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
        {/* Form Tambah/Edit */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px', color: '#1f2937' }}>{editId ? '✏️ Edit Barang' : '➕ Tambah Barang'}</h3>
          <input placeholder="Nama barang" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} style={inputStyle} />
          <input placeholder="Harga (angka saja)" type="number" value={form.harga} onChange={e => setForm({ ...form, harga: e.target.value })} style={inputStyle} />
          <select value={form.satuan} onChange={e => setForm({ ...form, satuan: e.target.value })} style={inputStyle}>
            <option value="kg">kg</option>
            <option value="liter">liter</option>
            <option value="bungkus">bungkus</option>
            <option value="botol">botol</option>
            <option value="buah">buah</option>
            <option value="ikat">ikat</option>
          </select>
          <select value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })} style={inputStyle}>
            <option value="Pokok">Pokok</option>
            <option value="Protein">Protein</option>
            <option value="Bumbu">Bumbu</option>
            <option value="Sayur">Sayur</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={simpan} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              {editId ? 'Simpan Perubahan' : 'Tambah'}
            </button>
            {editId && (
              <button onClick={() => { setEditId(null); setForm({ nama: '', harga: '', satuan: 'kg', kategori: 'Pokok' }) }}
                style={{ padding: '12px 16px', background: '#e5e7eb', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Batal
              </button>
            )}
          </div>
        </div>

        {/* Daftar Barang */}
        <h3 style={{ color: '#1f2937', marginBottom: '12px' }}>Daftar Barang ({barang.length})</h3>
        {barang.map(item => (
          <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{item.nama}</div>
                <div style={{ color: '#f97316', fontWeight: 'bold', fontSize: '15px' }}>{formatHarga(item.harga)}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>per {item.satuan} • {item.kategori}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => edit(item)} style={{ padding: '8px 14px', background: '#fef3c7', color: '#d97706', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                <button onClick={() => hapus(item.id)} style={{ padding: '8px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}