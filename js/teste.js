
window.onload = function () {

    var dps = [{ x: 1, y: 10 }, { x: 2, y: 13 }, { x: 3, y: 18 }, { x: 4, y: 20 }, { x: 5, y: 17 }, { x: 6, y: 10 }, { x: 7, y: 13 }, { x: 8, y: 18 }, { x: 9, y: 20 }, { x: 10, y: 17 }];   //dataPoints. 

    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Live Data"
        },
        axisX: {
            title: "Axis X Title"
        },
        axisY: {
            title: "Units"
        },
        data: [{
            type: "line",
            dataPoints: dps
        }]
    });

    chart.render();
    var xVal = dps.length + 1;
    var yVal = 15;
    var updateInterval = 1000;

    var updateChart = function (json) {
        let data = json["PCD_data"][PCD_NAME];

        for (var i = 0; i < data.length; i++) {
            let localtimestamp = (data[i].timestamp) * 1000
            let datatimeUTC = ((localtimestamp) + ((10800) * 1000))
            let HMS = new Date(localtimestamp).toISOString().slice(0, 19).replace('T', ' ');
            DataTemperatura.push({
                x: datatimeUTC,
                y: data[i].Temperatura, label: HMS
            });
            DataUmidade.push({
                x: datatimeUTC,
                y: data[i].Umidade, label: HMS

            });
        }
        RHTrelativo.render();
    }
    $.getJSON("/rhtdata", updateChart);

};

setInterval(function () { updateChart() }, updateInterval);
}
