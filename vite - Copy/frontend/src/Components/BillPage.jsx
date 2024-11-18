import React, { useState, useEffect } from 'react';
function BillPage() {
    const [roomUsage, setRoomUsage] = useState({}); // State to store room usage data
    const [totalBill, setTotalBill] = useState(null); // State for total bill (optional)
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBill = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/devices/bill');
          if (response.ok) {
            const data = await response.json();
            setRoomUsage(data.roomUsage || {});
            setTotalBill(data.totalBill); // Optional: Set totalBill if present
          } else {
            console.error('Failed to fetch bill data');
          }
        } catch (error) {
          console.error('Error fetching bill data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBill();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="p-6 min-h-screen">
        <h2>Electricity Bill Calculation</h2>
        {Object.entries(roomUsage).map(([room, usage]) => (
          <div key={room} className="mb-4">
            <strong>{room} Usage:</strong> {usage ? usage.toFixed(2) : 'N/A'} hours
          </div>
        ))}
        {totalBill && ( // Optional: Display total bill if available
          <div className="mb-4">
            <strong>Total Bill:</strong> ${totalBill.toFixed(2)}
          </div>
        )}
      </div>
    );
  }

export default BillPage;