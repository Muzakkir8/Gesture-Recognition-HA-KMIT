import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const WeeklyUsageChart = () => {
    const [chartData, setChartData] = useState({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Usage (kWh)',
                data: [0, 0, 0, 0, 0, 0, 0], // Default zero values
                backgroundColor: [
                    'rgba(128, 0, 128)', // Purple
                    'rgba(75, 192, 192)', // Teal
                    'rgba(255, 206, 86)', // Yellow
                    'rgba(54, 162, 235)', // Blue
                    'rgba(255, 99, 132)', // Pink
                    'rgba(153, 102, 255)', // Violet
                    'rgba(255, 159, 64)', // Orange
                ],
                barThickness: 15, // Adjust bar width
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/devices/weeklyUsage');
                console.log(response.data); // Debugging: Check response structure
                const data = response.data;

                const updatedData = data.map((item) => parseFloat(item.usage)); // Convert usage to numbers
                setChartData((prev) => ({
                    ...prev,
                    datasets: [
                        {
                            ...prev.datasets[0],
                            data: updatedData,
                        },
                    ],
                }));
            } catch (error) {
                console.error('Error fetching weekly usage:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center ml-[5.6rem] ">
            <div className="bg-[#f8faff]  p-2 rounded-[30px] " style={{ width: '890px', height: '255px' }}>
                <Bar
                    data={chartData}
                    width={600}
                    height={250}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const value = context.raw;
                                        return `${value.toFixed(2)} kWh`; // Works because value is now numeric
                                    },
                                },
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'kWh',
                                },
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)', // Reduced opacity
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default WeeklyUsageChart;
