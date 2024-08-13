import React, { useState, useEffect } from 'react';
import { getPendingBusinesses, approveBusiness } from '../services/api';

const AdminDashboard = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const data = await getPendingBusinesses();
            setBusinesses(data);
        };
        fetchBusinesses();
    }, []);

    const handleApprove = async (id) => {
        await approveBusiness(id);
        setBusinesses(businesses.filter(b => b.id !== id));
    };

    return (
        <div>
            <h1>Negocios Pendientes</h1>
            <ul>
                {businesses.map(business => (
                    <li key={business.id}>
                        {business.name} - {business.category}
                        <button onClick={() => handleApprove(business.id)}>Aprobar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
