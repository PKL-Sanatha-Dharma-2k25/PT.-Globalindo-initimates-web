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
    // eslint-disable-next-line no-unused-vars
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

  let filteredNews = newsList.filter(news => {
    const matchSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       news.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || news.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      product: 'bg-blue-100 text-blue-800 border border-blue-300',
      company: 'bg-purple-100 text-purple-800 border border-purple-300',
      industry: 'bg-cyan-100 text-cyan-800 border border-cyan-300',
      event: 'bg-pink-100 text-pink-800 border border-pink-300',
      other: 'bg-gray-100 text-gray-800 border border-gray-300'
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="space-y-6">
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
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 text-sm mt-2">Kelola berita dan artikel perusahaan</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) handleCancel();
          }}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          <Plus size={20} />
          Tambah Berita
        </button>
      </div>

      {/* Form Add/Edit */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {editingId ? 'Edit Berita' : 'Tambah Berita Baru'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Judul berita..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Isi berita..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <input
                  type="text"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Ringkasan singkat..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-3">Foto Berita</label>
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
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer font-medium"
                >
                  <Upload size={18} />
                  {uploadingImage ? 'Uploading...' : 'Upload Foto'}
                </label>
                {formData.image && (
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 truncate">{formData.image}</p>
                    <img
                      src={`http://localhost:5000/${formData.image}`}
                      alt="preview"
                      className="mt-2 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="e.g., PT. Globalindo Intimates"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reference Link</label>
                <input
                  type="text"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/news"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
              >
                <Save size={18} />
                {editingId ? 'Update' : 'Buat'} Berita
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg font-medium"
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
          <Search className="absolute left-4 top-2.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Cari berita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-2.5 text-gray-500 pointer-events-none" size={20} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-12 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* News List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : filteredNews.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
          Tidak ada berita
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNews.map(news => (
            <div key={news._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300">
              <div className="flex justify-between items-start gap-4">
                {/* Thumbnail */}
                {news.image && (
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={`http://localhost:5000/${news.image}`}
                      alt={news.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{news.content}</p>
                  
                  <div className="flex gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(news.category)}`}>
                      {news.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(news.status)}`}>
                      {news.status}
                    </span>
                    {news.views && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 border border-purple-300 rounded-full text-xs font-medium flex items-center gap-1">
                        <Eye size={14} /> {news.views}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(news)}
                    className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(news._id)}
                    className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg"
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
    </div>
  );
}