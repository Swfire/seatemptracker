import React from 'react';
import Content from '../Content/Content';
import './Stats.css';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import stringHash from 'string-hash';

function Stats(props) {

  const reducer = (groupedData, currentItem) => {
    const index = groupedData.findIndex(item => item.saatila === currentItem.saatila);
    if (index >= 0) {
      groupedData[index].arvo = groupedData[index].arvo + "";
    } else {
      groupedData.push({saatila: currentItem.saatila, arvo: currentItem.arvo});
    }
    return groupedData;
  }

  let groupedData = props.data.reduce(reducer, []);

  let doughnutData = {
    labels: groupedData.map(item => item.saatila),
    datasets: [
      {
      data: groupedData.map(item => item.arvo),
      backgroundColor: [ '#ffd700',
        groupedData.slice(3).map(item => "hsl(" + (stringHash(item.kaupunki) % 360) + ", 80%, 70%)")
      ]
    }
    ]

  }

  let linedata = props.data.map( item => ({x: item.testauspaiva, y: item.arvo}));


  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const randomByte = () => randomNumber(0, 255)
  const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2)
  const randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`

  let barData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets:[{
            label: 'Average temperature',
            data: [
              18,
              17,
              17,
              18,
              20,
              24,
              26,
              27,
              27,
              25,
              22,
              19,
              0
            ],
            backgroundColor: randomCssRgba,
            borderWidth: 2,
        barThickness: 'flex',
        maxBarThickness: 8,
        minBarLength: 5
          }]
    }

  let data = {
    datasets: [
      {
        label: 'Total temperature',
        data: linedata,
        fill: false,
        backgroundColor: 'rgba(0,0,0,0,2)',
        borderColor: '#4169e1'
      }
    ]
  }

  let options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            displayFormats: {
              day: 'D.M.Y',
              month: 'M.Y'
            },
            minUnit: 'day'
          }
        }
      ]
    }
  }

  return (
      <Content>
        <div className="stats">
          <h3>Temperatures</h3>
          <div className="stats__graph">
            <Line data={data} options={options}/>
          </div>
          <br></br>
          <h3>Max water temperature according to the weather</h3>
          <div className="stats__graph">
            <Doughnut data={doughnutData} />
          </div>
          <h3>Average temperature</h3>
          <div className="stats__graph">
            <Bar data={barData} />
          </div>
        </div>
      </Content>
    )
  }

export default Stats;