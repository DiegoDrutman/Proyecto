import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid } from '@mui/material';
import { getBusinessProducts, addProduct, updateProduct, deleteProduct } from '../../services/api';

const ProductList = ({ businessId }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    console.log('Business ID:', businessId);  // Verifica que no sea null
    const fetchProducts = async () => {
      if (businessId) {
        const data = await getBusinessProducts(businessId);
        setProducts(data);
      }
    };
    fetchProducts();
  }, [businessId]);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) return; // Validación básica
    console.log('Business ID:', businessId); // Verifica que el businessId se pasa correctamente
    await addProduct(businessId, newProduct);
    setNewProduct({ name: '', price: '' }); // Resetea los campos
    const data = await getBusinessProducts(businessId);
    setProducts(data);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price }); // Pre-llena el formulario
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct.name || !editingProduct.price) return; // Validación básica
    await updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
    setNewProduct({ name: '', price: '' }); // Resetea los campos
    const data = await getBusinessProducts(businessId);
    setProducts(data);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    const data = await getBusinessProducts(businessId);
    setProducts(data);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Products</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>${product.price}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleEditProduct(product)} sx={{ marginTop: 1 }}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(product.id)} sx={{ marginTop: 1 }}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <TextField
          label="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          disabled={editingProduct}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          disabled={editingProduct}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button 
          onClick={handleAddProduct} 
          disabled={editingProduct}
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
        >
          Add Product
        </Button>
      </div>
      {editingProduct && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Edit Product</Typography>
          <TextField
            label="Product Name"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button onClick={handleUpdateProduct} variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Update Product
          </Button>
          <Button onClick={() => setEditingProduct(null)} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
