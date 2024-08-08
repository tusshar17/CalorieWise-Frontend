import React from 'react'
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';


ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
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

    let lineChartData;

    const getData = (property) => {
            return dataSet.map((record, i)=>{
                return record[property]
            })
    }

    console.log(entity, getData());


    if (entity==="calories"){
        lineChartData = {
            labels: dataSet.map((record, i)=>(new Date(record.date).toLocaleDateString())),
            datasets: [
                {
                    label: entity,
                    data: getData('day_calories'),
                    borderColor: "#0C7E70",
                    borderWidth: 2
                }
            ],
          }
    }

    if (entity==="weight"){
        lineChartData = {
            labels: dataSet.map((record, i)=>(new Date(record.created_at).toLocaleDateString())),
            datasets: [
                {
                    label: entity,
                    data: getData('weight'),
                    borderColor: "#0C7E70",
                    borderWidth: 2
                }
            ],
          }
    }

    if (entity==="macros"){
        lineChartData = {
            labels: dataSet.map((record, i)=>(new Date(record.date).toLocaleDateString())),
            datasets: [
                {
                    label: 'Protein',
                    data: getData('day_protein'),
                    borderColor: "#0C7E70",
                    borderWidth: 2
                },
                {
                    label: 'Carbs',
                    data: getData('day_carbs'),
                    borderColor: "#704859",
                    borderWidth: 2
                },
                {
                    label: 'Fats',
                    data: getData('day_fats'),
                    borderColor: "#E6AA32",
                    borderWidth: 2
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
    <Line options={options} data={lineChartData}/>
  )
}

export default LineChart