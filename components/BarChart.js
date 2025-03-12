'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ data, title }) {
  const chartData = {
    labels: data.map((p) => `${p.id} (Burst: ${p.burstTime})`),
    datasets: [
      {
        label: 'Completion Time',
        data: data.map((p) => p.completionTime),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title, // Dynamically use the title prop
        font: {
          size: 18,
        },
      },
      legend: {
        display: false, // Hide legend if not needed
      },
    },
    animation: {
      duration: 100,
    },
  };

  return <Bar data={chartData} options={options} />;
}
