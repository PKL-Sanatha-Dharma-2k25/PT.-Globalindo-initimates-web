import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Upload, AlertCircle, CheckCircle } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function ProductPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    mainImage: '',
    descriptionShort: '',
    descriptionLong: '',
    variantImages: ['', '', '', '', ''],
    features: [],
    layersProtection: []
  });

  const categories = [
    "Ladies Underwear", "Man Underwear", "Sport Wear", "Kids Wear", "Hospital Uniforms", "Jackets & Hoodies"
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const getToken = () => localStorage.getItem('adminToken');

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL.replace('/api', '')}/${imagePath}`;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      const productsList = data.data || data.products || data || [];
      setProducts(productsList);
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Gagal memuat produk' });
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleImageUpload = async (e, fieldName, variantIndex = null) => {
    const file = e.target.files[0];
    if (!file) {
      alert('Pilih file terlebih dahulu!');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar!');
      return;
    }

    setUploadingImage(variantIndex !== null ? `variant-${variantIndex}` : fieldName);
    const formDataToSend = new FormData();
    formDataToSend.append('file', file);

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formDataToSend
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();

      if (result.success && result.filePath) {
        if (variantIndex !== null) {
          setFormData(prev => {
            const newVariants = [...prev.variantImages];
            newVariants[variantIndex] = result.filePath;
            return { ...prev, variantImages: newVariants };
          });
          setMessage({ type: 'success', text: `Variant Image ${variantIndex + 1} berhasil diupload!` });
        } else {
          setFormData(prev => ({ ...prev, [fieldName]: result.filePath }));
          setMessage({ type: 'success', text: 'Gambar berhasil diupload!' });
        }
      } else {
        setMessage({ type: 'error', text: 'Gagal upload. Coba lagi.' });
      }
    } catch (error) {
      console.error('Upload Error:', error);
      setMessage({ type: 'error', text: 'Error upload: ' + error.message });
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = [];
    if (!formData.name?.trim()) emptyFields.push('Product Name');
    if (!formData.category?.trim()) emptyFields.push('Category');
    if (!formData.image?.trim()) emptyFields.push('Product Image');
    if (!formData.mainImage?.trim()) emptyFields.push('Main Image');
    if (!formData.descriptionShort?.trim()) emptyFields.push('Short Description');
    if (!formData.descriptionLong?.trim()) emptyFields.push('Long Description');

    if (emptyFields.length > 0) {
      setMessage({ type: 'error', text: `Field yang wajib diisi: ${emptyFields.join(', ')}` });
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        setMessage({ type: 'error', text: 'Not authenticated!' });
        return;
      }

      const url = editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`;
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        image: formData.image.trim(),
        mainImage: formData.mainImage.trim(),
        descriptionShort: formData.descriptionShort.trim(),
        descriptionLong: formData.descriptionLong.trim(),
        variantImages: formData.variantImages.filter(v => v && v.trim()),
        features: formData.features.filter(f => f && f.trim()),
        layersProtection: formData.layersProtection.filter(l => l && l.trim())
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: editingId ? 'Produk berhasil diupdate!' : 'Produk berhasil dibuat!' 
        });
        setShowForm(false);
        setEditingId(null);
        setFormData({ 
          name: '', 
          category: '', 
          image: '', 
          mainImage: '', 
          descriptionShort: '', 
          descriptionLong: '', 
          variantImages: ['', '', '', '', ''], 
          features: [], 
          layersProtection: [] 
        });
        fetchProducts();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Gagal simpan produk' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Error: ' + error.message });
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      image: product.image,
      mainImage: product.mainImage,
      descriptionShort: product.descriptionShort,
      descriptionLong: product.descriptionLong,
      variantImages: [...(product.variantImages || []), '', '', '', '', ''].slice(0, 5),
      features: Array.isArray(product.features) ? product.features : [],
      layersProtection: Array.isArray(product.layersProtection) ? product.layersProtection : []
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        const token = getToken();
        const res = await fetch(`${API_URL}/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
          setMessage({ type: 'success', text: 'Produk berhasil dihapus!' });
          fetchProducts();
          setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } else {
          setMessage({ type: 'error', text: 'Gagal hapus produk' });
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage({ type: 'error', text: 'Error: ' + error.message });
      }
    }
  };

  const ImageUploadField = ({ fieldName, label }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, fieldName)}
          disabled={uploadingImage === fieldName}
          className="hidden"
          id={fieldName}
        />
        <label htmlFor={fieldName} className="flex items-center gap-2 px-4 py-2 bg-[#FF6600] text-white rounded cursor-pointer hover:bg-[#E55A00] font-medium">
          <Upload size={18} />
          {uploadingImage === fieldName ? 'Uploading...' : 'Upload Foto'}
        </label>
        {formData[fieldName] && (
          <div className="flex-1">
            <p className="text-sm text-gray-600 truncate">✓ {formData[fieldName]}</p>
            <img src={getImageUrl(formData[fieldName])} alt="preview" className="mt-2 h-16 w-16 object-cover rounded" onError={(e) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e5e7eb' width='100' height='100'/%3E%3C/svg%3E"; }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <style>
        {`
          h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }
          body, p, span, button, div { font-family: 'Lato', sans-serif; }
        `}
      </style>

      {/* Message Alert */}
      {message.text && (
        <div className={`p-4 rounded-lg flex items-center gap-3 border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-300 text-green-800'
            : 'bg-red-50 border-red-300 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Produk</h1>
          <p className="text-gray-600 text-sm mt-2">Tambah, edit, atau hapus produk toko Anda</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({ 
              name: '', 
              category: '', 
              image: '', 
              mainImage: '', 
              descriptionShort: '', 
              descriptionLong: '', 
              variantImages: ['', '', '', '', ''], 
              features: [], 
              layersProtection: [] 
            });
          }}
          className="flex items-center gap-2 bg-[#FF6600] text-white px-6 py-2 rounded-lg hover:bg-[#E55A00] font-medium"
        >
          <Plus size={20} />
          Tambah Produk Baru
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[95vh] overflow-y-auto border border-gray-200 my-8">
            <div className="sticky top-0 bg-gradient-to-r from-[#FF6600] to-[#E55A00] border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingId ? '✏️ Edit Produk' : '➕ Tambah Produk Baru'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="border-l-4 border-[#FF6600] pl-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Informasi Dasar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Produk *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none"
                      placeholder="Contoh: Premium Period Panty"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none"
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="border-l-4 border-[#FF6600] pl-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🖼️ Upload Gambar</h3>
                <div className="space-y-4">
                  <ImageUploadField fieldName="image" label="Gambar Produk *" />
                  <ImageUploadField fieldName="mainImage" label="Gambar Utama *" />
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">🖼️ Varian Gambar (5 Maksimal)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {formData.variantImages.map((img, idx) => (
                        <div key={idx} className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 hover:border-[#FF6600] transition">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'variantImages', idx)}
                            disabled={uploadingImage === `variant-${idx}`}
                            className="hidden"
                            id={`variant-${idx}`}
                          />
                          <label htmlFor={`variant-${idx}`} className="flex flex-col items-center gap-2 cursor-pointer">
                            {img ? (
                              <div className="w-full">
                                <img src={getImageUrl(img)} alt={`variant-${idx}`} className="w-full h-24 object-cover rounded-lg" onError={(e) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e5e7eb' width='100' height='100'/%3E%3C/svg%3E"; }} />
                                <p className="text-xs text-center text-green-600 font-bold mt-1">✓ Terupload</p>
                              </div>
                            ) : (
                              <>
                                <Upload size={20} className="text-gray-400" />
                                <span className="text-xs font-semibold text-gray-600 text-center">Varian {idx + 1}</span>
                                {uploadingImage === `variant-${idx}` && (
                                  <span className="text-xs text-[#FF6600] font-bold">Uploading...</span>
                                )}
                              </>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">💡 Upload hingga 5 gambar varian. Setiap gambar akan ditampilkan di modal produk</p>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="border-l-4 border-[#FF6600] pl-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Deskripsi Produk</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi *</label>
                  <textarea
                    name="descriptionShort"
                    value={formData.descriptionShort}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none resize-none"
                    placeholder="Ketik deskripsi produk lengkap di sini..."
                  />
                </div>
              </div>

              {/* Preview */}
              {(formData.name || formData.image) && (
                <div className="border-2 border-[#FF6600] rounded-lg p-4 bg-orange-50">
                  <p className="text-xs text-gray-600 mb-2">💡 Setiap data akan langsung muncul di halaman produk setelah disimpan</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t-2 border-gray-200">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#FF6600] text-white py-2 rounded-lg hover:bg-[#E55A00] font-bold text-lg"
                >
                  {editingId ? '💾 Update Produk' : '➕ Buat Produk'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-bold"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Belum ada produk</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#FF6600] to-[#E55A00] border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Nama Produk</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Dibuat</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-white">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product._id} className="hover:bg-orange-50 transition">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#FF6600]">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{product.descriptionShort}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(product.createdAt).toLocaleDateString('id-ID')}</td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <button onClick={() => handleEdit(product)} className="inline-flex items-center text-[#FF6600] hover:text-[#E55A00] font-bold">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="inline-flex items-center text-red-600 hover:text-red-800 font-bold">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}