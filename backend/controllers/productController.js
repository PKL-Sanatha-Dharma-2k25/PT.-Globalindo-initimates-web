import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    console.log('📦 GET /api/products');
    
    const { category } = req.query;
    let filter = {};
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    console.log('🔍 Filter:', filter);
    
    const products = await Product.find(filter);
    console.log('✅ Found products:', products.length);
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    console.log('📦 GET /api/products/:id -', req.params.id);
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      console.log('❌ Product not found');
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }
    
    console.log('✅ Product found:', product.name);
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('❌ Error fetching product:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log('📝 POST /api/products');
    console.log('👤 User:', req.admin);
    console.log('📦 Body received:', JSON.stringify(req.body, null, 2));

    // Validasi field wajib
    const { name, category, image, mainImage, descriptionShort, descriptionLong } = req.body;
    
    if (!name || name.trim() === '') {
      console.log('❌ Validation error: name is required');
      return res.status(400).json({ 
        success: false, 
        error: 'Product name is required' 
      });
    }
    
    if (!category || category.trim() === '') {
      console.log('❌ Validation error: category is required');
      return res.status(400).json({ 
        success: false, 
        error: 'Category is required' 
      });
    }

    if (!image || image.trim() === '') {
      console.log('❌ Validation error: image is required');
      return res.status(400).json({ 
        success: false, 
        error: 'Product image is required' 
      });
    }

    if (!mainImage || mainImage.trim() === '') {
      console.log('❌ Validation error: mainImage is required');
      return res.status(400).json({ 
        success: false, 
        error: 'Main image is required' 
      });
    }

    if (!descriptionShort || descriptionShort.trim() === '') {
      console.log('❌ Validation error: descriptionShort is required');
      return res.status(400).json({ 
        success: false, 
        error: 'Short description is required' 
      });
    }

    if (!descriptionLong || descriptionLong.trim() === '') {
      console.log('❌ Validation error: descriptionLong is required');
      return res.status(400).json({ 
        success: false, 
        error: 'Long description is required' 
      });
    }
    
    console.log('✅ Validation passed');

    // Buat product baru
    const product = new Product(req.body);
    console.log('🔧 Product instance created');

    // Simpan ke database
    const savedProduct = await product.save();
    console.log('✅ Product saved to database:', savedProduct._id);
    
    res.status(201).json({
      success: true,
      message: 'Product created',
      data: savedProduct
    });
  } catch (error) {
    console.error('❌ Error creating product:', error.name, error.message);
    console.error('❌ Full error:', error);
    
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    console.log('📝 PUT /api/products/:id -', req.params.id);
    console.log('📦 Body:', req.body);
    
    // Validasi field wajib
    const { name, category } = req.body;
    
    if (name && name.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        error: 'Product name cannot be empty' 
      });
    }
    
    if (category && category.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        error: 'Category cannot be empty' 
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    console.log('✅ Product updated:', product._id);
    
    res.json({
      success: true,
      message: 'Product updated',
      data: product
    });
  } catch (error) {
    console.error('❌ Error updating product:', error.message);
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    console.log('🗑️ DELETE /api/products/:id -', req.params.id);
    
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    console.log('✅ Product deleted:', deletedProduct._id);
    
    res.json({
      success: true,
      message: 'Product deleted'
    });
  } catch (error) {
    console.error('❌ Error deleting product:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};