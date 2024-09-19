import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Alert } from '@mui/material';
import { getBusinessProducts, addProduct, updateProduct, deleteProduct } from '../../services/api';

const ProductList = ({ businessId }) => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isProcessing, setIsProcessing] = useState(false);

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
    if (!productForm.name || !productForm.price) {
      setMessage({ type: 'error', text: 'Por favor, completa todos los campos' });
      return;
    }

    setIsProcessing(true);
    try {
      await addProduct(businessId, productForm);
      setProductForm({ name: '', price: '' });
      const data = await getBusinessProducts(businessId);
      setProducts(data);
      setMessage({ type: 'success', text: 'Producto agregado con éxito' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al agregar el producto' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({ name: product.name, price: product.price });
  };

  const handleUpdateProduct = async () => {
    if (!productForm.name || !productForm.price) {
      setMessage({ type: 'error', text: 'Por favor, completa todos los campos' });
      return;
    }

    setIsProcessing(true);
    try {
      await updateProduct(editingProduct.id, productForm);
      setEditingProduct(null);
      setProductForm({ name: '', price: '' });
      const data = await getBusinessProducts(businessId);
      setProducts(data);
      setMessage({ type: 'success', text: 'Producto actualizado con éxito' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el producto' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    setIsProcessing(true);
    try {
      await deleteProduct(id);
      const data = await getBusinessProducts(businessId);
      setProducts(data);
      setMessage({ type: 'success', text: 'Producto eliminado con éxito' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar el producto' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setProductForm({ name: '', price: '' });
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
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
        </Typography>
        <TextField
          label="Nombre del Producto"
          value={productForm.name}
          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Precio"
          type="number"
          value={productForm.price}
          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {editingProduct ? (
          <>
            <Button onClick={handleUpdateProduct} variant="contained" color="primary" disabled={isProcessing} sx={{ marginRight: 2 }}>
              Actualizar Producto
            </Button>
            <Button onClick={handleCancelEdit} variant="contained" color="secondary" disabled={isProcessing}>
              Cancelar
            </Button>
          </>
        ) : (
          <Button 
            onClick={handleAddProduct} 
            variant="contained" 
            color="primary" 
            disabled={isProcessing} 
            sx={{ marginBottom: 2 }}
          >
            Agregar Producto
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
