/* global angular, Chart */
angular.module('todoApp', [])
  .controller('TodoListController', function ($http) {
    var app = this
    app.data = []
    app.inbound = []
    getData()
    function getData () {
      $http.get('https://snmp-1521f.firebaseio.com/SW4503.json').then(res => {
        for (var index in res.data) {
          if (res.data.hasOwnProperty(index)) {
            app.data.push(res.data[index])
          }
        }
        app.data.map(i => {
          app.inbound = app.inbound.concat(i.inbound.map(x => x.inbound))
        })
      }).then((res) => {
        var sum = app.inbound.reduce((a, b) => a + b, 0)
        console.log(sum)
      })
    }
    app.switch = [
      { name: 'SW4503', ip: '10.77.4.1' },
      { name: 'R101C', ip: '10.77.6.2' },
      { name: 'R124', ip: '10.77.1.2' },
      { name: 'R330A', ip: '10.77.3.2' },
      { name: 'Rshop', ip: '10.77.8.2' },
      { name: 'R415', ip: '10.77.6.2' }
    ]
    var ctx = document.getElementById('myChart')
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true
      }
    })
    console.log(myChart)
  })
