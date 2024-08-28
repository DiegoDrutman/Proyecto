import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Alert } from '@mui/material';
import { getBusinessProducts, addProduct, updateProduct, deleteProduct } from '../../services/api';

const ProductList = ({ businessId }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      if (businessId) {
        try {
          const data = await getBusinessProducts(businessId);
          setProducts(data);
        } catch (error) {
          setMessage({ type: 'error', text: 'Error al cargar los productos' });
        }
      }
    };
    fetchProducts();
  }, [businessId]);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      setMessage({ type: 'error', text: 'Por favor, completa todos los campos' });
      return;
    }
    try {
      await addProduct(businessId, newProduct);
      setNewProduct({ name: '', price: '' });
      const data = await getBusinessProducts(businessId);
      setProducts(data);
      setMessage({ type: 'success', text: 'Producto agregado con éxito' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al agregar el producto' });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price });
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct.name || !editingProduct.price) {
      setMessage({ type: 'error', text: 'Por favor, completa todos los campos' });
      return;
    }
    try {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      setNewProduct({ name: '', price: '' });
      const data = await getBusinessProducts(businessId);
      setProducts(data);
      setMessage({ type: 'success', text: 'Producto actualizado con éxito' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el producto' });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      const data = await getBusinessProducts(businessId);
      setProducts(data);
      setMessage({ type: 'success', text: 'Producto eliminado con éxito' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar el producto' });
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Productos</Typography>
      {message.text && <Alert severity={message.type} onClose={() => setMessage({ type: '', text: '' })}>{message.text}</Alert>}
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>${product.price}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleEditProduct(product)} sx={{ marginTop: 1 }}>
                  Editar
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(product.id)} sx={{ marginTop: 1 }}>
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <TextField
          label="Nombre del Producto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          disabled={editingProduct !== null}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Precio"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          disabled={editingProduct !== null}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button 
          onClick={handleAddProduct} 
          disabled={editingProduct !== null}
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
        >
          Agregar Producto
        </Button>
      </div>
      {editingProduct && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Editar Producto</Typography>
          <TextField
            label="Nombre del Producto"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Precio"
            type="number"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button onClick={handleUpdateProduct} variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Actualizar Producto
          </Button>
          <Button onClick={() => setEditingProduct(null)} variant="contained" color="secondary">
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
