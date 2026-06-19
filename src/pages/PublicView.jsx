import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DATA_AWAL = [
  { id: 1, nama: 'Beras', harga: 14000, satuan: 'kg', kategori: 'Pokok', diperbarui: new Date().toISOString() },
  { id: 2, nama: 'Gula Pasir', harga: 17000, satuan: 'kg', kategori: 'Pokok', diperbarui: new Date().toISOString() },
  { id: 3, nama: 'Minyak Goreng', harga: 18000, satuan: 'liter', kategori: 'Pokok', diperbarui: new Date().toISOString() },
  { id: 4, nama: 'Tepung Terigu', harga: 12000, satuan: 'kg', kategori: 'Pokok', diperbarui: new Date().toISOString() },
  { id: 5, nama: 'Telur Ayam', harga: 28000, satuan: 'kg', kategori: 'Protein', diperbarui: new Date().toISOString() },
  { id: 6, nama: 'Garam', harga: 3000, satuan: 'bungkus', kategori: 'Bumbu', diperbarui: new Date().toISOString() },
  { id: 7, nama: 'Mie Instan', harga: 3500, satuan: 'bungkus', kategori: 'Pokok', diperbarui: new Date().toISOString() },
  { id: 8, nama: 'Kecap', harga: 8000, satuan: 'botol', kategori: 'Bumbu', diperbarui: new Date().toISOString() },
]

export default function PublicView() {
  const [barang, setBarang] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('sembako')
    if (data) {
      setBarang(JSON.parse(data))
    } else {
      localStorage.setItem('sembako', JSON.stringify(DATA_AWAL))
      setBarang(DATA_AWAL)
    }
  }, [])

  const formatHarga = (harga) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(harga)

  const formatTanggal = (iso) =>
    new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: '#fff8f0', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>🛒 Warung Budhe</h1>
        <p style={{ color: '#fff3e0', margin: '4px 0 0', fontSize: '14px' }}>Daftar Harga Sembako Hari Ini</p>
      </div>

      {/* Daftar Barang */}
      <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
        {barang.map(item => (
          <div key={item.id} style={{
            background: 'white', borderRadius: '12px', padding: '16px',
            marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#1f2937' }}>{item.nama}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                per {item.satuan} • {item.kategori}
              </div>
              <div style={{ fontSize: '11px', color: '#d1d5db', marginTop: '2px' }}>
                Diperbarui: {formatTanggal(item.diperbarui)}
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f97316' }}>
              {formatHarga(item.harga)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af', fontSize: '12px' }}>
        <Link to="/admin" style={{ color: '#f97316', textDecoration: 'none' }}>Login Admin</Link>
      </div>
    </div>
  )
}