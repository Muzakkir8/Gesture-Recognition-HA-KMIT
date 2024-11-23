import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DeviceUsageBarGraph = () => {
  const [usageData, setUsageData] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  // Fetch device usage data and aggregate it
  useEffect(() => {
    fetch("http://localhost:8080/api/devices/calculateUsage")
        .then((response) => response.json())
        .then((data) => {
            console.log("API Response:", data); // Debug log
            setUsageData(data.usageData);
            setTotalBill(data.totalBill);
        })
        .catch((error) => console.error("Error fetching device usage data:", error));
}, []);

  // Function to aggregate device usage
  const aggregateUsage = (usageData) => {
    const aggregated = {};

    usageData.forEach((device) => {
      const key = `${device.deviceName}-${device.deviceRoomName}`; // Unique key for device + room
      if (!aggregated[key]) {
        aggregated[key] = {
          deviceName: device.deviceName,
          deviceRoomName: device.deviceRoomName,
          duration: 0, // Initialize with 0
        };
      }
      aggregated[key].duration += parseFloat(device.duration); // Add duration for each toggle
    });

    // Convert aggregated data back to an array
    return Object.values(aggregated);
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: usageData.map((device) => `${device.deviceName} (${device.deviceRoomName})`), // X-axis: Device + Room
    datasets: [
      {
        label: "Time Connected (hours)", // Y-axis label
        data: usageData.map((device) => device.duration), // Y-axis: Aggregated Usage duration
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Device Usage Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time Connected (hours)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Devices (Room)",
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2>Device Usage</h2>
      <Bar data={chartData} options={chartOptions} />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>Total Bill: ₹{totalBill}</h3>
      </div>
    </div>
  );
};

export default DeviceUsageBarGraph;
