import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';  // Import the Line chart component
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProgressChart() {
  const [data, setData] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'rehabilitationData'));
      const dataArray = querySnapshot.docs.map(doc => doc.data());
      setData(dataArray);
    };

    fetchData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: data.map((entry, index) => `Entry ${index + 1}`), // X-axis labels (entry numbers)
    datasets: [
      {
        label: 'Steps',
        data: data.map(entry => entry.steps),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Duration (min)',
        data: data.map(entry => entry.duration),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
      {
        label: 'Difficulty (1-10)',
        data: data.map(entry => entry.difficulty),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
    ],
  };

  // Chart options with tooltips and formatting
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            if (tooltipItem.dataset.label === 'Steps') {
              return `Steps: ${value}`;
            } else if (tooltipItem.dataset.label === 'Duration (min)') {
              return `Duration: ${value} minutes`;
            } else if (tooltipItem.dataset.label === 'Difficulty (1-10)') {
              return `Difficulty: ${value}/10`;
            }
            return value;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            if (value % 1000 === 0) return `${value}`;
            return value;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Progress Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ProgressChart;
