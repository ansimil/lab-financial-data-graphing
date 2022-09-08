const getData = (startDate, endDate, curr) => {   
axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${curr}`)
.then(response => {
    printChart(response.data)
    console.log(response) 
})
.catch(err => console.log(err))
}




let myChart = null

const printChart = priceData => {
    
    const ctx = document.querySelector('#myChart').getContext('2d')
    //console.log(priceData.bpi)
    const xAxis = Object.keys(priceData.bpi)
    //console.log(xAxis)

    const yAxis = xAxis.map(date => {
		return priceData.bpi[date]
	})
    //console.log(yAxis)
    let currency = document.getElementsByClassName('currency')[0].value.toUpperCase()
    let minVal = Math.floor(Math.min(...yAxis)).toLocaleString("en-US");
    //console.log(minVal)
    document.getElementsByClassName('minVal')[0].innerText = `Min Value: ${minVal} ${currency}` 
    console.log(document.getElementsByClassName('minVal')[0].innerText)
    let maxVal = Math.floor(Math.max(...yAxis)).toLocaleString("en-US");
    //console.log(maxVal)
    document.getElementsByClassName('maxVal')[0].innerText = `Max Value: ${maxVal} ${currency}`
    console.log(document.getElementsByClassName('maxVal')[0].innerText)



    if(myChart!=null){
        myChart.destroy()
    }
    
    myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			// x axis
			labels: xAxis,
			datasets: [
				{
					label: 'Stock Price',
					backGroundColor: 'rgb(255, 99, 132',
					borderColor: 'rgb(255, 99, 132)',
					// y axis
					data: yAxis,
                    //hoverOffset: 10,
                    hoverBackgroundColor: 'rgb(255, 0, 0)',
                    hoverBorderWidth: 4,
                    hoverBorderRadius: 4,
                    hoverBorderColor: 'rgb(0, 0, 255)'
				}
			]
            
		},
        options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
    
	})
}


document.querySelector('button').addEventListener('click', () => {
	const startDate = document.getElementsByClassName('startDate')[0].value
    const endDate = document.getElementsByClassName('endDate')[0].value
    const curr = document.getElementsByClassName('currency')[0].value
	console.log(startDate)
    console.log(endDate)
    console.log(curr)


    getData(startDate, endDate, curr)

})

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const startDate = document.getElementsByClassName('startDate')[0].value
        const endDate = document.getElementsByClassName('endDate')[0].value
        const curr = document.getElementsByClassName('currency')[0].value

        getData(startDate, endDate, curr) ;
    },
    false
  );

  document.querySelectorAll('.inputVal').forEach(item => {
    item. addEventListener('change', () => {
        const startDate = document.getElementsByClassName('startDate')[0].value
        const endDate = document.getElementsByClassName('endDate')[0].value
        const curr = document.getElementsByClassName('currency')[0].value
    // console.log(startDate) 
        let bitcoinDataUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`    
        //console.log(bitcoinDataUrl)
        getData(startDate, endDate, curr)
    })
})