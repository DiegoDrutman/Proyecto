import React, { useState, useEffect } from 'react';
import { getBusinessDetails, updateBusiness, createProduct, updateProduct, deleteProduct } from '../../services/api';

const BusinessProfileForm = () => {
    const [business, setBusiness] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            const data = await getBusinessDetails();  // Asume que el negocio del usuario actual está disponible en el endpoint
            setBusiness(data);
            setProducts(data.products || []);
        };
        fetchBusinessDetails();
    }, []);

    const handleUpdateBusiness = async () => {
        await updateBusiness(business);
    };

    const handleCreateProduct = async (newProduct) => {
        const createdProduct = await createProduct(newProduct);
        setProducts([...products, createdProduct]);
    };

    const handleUpdateProduct = async (updatedProduct) => {
        await updateProduct(updatedProduct);
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const handleDeleteProduct = async (productId) => {
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
    };

    return (
        <div>
            <h1>Editar Negocio</h1>
            {business && (
                <div>
                    <input 
                        type="text" 
                        value={business.name} 
                        onChange={e => setBusiness({ ...business, name: e.target.value })} 
                    />
                    <button onClick={handleUpdateBusiness}>Guardar Cambios</button>
                </div>
            )}
            <h2>Productos</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                        <button onClick={() => handleUpdateProduct(product)}>Actualizar</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleCreateProduct({ name: 'Nuevo Producto', price: 0 })}>Agregar Producto</button>
        </div>
    );
};

export default BusinessProfileForm;
