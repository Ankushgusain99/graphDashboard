// src/Components/PieChart.js
import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ alertData }) => {
    useEffect(() => {
        if (Array.isArray(ChartJS.instances)) {
          ChartJS.instances.forEach(instance => instance.destroy());
        }
      }, []);
      

  if (!Array.isArray(alertData) || alertData.length === 0) {
    return <p>No alert data available.</p>;
  }

  const categories = alertData.reduce((acc, alert) => {
    const category = alert.alert && alert.alert.category ? alert.alert.category : 'Unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: '# of Alerts',
        data: Object.values(categories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Alert Pie Chart</h2>
      <Pie data={data} />
      {alertData.map((alert, index) => (
        <div key={index}>
          <p>{`Alert: ${alert.alert ? alert.alert.signature : 'Unknown'}`}</p>
          <p>{`Timestamp: ${alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'Unknown'}`}</p>
          <p>{`Source IP: ${alert.src_ip}:${alert.src_port}`}</p>
          <p>{`Destination IP: ${alert.dest_ip}:${alert.dest_port}`}</p>
          <p>{`Category: ${alert.alert ? alert.alert.category : 'Unknown'}`}</p>
        </div>
      ))}
    </div>
  );
};

export default PieChart;
