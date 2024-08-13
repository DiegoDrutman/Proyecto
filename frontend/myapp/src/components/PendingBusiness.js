import React, { useEffect, useState } from 'react';
import { approveBusiness, getPendingBusinesses } from '../../services/api'; // Asume que estas funciones están en tu API
// Elimina esta línea si no necesitas usar `navigate`
// import { useNavigate } from 'react-router-dom';

const PendingBusinesses = () => {
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  // Elimina esta línea si no necesitas usar `navigate`
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingBusinesses = async () => {
      try {
        const data = await getPendingBusinesses();
        setPendingBusinesses(data);
      } catch (error) {
        console.error('Error fetching pending businesses:', error);
      }
    };

    fetchPendingBusinesses();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveBusiness(id);
      setPendingBusinesses(pendingBusinesses.filter((business) => business.id !== id));
    } catch (error) {
      console.error('Error approving business:', error);
    }
  };

  return (
    <div>
      <h1>Negocios Pendientes</h1>
      <ul>
        {pendingBusinesses.map((business) => (
          <li key={business.id}>
            <h2>{business.name}</h2>
            <p>{business.description}</p>
            <button onClick={() => handleApprove(business.id)}>Aprobar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingBusinesses;
