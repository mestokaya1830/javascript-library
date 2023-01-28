 // Chart.defaults.elements.bar.borderWidth = 10
  // const plugin = {
  //   id: 'custom_canvas_background_color',
  //   beforeDraw: (chart) => {
  //     const ctx = chart.canvas.getContext('2d');
  //     ctx.save();
  //     ctx.globalCompositeOperation = 'destination-over';
  //     ctx.fillStyle = 'lightGreen';
  //     ctx.fillRect(0, 0, chart.width, chart.height);
  //     ctx.restore();
  //   }
  // }
  let myChart = new Chart(document.getElementById('myChart'), {
    type: 'bar',
    data: {
      labels: ['Javascript','Python','Java','Go','C++','C#'],
      datasets: [{
        label: 'Pie Chart',
        backgroundColor: 'lightblue',
        borderColor: '#999',
        borderWidth: 1,
        data: [80, 90, 70, 60, 20, 30],
      }]
    },
    // plugins:[plugin],
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Title',
          font:{size: 30},
          padding: {
            top: 0,
            bottom: 0
          }
        },
        subtitle: {
          display: true,
          text: 'Subtitle'
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: 'blue',
            font:{size: 10}
          }
        }
      }
    }
  })
  console.log(myChart.data)