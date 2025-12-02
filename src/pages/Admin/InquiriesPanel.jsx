import React, { useState, useEffect } from 'react';
import { Trash2, Mail, Phone, User, Calendar, MessageSquare, Search, Filter } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function InquiriesPanel({ onLogout }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch inquiries
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/inquiries`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setInquiries(data.data);
      } else {
        console.error('Error:', data.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();

      if (data.success) {
        setInquiries(inquiries.map(inq =>
          inq._id === id ? { ...inq, status: newStatus } : inq
        ));
        if (selectedInquiry?._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  // Delete inquiry
  const deleteInquiry = async (id) => {
    if (!confirm('Yakin ingin hapus inquiry ini?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setInquiries(inquiries.filter(inq => inq._id !== id));
        setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Filter & search
  const filtered = inquiries.filter(inq => {
    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchSearch = inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       inq.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-300 border border-yellow-700/50';
      case 'read':
        return 'bg-blue-900/30 text-blue-300 border border-blue-700/50';
      case 'replied':
        return 'bg-green-900/30 text-green-300 border border-green-700/50';
      default:
        return 'bg-gray-700/30 text-gray-300 border border-gray-600/50';
    }
  };

  // Status badge dark colors for detail panel
  const getStatusBgDark = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-400 border border-yellow-700/50 hover:bg-yellow-600/30';
      case 'read':
        return 'bg-blue-600/20 text-blue-400 border border-blue-700/50 hover:bg-blue-600/30';
      case 'replied':
        return 'bg-green-600/20 text-green-400 border border-green-700/50 hover:bg-green-600/30';
      default:
        return 'bg-gray-600/20 text-gray-400 border border-gray-700/50 hover:bg-gray-600/30';
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/10 border border-yellow-700/30 rounded-2xl p-6 backdrop-blur-lg hover:border-yellow-600/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 text-sm font-medium mb-2">Pending</p>
              <p className="text-4xl font-bold text-yellow-400">
                {inquiries.filter(i => i.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-600/30 rounded-lg flex items-center justify-center">
              <MessageSquare size={24} className="text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-700/30 rounded-2xl p-6 backdrop-blur-lg hover:border-blue-600/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium mb-2">Read</p>
              <p className="text-4xl font-bold text-blue-400">
                {inquiries.filter(i => i.status === 'read').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
              <Mail size={24} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-700/10 border border-green-700/30 rounded-2xl p-6 backdrop-blur-lg hover:border-green-600/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium mb-2">Replied</p>
              <p className="text-4xl font-bold text-green-400">
                {inquiries.filter(i => i.status === 'replied').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-600/30 rounded-lg flex items-center justify-center">
              <Phone size={24} className="text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800/50 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 text-gray-100 rounded-xl border border-gray-700/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 placeholder-gray-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 text-gray-100 rounded-xl border border-gray-700/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 appearance-none"
            >
              <option value="all" className="bg-gray-800">All Status</option>
              <option value="pending" className="bg-gray-800">Pending</option>
              <option value="read" className="bg-gray-800">Read</option>
              <option value="replied" className="bg-gray-800">Replied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-12 text-center text-gray-400 border border-gray-800/50 shadow-lg">
              ⏳ Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-12 text-center border border-gray-800/50 shadow-lg flex flex-col items-center justify-center">
              <MessageSquare className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-400">No inquiries found</p>
            </div>
          ) : (
            filtered.map(inquiry => (
              <div
                key={inquiry._id}
                onClick={() => setSelectedInquiry(inquiry)}
                className={`rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 backdrop-blur-lg shadow-lg hover:shadow-xl ${
                  selectedInquiry?._id === inquiry._id
                    ? 'bg-gradient-to-br from-orange-600/20 to-orange-700/10 border-orange-500/60 shadow-orange-500/20'
                    : 'bg-gray-900/50 border-gray-800/50 hover:border-gray-700/80 hover:bg-gray-900/70'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{inquiry.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{inquiry.subject}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2 hover:text-gray-300 transition">
                    <Mail size={16} className="text-orange-400" />
                    {inquiry.email}
                  </div>
                  <div className="flex items-center gap-2 hover:text-gray-300 transition">
                    <Phone size={16} className="text-orange-400" />
                    {inquiry.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar size={14} className="text-orange-400/60" />
                    {formatDate(inquiry.createdAt)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Inquiry Detail */}
        {selectedInquiry ? (
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-800/50 shadow-lg sticky top-6 h-fit">
            <h3 className="text-xl font-bold text-white mb-6">Detail Inquiry</h3>

            {/* Info */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-700/50">
              <div>
                <label className="text-gray-500 text-xs uppercase font-semibold block mb-2">Name</label>
                <p className="text-white font-semibold flex items-center gap-2">
                  <User size={16} className="text-orange-400" />
                  {selectedInquiry.name}
                </p>
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase font-semibold block mb-2">Email</label>
                <a href={`mailto:${selectedInquiry.email}`} className="text-orange-400 hover:text-orange-300 flex items-center gap-2 transition-colors duration-300">
                  <Mail size={16} />
                  {selectedInquiry.email}
                </a>
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase font-semibold block mb-2">Phone</label>
                <a href={`tel:${selectedInquiry.phone}`} className="text-orange-400 hover:text-orange-300 flex items-center gap-2 transition-colors duration-300">
                  <Phone size={16} />
                  {selectedInquiry.phone}
                </a>
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase font-semibold block mb-2">Subject</label>
                <p className="text-gray-300">{selectedInquiry.subject}</p>
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase font-semibold block mb-2">Date</label>
                <p className="text-gray-400 text-sm">{formatDate(selectedInquiry.createdAt)}</p>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6 pb-6 border-b border-gray-700/50">
              <label className="text-gray-500 text-xs uppercase font-semibold block mb-3">Message</label>
              <p className="text-gray-300 text-sm leading-relaxed bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">{selectedInquiry.message}</p>
            </div>

            {/* Status Buttons */}
            <div className="space-y-2 mb-6">
              <button
                onClick={() => updateStatus(selectedInquiry._id, 'pending')}
                className={`w-full px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  selectedInquiry.status === 'pending'
                    ? 'bg-yellow-600/40 text-yellow-300 border border-yellow-600/60 shadow-lg shadow-yellow-600/20'
                    : 'bg-yellow-600/10 text-yellow-400 border border-yellow-600/30 hover:bg-yellow-600/20'
                }`}
              >
                Mark as Pending
              </button>
              <button
                onClick={() => updateStatus(selectedInquiry._id, 'read')}
                className={`w-full px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  selectedInquiry.status === 'read'
                    ? 'bg-blue-600/40 text-blue-300 border border-blue-600/60 shadow-lg shadow-blue-600/20'
                    : 'bg-blue-600/10 text-blue-400 border border-blue-600/30 hover:bg-blue-600/20'
                }`}
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateStatus(selectedInquiry._id, 'replied')}
                className={`w-full px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  selectedInquiry.status === 'replied'
                    ? 'bg-green-600/40 text-green-300 border border-green-600/60 shadow-lg shadow-green-600/20'
                    : 'bg-green-600/10 text-green-400 border border-green-600/30 hover:bg-green-600/20'
                }`}
              >
                Mark as Replied
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteInquiry(selectedInquiry._id)}
              className="w-full px-4 py-2.5 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600/40 border border-red-600/40 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-red-600/20"
            >
              <Trash2 size={18} />
              Delete Inquiry
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-800/50 shadow-lg flex flex-col items-center justify-center h-96">
            <MessageSquare className="w-12 h-12 text-gray-600 mb-4" />
            <p className="text-gray-500">Select an inquiry to view details</p>
          </div>
        )}
      </div>

      <style>{`
        select option {
          background: #1f2937;
          color: #f3f4f6;
        }
      `}</style>
    </div>
  );
}