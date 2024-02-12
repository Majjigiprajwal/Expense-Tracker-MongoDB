import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({data}) => {
    const dataSet = {
        labels: ['General', 'Food', 'Shopping', 'Travel','Fuel'],
        datasets: [
          {
            data: [data.General, data.Food, data.Shopping, data.Travel,data.Fuel],
            backgroundColor:['#E11D48', '#22c55e', '#fde047', '#ea580c', '#60a5fa'],       
          },
        ],
      };
    ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <div className="bg-black opacity-90 w-2/5 h-2/3 rounded-xl flex justify-center items-center mb:w-full">
      <Doughnut data={dataSet} />
    </div>
  )
}

export default DoughnutChart
