import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import pattern from 'patternomaly'

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({
    goalVal,
    val
}) => {
  const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [val > goalVal ? goalVal : val, goalVal - val < 0 ? 0 : goalVal - val],
        backgroundColor: [
            goalVal - val > 0 ? 'rgba(12, 126, 112)' : 'rgba(250, 50, 50)',
          'rgba(235, 235, 235)',
        ],
        borderColor: [
          'rgb(12, 126, 112)',
          'rgba(235, 235, 235)',
        ],
        borderWidth: 0,
        boderDash: [4,4],
        cutout: '85%',
        borderRadius:50
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // This hides the legend labels
      },
      tooltip: {
        enabled: false, // This disables the tooltips
      },
      title: {
        display: false,
        text: 'Donut Chart Example',
      },
    },
  }

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;
