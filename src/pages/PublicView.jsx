import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function PublicView() {
  const [barang, setBarang] = useState([])
  const [search, setSearch] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBarang()
  }, [])

  const fetchBarang = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('barang')
      .select('*')
      .order('nama', { ascending: true })
    if (!error) setBarang(data)
    setLoading(false)
  }

  const formatHarga = (harga) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(harga)

  const formatTanggal = (iso) =>
    new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

  const filtered = barang.filter(b =>
    b.nama.toLowerCase().includes(search.toLowerCase()) ||
    (b.merek && b.merek.toLowerCase().includes(search.toLowerCase())) ||
    (b.varian && b.varian.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{ minHeight: '100vh', background: '#dedee6', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1c569c, #2d7dd2)', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: 'bold' }}>🛒 Warung Budhe</h1>
            <p style={{ color: 'white', margin: 0, fontSize: '13px' }}>Daftar Harga Sembako Hari Ini</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
          >
            🔐 Login
          </button>
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
          <input
            type="text"
            placeholder="Cari barang, merek, varian..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '10px', border: 'none', fontSize: '14px', boxSizing: 'border-box', outline: 'none', background: 'white', color: '#1c569c' }}
          />
        </div>
      </div>

      {/* Daftar Barang */}
      <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {loading && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#1c569c', marginTop: '40px' }}>
            Memuat data...
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#1c569c', marginTop: '40px' }}>
            Barang tidak ditemukan 😔
          </div>
        )}
        {filtered.map(item => (
          <div key={item.id} style={{
            background: 'white', borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(28,86,156,0.1)',
            borderTop: '4px solid #1c569c',
            display: 'flex', flexDirection: 'column'
          }}>
            {item.foto
              ? <img src={item.foto} alt={item.nama} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '80px', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🛒</div>
            }
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1c569c' }}>{item.nama}</div>
              {item.merek && <div style={{ fontSize: '11px', color: '#2d7dd2' }}>🏷️ {item.merek}</div>}
              {item.varian && <div style={{ fontSize: '11px', color: '#2d7dd2' }}>✨ {item.varian}</div>}
              <div style={{ fontSize: '12px', color: '#1c569c' }}>per {item.jumlah || '1'} {item.satuan}</div>
              {item.deskripsi && <div style={{ fontSize: '11px', color: '#6b7280' }}>{item.deskripsi}</div>}
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1c569c', marginTop: '4px' }}>{formatHarga(item.harga)}</div>
              <div style={{ fontSize: '10px', color: '#9ecbff' }}>Diperbarui: {formatTanggal(item.diperbarui)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px', color: '#1c569c', fontSize: '12px' }}>
        © 2026 Warung Budhe • Murah dan Berkah
      </div>
    </div>
  )
}