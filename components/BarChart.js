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

export default function BarChart({ data }) {
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
    animation: {
      duration: 100, // Animation duration in milliseconds
    //   easing: 'easeInOutBounce', // Easing effect
    },
  };

  return <Bar data={chartData} options={options} />;

//   return <Bar data={chartData} />;
}