import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DeviceUsageBarGraph = () => {
  const [usageData, setUsageData] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  // Fetch device usage data
  useEffect(() => {
    fetch("http://localhost:8080/api/devices/calculateUsage")
      .then((response) => response.json())
      .then((data) => {
        setUsageData(data.usageData);
        setTotalBill(data.totalBill);
      })
      .catch((error) => console.error("Error fetching device usage data:", error));
  }, []);

  // Prepare data for the bar chart
  const chartData = {
    labels: usageData.map((device) => device.deviceName), // X-axis: Device names
    datasets: [
      {
        label: "Time Connected (hours)", // Y-axis label
        data: usageData.map((device) => parseFloat(device.duration)), // Y-axis: Usage duration
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
          text: "Devices",
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
