import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PumpGraph = () => {
  // Example data for motor pump flow
  const dataPoints = [
    {head :0,flow:28},
    { head:1.6,flow : 27},
    { head: 2.3, flow: 26 },
    { head: 3.8, flow: 25 },
    { head: 4.2, flow: 22 },
    { head: 4.6, flow: 19 },
    { head: 5.4, flow: 12 },
    { head: 6.5, flow: 0 },
  ];

  // Random dataset for generating operating point
  const data = [
    
    {head: 3.1, flow: 19},
    {head: 2.4, flow: 17},
    {head: 1.6, flow: 23},
    {head: 2.8, flow: 19},
    {head: 2.1, flow: 20},
    {head: 4.9, flow: 22},
    {head: 4.4, flow: 29},
    {head: 1.3, flow: 19},
    {head: 4.7, flow: 16},
    {head: 2.3, flow: 17},
    {head: 2.9, flow: 27},
    {head: 1.6, flow: 27},
    {head: 4.8, flow: 26},
    {head: 1.1, flow: 12},
    {head: 1.0, flow: 30},
    {head: 4.9, flow: 23},
    {head: 3.3, flow: 22},
    {head: 1.1, flow: 4},
    {head: 3.6, flow: 13},
    {head: 1.9, flow: 25},
    {head: 2.2, flow: 28},
    {head: 1.9, flow: 23},
    {head: 4.4, flow: 3},
    {head: 4.9, flow: 21},
    {head: 3.3, flow: 13},
    {head: 2.2, flow: 23},
    {head: 2.8, flow: 30},
    {head: 3.5, flow: 27},
    {head: 2.2, flow: 25},
    {head: 4.1, flow: 17},
    {head: 4.9, flow: 14},
    {head: 3.3, flow: 26},
    {head: 1.1, flow: 27}
  ]
  ;

  // State for current operating point
  const [currentPoint, setCurrentPoint] = useState({ head: 31, flow: 40 });

  const genval = () => {
    setTimeout(() => {
      const math = Math.floor(Math.random() * 30);
      setCurrentPoint(data[math]);
    }, 1000);
  };
  genval();

  useEffect(() => {
     genval(); // Uncomment if you want to auto-generate random values
  }, []);

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPoint((prevPoint) => ({
      ...prevPoint,
      [name]: Number(value),
    }));
  };

  // Chart.js data configuration
  const chartData = {
    datasets: [
      {
        label: 'Flow Rate (L/min)',
        data: dataPoints.map(point => ({ x: point.head, y: point.flow })), // Plot head vs flow
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Current Operating Point',
        data: [{ x: currentPoint.head, y: currentPoint.flow }],
        pointRadius: 10, // Size of the red dot
        pointBackgroundColor: 'red', // Red color for the point
        pointBorderColor: 'black', // Black border for the point
        showLine: false, // No line connecting this point
        fill: false,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Flow Rate (m3/h)',
        },
        type: 'linear', // Treat the X-axis as a linear scale
        min: 0, // Set the minimum value for x-axis
        max: 8, // Set the maximum value for x-axis
      },
      y: {
        title: {
          display: true,
          text: 'Head (m)',
        },
        min: 0, // Set the minimum value for y-axis
        max: 30, // Set the maximum value for y-axis
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Motor Pump Flow vs Head</h2>

      {/* User inputs to dynamically set the current operating point */}
      <div className="flex justify-center space-x-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Head (m):</label>
          <input 
            type="number" 
            name="head" 
            value={currentPoint.head} 
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Flow Rate (L/min):</label>
          <input 
            type="number" 
            name="flow" 
            value={currentPoint.flow} 
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PumpGraph;
