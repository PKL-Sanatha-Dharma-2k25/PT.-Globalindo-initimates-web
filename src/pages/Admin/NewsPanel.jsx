import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, AlertCircle, CheckCircle, Search, Upload, Filter, Eye } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function NewsPanel() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'product',
    image: '',
    status: 'published',
    source: 'PT. Globalindo Intimates',
    sourceUrl: ''
  });

  // Fetch all news
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/news`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setNewsList(data.data);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Gagal fetch berita' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    const formDataToSend = new FormData();
    formDataToSend.append('file', file);

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formDataToSend
      });

      const result = await res.json();

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          image: result.filePath
        }));
        setMessage({ type: 'success', text: 'Foto berhasil diupload!' });
      } else {
        setMessage({ type: 'error', text: 'Upload gagal: ' + result.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error: ' + err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content || !formData.category) {
      setMessage({ type: 'error', text: 'Semua field harus diisi' });
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `${API_URL}/news/${editingId}`
        : `${API_URL}/news`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: editingId ? 'Berita berhasil diupdate' : 'Berita berhasil dibuat' 
        });
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          category: 'product',
          image: '',
          status: 'published',
          source: 'PT. Globalindo Intimates',
          sourceUrl: ''
        });
        setEditingId(null);
        setShowForm(false);
        fetchNews();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Gagal simpan berita' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error: ' + err.message });
    }
  };

  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      content: news.content,
      excerpt: news.excerpt,
      category: news.category,
      image: news.image,
      status: news.status,
      source: news.source,
      sourceUrl: news.sourceUrl
    });
    setEditingId(news._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus berita ini?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Berita berhasil dihapus' });
        fetchNews();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Gagal hapus berita' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error: ' + err.message });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'product',
      image: '',
      status: 'published'
    });
  };

  // Filter berita
  let filteredNews = newsList.filter(news => {
    const matchSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       news.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || news.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-600/20 text-green-300 border border-green-600/50';
      case 'draft':
        return 'bg-yellow-600/20 text-yellow-300 border border-yellow-600/50';
      case 'archived':
        return 'bg-gray-600/20 text-gray-300 border border-gray-600/50';
      default:
        return 'bg-gray-600/20 text-gray-300 border border-gray-600/50';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      product: 'bg-blue-600/20 text-blue-300 border border-blue-600/50',
      company: 'bg-purple-600/20 text-purple-300 border border-purple-600/50',
      industry: 'bg-cyan-600/20 text-cyan-300 border border-cyan-600/50',
      event: 'bg-pink-600/20 text-pink-300 border border-pink-600/50',
      other: 'bg-gray-600/20 text-gray-300 border border-gray-600/50'
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 backdrop-blur-lg border-2 animate-fade-in ${
          message.type === 'success' 
            ? 'bg-green-600/20 border-green-600/50 text-green-300'
            : 'bg-red-600/20 border-red-600/50 text-red-300'
        }`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">📰 News Management</h1>
          <p className="text-gray-500 text-sm mt-2">Kelola berita dan artikel perusahaan</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) handleCancel();
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:shadow-lg hover:shadow-orange-500/50 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          <Plus size={22} />
          Tambah Berita
        </button>
      </div>

      {/* Form Add/Edit */}
      {showForm && (
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-800/50 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">
            {editingId ? '✏️ Edit Berita' : '➕ Tambah Berita Baru'}
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Judul berita..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Isi berita..."
                rows="5"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Excerpt</label>
                <input
                  type="text"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Ringkasan singkat..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                >
                  <option value="product">Product</option>
                  <option value="company">Company</option>
                  <option value="industry">Industry</option>
                  <option value="event">Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="border-2 border-dashed border-orange-500/50 rounded-xl p-4 hover:border-orange-500 transition-all duration-300 bg-orange-500/5 hover:bg-orange-500/10">
              <label className="block text-sm font-semibold text-gray-300 mb-3">📸 Foto Berita</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="newsImage"
                />
                <label
                  htmlFor="newsImage"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/50 text-white rounded-lg cursor-pointer font-semibold transition-all duration-300"
                >
                  <Upload size={18} />
                  {uploadingImage ? 'Uploading...' : 'Upload Foto'}
                </label>
                {formData.image && (
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 truncate">{formData.image}</p>
                    <img
                      src={`http://localhost:5000/${formData.image}`}
                      alt="preview"
                      className="mt-2 h-20 object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23374151%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Source & Reference Link */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Source (Media/Sumber)</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="e.g., PT. Globalindo Intimates"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Reference Link</label>
                <input
                  type="text"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/news"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-700/50">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:shadow-lg hover:shadow-green-500/50 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <Save size={18} />
                {editingId ? 'Update' : 'Buat'} Berita
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Cari berita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 backdrop-blur-lg border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-3.5 text-gray-500 pointer-events-none" size={20} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-12 pr-4 py-3 bg-gray-900/50 backdrop-blur-lg border border-gray-800/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
          >
            <option value="all" className="bg-gray-800">Semua Status</option>
            <option value="draft" className="bg-gray-800">Draft</option>
            <option value="published" className="bg-gray-800">Published</option>
            <option value="archived" className="bg-gray-800">Archived</option>
          </select>
        </div>
      </div>

      {/* News List */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">⏳ Loading...</div>
      ) : filteredNews.length === 0 ? (
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800/50 p-12 text-center text-gray-400">
          📦 Tidak ada berita
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNews.map(news => (
            <div key={news._id} className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-6 hover:border-orange-500/60 transition-all duration-300 shadow-lg hover:shadow-orange-500/20">
              <div className="flex justify-between items-start gap-4">
                {/* Thumbnail */}
                {news.image && (
                  <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={`http://localhost:5000/${news.image}`}
                      alt={news.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23374151%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{news.content}</p>
                  
                  <div className="flex gap-2 flex-wrap">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(news.category)}`}>
                      📁 {news.category}
                    </span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(news.status)}`}>
                      {news.status === 'published' ? '✅' : news.status === 'draft' ? '📝' : '🗂️'} {news.status}
                    </span>
                    {news.views && (
                      <span className="px-3 py-1.5 bg-purple-600/20 text-purple-300 border border-purple-600/50 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Eye size={14} /> {news.views} views
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(news)}
                    className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 border border-blue-600/50 rounded-lg transition-all duration-300"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(news._id)}
                    className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 border border-red-600/50 rounded-lg transition-all duration-300"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        select option {
          background: #1f2937;
          color: #f3f4f6;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}