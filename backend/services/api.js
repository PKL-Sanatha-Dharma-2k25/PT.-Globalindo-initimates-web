const API_URL = 'http://localhost:5000/api';

export const productAPI = {
  getAll: async (category = 'All') => {
    try {
      const url = category === 'All' 
        ? `${API_URL}/products` 
        : `${API_URL}/products?category=${category}`;
      const res = await fetch(url);
      return res.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, data: [] };
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return { success: false };
    }
  }
};

export const inquiryAPI = {
  send: async (data) => {
    try {
      const res = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    } catch (error) {
      console.error('Error sending inquiry:', error);
      return { success: false };
    }
  }
};

export const newsAPI = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/news`);
      return res.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      return { success: false, data: [] };
    }
  },

  getBySlug: async (slug) => {
    try {
      const res = await fetch(`${API_URL}/news/${slug}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      return { success: false };
    }
  }
};