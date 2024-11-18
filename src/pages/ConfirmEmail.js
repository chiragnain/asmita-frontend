// src/pages/ConfirmEmail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';

const ConfirmEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const res = await axios.get(`/auth/confirm-email/${token}`);
                setMessage(res.data.message);
                setTimeout(() => navigate('/login'), 1); 
            } catch (err) {
                setMessage(err.response?.data?.message || 'Confirmation failed.');
            }
        };
        confirmEmail();
    }, [token, navigate]);

    return <div>{message}</div>;
};

export default ConfirmEmail;
