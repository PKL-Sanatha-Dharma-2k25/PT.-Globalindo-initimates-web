import React, { useState } from 'react';
import { Trash2, Mail, Phone, User, Calendar, MessageSquare, Search, Filter } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function InquiriesPanel({ inquiries = [], setInquiries, onInquiriesChange }) {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
        onInquiriesChange?.();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filtered = inquiries.filter(inq => {
    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchSearch = inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       inq.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'read':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'replied':
        return 'bg-green-100 text-green-800 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

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
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Pending</p>
              <p className="text-4xl font-bold text-gray-900">
                {inquiries.filter(i => i.status === 'pending').length}
              </p>
            </div>
            <MessageSquare size={32} className="text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Read</p>
              <p className="text-4xl font-bold text-gray-900">
                {inquiries.filter(i => i.status === 'read').length}
              </p>
            </div>
            <Mail size={32} className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Replied</p>
              <p className="text-4xl font-bold text-gray-900">
                {inquiries.filter(i => i.status === 'replied').length}
              </p>
            </div>
            <Phone size={32} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-3 text-gray-500" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2 space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200 flex flex-col items-center justify-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No inquiries found</p>
            </div>
          ) : (
            filtered.map(inquiry => (
              <div
                key={inquiry._id}
                onClick={() => setSelectedInquiry(inquiry)}
                className={`rounded-lg p-6 border cursor-pointer ${
                  selectedInquiry?._id === inquiry._id
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{inquiry.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{inquiry.subject}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-600" />
                    {inquiry.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-600" />
                    {inquiry.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar size={14} />
                    {formatDate(inquiry.createdAt)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Inquiry Detail */}
        {selectedInquiry ? (
          <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-6 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detail Inquiry</h3>

            {/* Info */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <label className="text-gray-600 text-xs uppercase font-semibold block mb-2">Name</label>
                <p className="text-gray-900 font-semibold flex items-center gap-2">
                  <User size={16} className="text-blue-600" />
                  {selectedInquiry.name}
                </p>
              </div>

              <div>
                <label className="text-gray-600 text-xs uppercase font-semibold block mb-2">Email</label>
                <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                  <Mail size={16} />
                  {selectedInquiry.email}
                </a>
              </div>

              <div>
                <label className="text-gray-600 text-xs uppercase font-semibold block mb-2">Phone</label>
                <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                  <Phone size={16} />
                  {selectedInquiry.phone}
                </a>
              </div>

              <div>
                <label className="text-gray-600 text-xs uppercase font-semibold block mb-2">Subject</label>
                <p className="text-gray-700">{selectedInquiry.subject}</p>
              </div>

              <div>
                <label className="text-gray-600 text-xs uppercase font-semibold block mb-2">Date</label>
                <p className="text-gray-600 text-sm">{formatDate(selectedInquiry.createdAt)}</p>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <label className="text-gray-600 text-xs uppercase font-semibold block mb-3">Message</label>
              <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-200">{selectedInquiry.message}</p>
            </div>

            {/* Status Buttons */}
            <div className="space-y-2 mb-6">
              <button
                onClick={() => updateStatus(selectedInquiry._id, 'pending')}
                className={`w-full px-4 py-2 rounded-lg font-medium ${
                  selectedInquiry.status === 'pending'
                    ? 'bg-yellow-200 text-yellow-800 border border-yellow-300'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
                }`}
              >
                Mark as Pending
              </button>
              <button
                onClick={() => updateStatus(selectedInquiry._id, 'read')}
                className={`w-full px-4 py-2 rounded-lg font-medium ${
                  selectedInquiry.status === 'read'
                    ? 'bg-blue-200 text-blue-800 border border-blue-300'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateStatus(selectedInquiry._id, 'replied')}
                className={`w-full px-4 py-2 rounded-lg font-medium ${
                  selectedInquiry.status === 'replied'
                    ? 'bg-green-200 text-green-800 border border-green-300'
                    : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                }`}
              >
                Mark as Replied
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteInquiry(selectedInquiry._id)}
              className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 border border-red-200 font-medium flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Delete Inquiry
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 border border-gray-200 flex flex-col items-center justify-center h-96">
            <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500">Select an inquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}