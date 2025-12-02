import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Upload, LogOut, LayoutDashboard, Package, Mail, FileText, Menu, ChevronRight, Home } from 'lucide-react';
import InquiriesPanel from './InquiriesPanel';
import NewsPanel from './NewsPanel';

const API_URL = 'http://localhost:5000/api';

export default function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    mainImage: '',
    descriptionShort: '',
    descriptionLong: '',
    variantImages: '',
    features: '',
    layersProtection: ''
  });

  const categories = [
    "Period Panty", "Ladies Underwear", "Ladies Bra", "Ladies Apeweo",
    "Sport Weo", "Man's Underwear", "Swimwear", "Innerware", "Hoodie", "Kids Wear"
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
    { id: 'news', label: 'News', icon: FileText }
  ];

  const getToken = () => localStorage.getItem('adminToken');

  // Fetch semua data saat component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch data ketika tab berubah
  useEffect(() => {
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'inquiries') fetchInquiries();
    if (activeTab === 'news') fetchNews();
  }, [activeTab]);

  // Fetch all data untuk dashboard
  const fetchAllData = async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoading(true);
      
      // Fetch products
      const productsRes = await fetch(`${API_URL}/products`);
      const productsData = await productsRes.json();
      const productsList = productsData.data || productsData.products || productsData || [];
      setProducts(productsList);

      // Fetch inquiries
      const inquiriesRes = await fetch(`${API_URL}/inquiries`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const inquiriesData = await inquiriesRes.json();
      if (inquiriesData.success) {
        setInquiries(inquiriesData.data || []);
      }

      // Fetch news
      const newsRes = await fetch(`${API_URL}/news`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const newsData = await newsRes.json();
      if (newsData.success) {
        setNews(newsData.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
    }
    setLoading(false);
  };

  const fetchInquiries = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/inquiries`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/news`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setNews(data.data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(fieldName);
    const formDataToSend = new FormData();
    formDataToSend.append('file', file);
    try {
      const res = await fetch(`${API_URL}/upload/product`, {
        method: 'POST',
        body: formDataToSend
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, [fieldName]: result.filePath }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name?.trim() || !formData.category?.trim() || !formData.image?.trim() || 
        !formData.mainImage?.trim() || !formData.descriptionShort?.trim() || !formData.descriptionLong?.trim()) {
      alert('⚠️ Please fill all required fields!');
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        alert('❌ Not authenticated!');
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
        variantImages: formData.variantImages.split(',').map(v => v.trim()).filter(v => v),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        layersProtection: formData.layersProtection.split(',').map(l => l.trim()).filter(l => l)
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.success) {
        alert(editingId ? '✅ Product updated!' : '✅ Product created!');
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', category: '', image: '', mainImage: '', descriptionShort: '', descriptionLong: '', variantImages: '', features: '', layersProtection: '' });
        fetchAllData();
      }
    } catch (error) {
      console.error('Error:', error);
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
      variantImages: (product.variantImages || []).join(', '),
      features: (product.features || []).join(', '),
      layersProtection: (product.layersProtection || []).join(', ')
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
          alert('✅ Deleted!');
          fetchAllData();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const ImageUploadField = ({ fieldName, label }) => (
    <div className="border-2 border-dashed border-orange-500/50 rounded-xl p-4 hover:border-orange-500 transition bg-orange-500/5">
      <label className="block text-sm font-semibold text-gray-300 mb-3">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, fieldName)}
          disabled={uploadingImage === fieldName}
          className="hidden"
          id={fieldName}
        />
        <label htmlFor={fieldName} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg cursor-pointer hover:shadow-lg hover:shadow-orange-500/50 transition">
          <Upload size={18} />
          {uploadingImage === fieldName ? 'Uploading...' : 'Choose Image'}
        </label>
        {formData[fieldName] && (
          <div className="flex-1">
            <p className="text-sm text-gray-400 truncate">{formData[fieldName]}</p>
            <img src={`http://localhost:5000/${formData[fieldName]}`} alt="preview" className="mt-2 h-20 w-20 object-cover rounded-lg shadow-lg" onError={(e) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23374151' width='100' height='100'/%3E%3C/svg%3E"; }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-black border-r border-orange-900/30 transition-all duration-300 fixed h-screen flex flex-col shadow-2xl`}>
        {/* Logo */}
        <div className="p-6 border-b border-orange-900/30 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold">
                G
              </div>
              <div>
                <p className="font-bold text-white">Globalindo</p>
                <p className="text-xs text-orange-400">Admin</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-orange-400 hover:text-orange-300 transition">
            <Menu size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/50'
                  : 'text-gray-400 hover:text-orange-400 hover:bg-gray-800/50'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
              {sidebarOpen && activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-orange-900/30">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300 overflow-auto bg-gradient-to-br from-gray-950 via-black to-gray-950`}>
        {/* TOP BAR */}
        <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-orange-900/30 shadow-lg">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-gray-500 text-sm mt-1">Manage your store efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Admin User</p>
                <p className="text-xs text-orange-400">Active</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-8 text-white shadow-2xl border border-orange-500/50 hover:shadow-orange-500/50 transition">
                <Package size={40} className="mb-4 opacity-80" />
                <p className="text-orange-100 text-sm font-medium">Total Products</p>
                <p className="text-5xl font-bold mt-3">{products.length}</p>
                <p className="text-orange-200 text-xs mt-4">Ready to sell</p>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 text-white shadow-2xl border border-gray-600/50 hover:shadow-gray-600/50 transition">
                <FileText size={40} className="mb-4 opacity-80" />
                <p className="text-gray-300 text-sm font-medium">Total News</p>
                <p className="text-5xl font-bold mt-3">{news.length}</p>
                <p className="text-gray-400 text-xs mt-4">Published articles</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-2xl border border-orange-400/50 hover:shadow-orange-400/50 transition">
                <Mail size={40} className="mb-4 opacity-80" />
                <p className="text-orange-100 text-sm font-medium">Inquiries</p>
                <p className="text-5xl font-bold mt-3">{inquiries.length}</p>
                <p className="text-orange-200 text-xs mt-4">Customer messages</p>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === 'products' && (
            <>
              <div className="mb-8">
                <button
                  onClick={() => {
                    setShowForm(true);
                    setEditingId(null);
                    setFormData({ name: '', category: '', image: '', mainImage: '', descriptionShort: '', descriptionLong: '', variantImages: '', features: '', layersProtection: '' });
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:shadow-lg hover:shadow-orange-500/50 text-white px-8 py-3 rounded-lg transition font-semibold"
                >
                  <Plus size={22} />
                  Add New Product
                </button>
              </div>

              {/* FORM MODAL */}
              {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-900/30">
                    <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-orange-900/30 p-6 flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-white">
                        {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
                      </h2>
                      <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-orange-400 transition">
                        <X size={24} />
                      </button>
                    </div>

                    <div className="p-6 space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Product Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                            placeholder="Premium Period Panty"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                          >
                            <option value="">Select Category</option>
                            {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                          </select>
                        </div>
                      </div>

                      <ImageUploadField fieldName="image" label="Product Image *" />
                      <ImageUploadField fieldName="mainImage" label="Main Image *" />

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Short Description *</label>
                        <textarea
                          name="descriptionShort"
                          value={formData.descriptionShort}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                          placeholder="Brief product description..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Long Description *</label>
                        <textarea
                          name="descriptionLong"
                          value={formData.descriptionLong}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                          placeholder="Detailed product description..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Variant Images</label>
                        <input
                          type="text"
                          name="variantImages"
                          value={formData.variantImages}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                          placeholder="Comma-separated image paths..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Features</label>
                        <input
                          type="text"
                          name="features"
                          value={formData.features}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                          placeholder="Soft cotton, Super absorbent..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Layers Protection</label>
                        <input
                          type="text"
                          name="layersProtection"
                          value={formData.layersProtection}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                          placeholder="Cotton lining, Absorbent layer..."
                        />
                      </div>

                      <div className="flex gap-3 pt-6 border-t border-gray-700">
                        <button
                          onClick={handleSubmit}
                          className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition font-semibold"
                        >
                          {editingId ? '💾 Update' : '✨ Create'}
                        </button>
                        <button
                          onClick={() => setShowForm(false)}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCTS TABLE */}
              <div className="bg-gray-900/50 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
                {loading ? (
                  <div className="p-12 text-center text-gray-500">⏳ Loading...</div>
                ) : products.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">📦 No products yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400">Product Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400">Category</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400">Description</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400">Created</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-orange-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {products.map(product => (
                          <tr key={product._id} className="hover:bg-gray-800/50 transition">
                            <td className="px-6 py-4 text-sm font-medium text-white">{product.name}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-900/40 text-orange-300 border border-orange-700/50">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">{product.descriptionShort}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-center space-x-2">
                              <button onClick={() => handleEdit(product)} className="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
                                <Edit size={18} />
                              </button>
                              <button onClick={() => handleDelete(product._id)} className="inline-flex items-center text-red-400 hover:text-red-300 transition">
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
            </>
          )}

          {/* INQUIRIES & NEWS */}
          {activeTab === 'inquiries' && <InquiriesPanel />}
          {activeTab === 'news' && <NewsPanel />}
        </div>
      </div>
    </div>
  );
}