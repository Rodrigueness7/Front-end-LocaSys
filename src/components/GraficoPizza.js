'use client'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

export default function GraficoPizza({labels, dataValues}) {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          '#0088FE',
          '#00C49F',
          '#FFBB28',
          '#FF8042',
        ]
      }
    ]
  }

  return (
    <div className=' w-96 h-96'>
      <Doughnut data={data} />
    </div>
  )
}