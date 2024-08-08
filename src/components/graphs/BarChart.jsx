import React from 'react'
import {Bar} from 'react-chartjs-2'
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';


ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
)



const LineChart = ({
    dataSet,
    timeInterval,
    entity
}) => {

    console.log(entity, dataSet);

    let barChartData;

    const getData = (property) => {
            return dataSet.map((record, i)=>{
                return record[property]
            })
    }

    console.log(entity, getData());


    if (entity==="calories"){
        barChartData = {
            labels: dataSet.map((record, i)=>{
                const date = new Date(record.date)
                return `${date.getDate()}/${date.getMonth()+1}`
            }),
            datasets: [
                {
                    label: entity,
                    data: getData('day_calories'),
                    borderColor: "rgb(12, 126, 112)",
                    backgroundColor: "rgb(12, 126, 112, 0.2)",
                    borderWidth: 1
                }
            ],
          }
    }

    if (entity==="weight"){
        barChartData = {
            labels: dataSet.map((record, i)=>{
                const date = new Date(record.created_at)
                return `${date.getDate()}/${date.getMonth()+1}`
            }),
            datasets: [
                {
                    label: entity,
                    data: getData('weight'),
                    borderColor: "rgb(12, 126, 112)",
                    backgroundColor: "rgb(12, 126, 112, 0.2)",
                    borderWidth: 1
                }
            ],
          }
    }

    if (entity==="macros"){
        barChartData = {
            labels: dataSet.map((record, i)=>{
                const date = new Date(record.date)
                return `${date.getDate()}/${date.getMonth()}`
            }),
            datasets: [
                {
                    label: 'Protein',
                    data: getData('day_protein'),
                    borderColor: "rgb(12, 126, 112)",
                    backgroundColor: "rgb(12, 126, 112, 0.2)",
                    borderWidth: 1
                },
                {
                    label: 'Carbs',
                    data: getData('day_carbs'),
                    borderColor: "rgb(112, 72, 89)",
                    backgroundColor: "rgb(112, 72, 89, 0.2)",
                    borderWidth: 1
                },
                {
                    label: 'Fats',
                    data: getData('day_fats'),
                    borderColor: "rgb(230, 170, 50)",
                    backgroundColor: "rgb(230, 170, 50, 0.2)",
                    borderWidth: 1
                },
            ],
          }
    }
  

    const options = {
        plugins: {
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: 150,
                yMax: 150,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
              }
            }
          }
        }
      };


  return (
    <Bar options={options} data={barChartData}/>
  )
}

export default LineChart