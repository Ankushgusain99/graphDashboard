// src/Components/LineChart.js
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ alertData }) => {
  useEffect(() => {
    if (Array.isArray(ChartJS.instances)) {
      ChartJS.instances.forEach(instance => instance.destroy());
    }
  }, []);
  

  if (!Array.isArray(alertData) || alertData.length === 0) {
    return <p>No alert data available.</p>;
  }

  const timestamps = alertData.map(alert => alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'Unknown');
  const severities = alertData.map(alert => alert.alert && alert.alert.severity !== undefined ? alert.alert.severity : 0);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Severity',
        data: severities,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Alert Line Chart</h2>
      <Line data={data} options={options} />
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

export default LineChart;
