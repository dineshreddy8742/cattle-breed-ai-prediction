import React from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

const ChartsSection = () => {
  // Sample data for charts
  const breedData = {
    labels: ['Gir', 'Sahiwal', 'Murrah', 'Nili-Ravi', 'Red Sindhi', 'Others'],
    datasets: [
      {
        label: 'Breed Recognition Share (%)',
        data: [30, 25, 20, 15, 5, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Images Processed',
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const regionalData = {
    labels: ['Gujarat', 'Punjab', 'Rajasthan', 'Haryana', 'Andhra Pradesh', 'Karnataka'],
    datasets: [
      {
        label: 'Users',
        data: [150, 120, 100, 80, 60, 40],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Breed Recognition Share',
      },
    },
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Usage Growth',
      },
    },
  }

  const regionalOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Regional Adoption',
      },
    },
  }

  return (
    <section className="charts-section">
      <div className="container">
        <div className="section-header">
          <h2>Data Insights</h2>
          <p>Visualizing our impact and usage patterns</p>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Top Breeds Recognized</h3>
            <Pie data={breedData} options={options} />
          </div>

          <div className="chart-card">
            <h3>Monthly Image Processing</h3>
            <Bar data={monthlyData} options={barOptions} />
          </div>

          <div className="chart-card">
            <h3>Regional User Distribution</h3>
            <Bar data={regionalData} options={regionalOptions} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChartsSection
