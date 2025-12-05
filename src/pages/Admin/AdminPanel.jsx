import { useState, useEffect, useCallback } from 'react';
import { LogOut, LayoutDashboard, Package, Mail, FileText, Menu, ChevronRight } from 'lucide-react';
import ProductPanel from './ProductPanel';
import InquiriesPanel from './InquiriesPanel';
import NewsPanel from './NewsPanel';

const API_URL = 'http://localhost:5000/api';

export default function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [news, setNews] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
    { id: 'news', label: 'News', icon: FileText }
  ];

  const getToken = () => localStorage.getItem('adminToken');

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      const productsList = data.data || data.products || data || [];
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  // Fetch inquiries
  const fetchInquiries = useCallback(async () => {
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
      console.error('Error fetching inquiries:', error);
    }
  }, []);

  // Fetch news
  const fetchNews = useCallback(async () => {
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
      console.error('Error fetching news:', error);
    }
  }, []);

  // Step 1: Initialize - Set tab dari URL saat pertama kali load
  useEffect(() => {
    const path = window.location.pathname;
    const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
    
    let tab = 'dashboard';
    if (normalizedPath === '/admin/products') tab = 'products';
    else if (normalizedPath === '/admin/inquiries') tab = 'inquiries';
    else if (normalizedPath === '/admin/news') tab = 'news';
    
    setActiveTab(tab);
    setIsInitialized(true);
  }, []);

  // Step 2: Fetch all data once on mount
  useEffect(() => {
    if (isInitialized) {
      fetchProducts();
      fetchInquiries();
      fetchNews();
    }
  }, [isInitialized, fetchProducts, fetchInquiries, fetchNews]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const newPath = window.location.pathname;
      const newNormalizedPath = newPath.endsWith('/') && newPath !== '/' ? newPath.slice(0, -1) : newPath;
      
      let newTab = 'dashboard';
      if (newNormalizedPath === '/admin/products') newTab = 'products';
      else if (newNormalizedPath === '/admin/inquiries') newTab = 'inquiries';
      else if (newNormalizedPath === '/admin/news') newTab = 'news';
      
      setActiveTab(newTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const newUrl = tabId === 'dashboard' ? '/admin' : `/admin/${tabId}`;
    window.history.pushState({}, '', newUrl);
  };

  if (!isInitialized) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 fixed h-screen flex flex-col z-50`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                G
              </div>
              <div>
                <p className="font-bold text-gray-900">Globalindo</p>
                <p className="text-xs text-gray-600">Admin</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-gray-900">
            <Menu size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              {sidebarOpen && activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 overflow-auto bg-gray-50`}>
        {/* TOP BAR */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-gray-600 text-sm mt-1">Manage your store efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">A</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <Package size={32} className="mb-4 text-blue-600" />
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{products.length}</p>
                <p className="text-gray-500 text-xs mt-3">Ready to sell</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <FileText size={32} className="mb-4 text-green-600" />
                <p className="text-gray-600 text-sm font-medium">Total News</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{news.length}</p>
                <p className="text-gray-500 text-xs mt-3">Published articles</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <Mail size={32} className="mb-4 text-purple-600" />
                <p className="text-gray-600 text-sm font-medium">Inquiries</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{inquiries.length}</p>
                <p className="text-gray-500 text-xs mt-3">Customer messages</p>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === 'products' && (
            <ProductPanel 
              products={products} 
              setProducts={setProducts}
              onProductsChange={fetchProducts}
            />
          )}

          {/* INQUIRIES */}
          {activeTab === 'inquiries' && (
            <InquiriesPanel 
              inquiries={inquiries}
              setInquiries={setInquiries}
              onInquiriesChange={fetchInquiries}
            />
          )}

          {/* NEWS */}
          {activeTab === 'news' && (
            <NewsPanel 
              news={news}
              setNews={setNews}
              onNewsChange={fetchNews}
            />
          )}
        </div>
      </div>
    </div>
  );
}