import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';  // Import the Line chart component
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { db } from '../firebase';  // Import the Firebase instance
import { collection, getDocs } from 'firebase/firestore';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProgressChart() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('steps'); // State to track the active tab

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'rehabilitationData'));
      const dataArray = querySnapshot.docs.map(doc => doc.data());
      setData(dataArray);
    };

    fetchData();
  }, []);

  // Normalized chart data (combined)
  const chartData = {
    labels: data.map((entry, index) => `Entry ${index + 1}`),  // X-axis labels (entry numbers)
    datasets: [
      {
        label: 'Steps (scaled)',
        data: data.map(entry => entry.steps / 1000),  // Normalize steps (divide by 1000)
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

  // Steps chart data (individual chart for steps)
  const stepsChartData = {
    labels: data.map((entry, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Steps',
        data: data.map(entry => entry.steps),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  // Duration chart data (individual chart for duration)
  const durationChartData = {
    labels: data.map((entry, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Duration (min)',
        data: data.map(entry => entry.duration),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
    ],
  };

  // Difficulty chart data (individual chart for difficulty)
  const difficultyChartData = {
    labels: data.map((entry, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Difficulty (1-10)',
        data: data.map(entry => entry.difficulty),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
    ],
  };

  // Chart options with tooltips and axis formatting
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            if (tooltipItem.dataset.label === 'Steps (scaled)') {
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
            return value;  // Keep steps as-is, no scaling down
          },
        },
      },
      y2: {
        position: 'right',
        ticks: {
          beginAtZero: true,
          max: 10,  // Difficulty scale from 1 to 10
        },
      },
    },
  };

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h2>Gait Rehabilitation Progress</h2>

      {/* Tab navigation */}
      <div>
        <button onClick={() => handleTabChange('steps')} className={activeTab === 'steps' ? 'active' : ''}>
          Steps
        </button>
        <button onClick={() => handleTabChange('duration')} className={activeTab === 'duration' ? 'active' : ''}>
          Duration
        </button>
        <button onClick={() => handleTabChange('difficulty')} className={activeTab === 'difficulty' ? 'active' : ''}>
          Difficulty
        </button>
      </div>

      {/* Render the correct chart based on the active tab */}
      {activeTab === 'steps' && <Line data={stepsChartData} options={options} />}
      {activeTab === 'duration' && <Line data={durationChartData} options={options} />}
      {activeTab === 'difficulty' && <Line data={difficultyChartData} options={options} />}

      {/* Display the combined normalized chart */}
      <h3>Normalized Combined Progress Chart</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ProgressChart;
