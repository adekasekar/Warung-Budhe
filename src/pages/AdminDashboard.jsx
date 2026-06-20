import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const [barang, setBarang] = useState([])
  const [form, setForm] = useState({ nama: '', merek: '', harga: '', satuan: 'kg', jumlah: '', deskripsi: '', foto: '' })
  const [editId, setEditId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [uploadingFoto, setUploadingFoto] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('adminLogin')) {
      navigate('/admin')
      return
    }
    const data = localStorage.getItem('sembako')
    if (data) setBarang(JSON.parse(data))
  }, [])

  const uploadFoto = async (file) => {
    setUploadingFoto(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'warung_budhe')
    const res = await fetch('https://api.cloudinary.com/v1_1/dlu7nfnav/image/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    setForm(f => ({ ...f, foto: data.secure_url }))
    setUploadingFoto(false)
  }

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
    setForm({ nama: '', merek: '', harga: '', satuan: 'kg', jumlah: '', deskripsi: '', foto: '' })
    setEditId(null)
    setShowModal(false)
  }

  const hapus = (id) => {
    if (!confirm('Yakin hapus barang ini?')) return
    const data = barang.filter(b => b.id !== id)
    localStorage.setItem('sembako', JSON.stringify(data))
    setBarang(data)
  }

  const bukaEdit = (item) => {
    setEditId(item.id)
    setForm({ nama: item.nama, merek: item.merek || '', harga: item.harga, satuan: item.satuan, jumlah: item.jumlah || '', deskripsi: item.deskripsi || '', foto: item.foto || '' })
    setShowModal(true)
  }

  const logout = () => {
    localStorage.removeItem('adminLogin')
    navigate('/admin')
  }

  const formatHarga = (h) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(h)

  const inputStyle = {
    width: '100%', padding: '10px', borderRadius: '8px',
    border: '1px solid #9ecbff', fontSize: '14px',
    boxSizing: 'border-box', marginBottom: '10px',
    outline: 'none', color: '#1c569c'
  }

  const FotoUpload = () => (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ fontSize: '13px', color: '#1c569c', marginBottom: '6px', display: 'block' }}>📷 Foto Produk</label>
      <input type="file" accept="image/*" onChange={e => uploadFoto(e.target.files[0])} style={{ width: '100%', fontSize: '13px' }} />
      {uploadingFoto && <p style={{ color: '#9ecbff', fontSize: '12px', marginTop: '4px' }}>Mengupload foto...</p>}
      {form.foto && <img src={form.foto} alt="preview" style={{ width: '100%', borderRadius: '8px', marginTop: '8px', maxHeight: '150px', objectFit: 'cover' }} />}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#dedee6', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1c569c, #2d7dd2)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>🛒 Warung Budhe</h2>
          <p style={{ color: '#9ecbff', margin: 0, fontSize: '12px' }}>Panel Admin</p>
        </div>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
          Keluar
        </button>
      </div>

      <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
        {/* Form Tambah */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(28,86,156,0.1)', borderTop: '4px solid #1c569c' }}>
          <h3 style={{ margin: '0 0 16px', color: '#1c569c' }}>➕ Tambah Barang</h3>
          <input placeholder="Nama barang" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} style={inputStyle} />
          <input placeholder="Merek (opsional)" value={form.merek} onChange={e => setForm({ ...form, merek: e.target.value })} style={inputStyle} />
          <input placeholder="Harga (angka saja)" type="number" value={form.harga} onChange={e => setForm({ ...form, harga: e.target.value })} style={inputStyle} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Jumlah" type="number" value={form.jumlah} onChange={e => setForm({ ...form, jumlah: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
            <select value={form.satuan} onChange={e => setForm({ ...form, satuan: e.target.value })} style={{ ...inputStyle, flex: 1 }}>
              <option value="kg">kg</option>
              <option value="gram">gram</option>
              <option value="liter">liter</option>
              <option value="ml">ml</option>
              <option value="bungkus">bungkus</option>
              <option value="botol">botol</option>
              <option value="buah">buah</option>
              <option value="ikat">ikat</option>
              <option value="pcs">pcs</option>
            </select>
          </div>
          <FotoUpload />
          <textarea placeholder="Deskripsi produk (opsional)" value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }} />
          <button onClick={simpan} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #1c569c, #2d7dd2)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Tambah
          </button>
        </div>

        {/* Daftar Barang */}
        <h3 style={{ color: '#1c569c', marginBottom: '12px' }}>Daftar Barang ({barang.length})</h3>
        {barang.map(item => (
          <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '10px', boxShadow: '0 2px 8px rgba(28,86,156,0.1)', borderLeft: '4px solid #1c569c' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                {item.foto && <img src={item.foto} alt={item.nama} style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', maxHeight: '120px', objectFit: 'cover' }} />}
                <div style={{ fontWeight: 'bold', color: '#1c569c' }}>{item.nama}</div>
                {item.merek && <div style={{ fontSize: '12px', color: '#2d7dd2', marginTop: '2px' }}>🏷️ {item.merek}</div>}
                <div style={{ color: '#2d7dd2', fontWeight: 'bold', fontSize: '15px', marginTop: '4px' }}>{formatHarga(item.harga)}</div>
                <div style={{ fontSize: '12px', color: '#9ecbff' }}>per {item.jumlah || '1'} {item.satuan}</div>
                {item.deskripsi && <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{item.deskripsi}</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '12px' }}>
                <button onClick={() => bukaEdit(item)} style={{ padding: '8px 14px', background: '#e8f0fe', color: '#1c569c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                <button onClick={() => hapus(item.id)} style={{ padding: '8px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', borderTop: '4px solid #1c569c', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 16px', color: '#1c569c' }}>✏️ Edit Barang</h3>
            <input placeholder="Nama barang" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} style={inputStyle} />
            <input placeholder="Merek (opsional)" value={form.merek} onChange={e => setForm({ ...form, merek: e.target.value })} style={inputStyle} />
            <input placeholder="Harga (angka saja)" type="number" value={form.harga} onChange={e => setForm({ ...form, harga: e.target.value })} style={inputStyle} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input placeholder="Jumlah" type="number" value={form.jumlah} onChange={e => setForm({ ...form, jumlah: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
              <select value={form.satuan} onChange={e => setForm({ ...form, satuan: e.target.value })} style={{ ...inputStyle, flex: 1 }}>
                <option value="kg">kg</option>
                <option value="gram">gram</option>
                <option value="liter">liter</option>
                <option value="ml">ml</option>
                <option value="bungkus">bungkus</option>
                <option value="botol">botol</option>
                <option value="buah">buah</option>
                <option value="ikat">ikat</option>
                <option value="pcs">pcs</option>
              </select>
            </div>
            <FotoUpload />
            <textarea placeholder="Deskripsi produk (opsional)" value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={simpan} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #1c569c, #2d7dd2)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Simpan
              </button>
              <button onClick={() => { setShowModal(false); setEditId(null); setForm({ nama: '', merek: '', harga: '', satuan: 'kg', jumlah: '', deskripsi: '', foto: '' }) }}
                style={{ padding: '12px 16px', background: '#dedee6', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#1c569c', fontWeight: 'bold' }}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}