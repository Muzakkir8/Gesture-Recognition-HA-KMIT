

import React, { useState } from 'react';
import './BillPage.css';

const BillPage = () => {
    const [totalUsage, setTotalUsage] = useState(null);
    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const ratePerHour = 5; // Rate per hour in your currency

    const fetchUsageData = async () => {
        setLoading(true);
        setError('');
        setTotalUsage(null);
        setBill(null);
    
        try {
            const response = await fetch('http://localhost:8080/api/devices/calculateUsage');
    
            if (!response.ok) {
                const errorData = await response.json();
               
                setError(errorData.message || 'Failed to fetch usage data.');
                return;
            }
    
            const data = await response.json();
           
    
            // Use the correct key to access totalDuration
            const usage = parseFloat(data.totalDuration) || 0; // Adjust key based on backend
            const calculatedBill = usage * ratePerHour;
    
            setTotalUsage(usage.toFixed(2)); // Display with 2 decimal places
            setBill(calculatedBill.toFixed(2)); // Display with 2 decimal places
        } catch (err) {
            console.error('Fetch Error:', err.message);
            setError('An error occurred while fetching the usage data.');
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="bill-page">
            <h1>Electricity Usage & Bill Calculator</h1>
            <div className="form">
                <button onClick={fetchUsageData} disabled={loading}>
                    {loading ? 'Calculating...' : 'Calculate Total Bill'}
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {!loading && !error && totalUsage && bill && (
                <div className="result-container">
                    <p>
                        <strong>Total Usage:</strong> {totalUsage} hours
                    </p>
                    <p>
                        <strong>Total Electricity Bill:</strong> ${bill}
                    </p>
                </div>
            )}
        </div>
    );
};

export default BillPage;