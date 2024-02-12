import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
  
const SplineChart = ({expense,income}) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Expense',
        data: [expense.January, expense.February,expense.March,expense.April,expense.May,expense.June,
              expense.July,expense.August,expense.September,expense.October,expense.November,expense.December],
        borderColor: 'rgba(255, 0, 0, 1)',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: 'origin',
        borderWidth:1, 
        cubicInterpolationMode:'monotone'
      },
      {
        label: 'Income',
        data: [income.January, income.February,income.March,income.April,income.May,income.June,
          income.July,income.August,income.September,income.October,income.November,income.December],
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: 'origin',
        borderWidth: 1,
        cubicInterpolationMode:'monotone'
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
        line: {
          fill: 'origin',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
            grid: {
              display: false,
            },
          },
    }
  };
   
  return (
    <div className="w-3/5 h-2/3 bg-white rounded-xl  mb:w-full  ">
    <Line data={data} options={options} />
    </div>
  )
}

export default SplineChart
