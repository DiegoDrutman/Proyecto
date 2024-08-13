import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBusiness } from '../../services/api'; // Asegúrate de tener esta función en tus servicios API

const BusinessCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    operating_hours: '',
    image: null,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBusiness(formData);
      setMessage('Tu negocio ha sido creado y está pendiente de aprobación.');
      setTimeout(() => {
        navigate('/dashboard'); // O la ruta que desees
      }, 3000);
    } catch (err) {
      console.error('Error creating business:', err);
      setMessage('Hubo un error al crear el negocio. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Crear Negocio</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del negocio"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={formData.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="operating_hours"
          placeholder="Horario de operación"
          value={formData.operating_hours}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button type="submit">Crear Negocio</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BusinessCreate;
