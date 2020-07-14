function dadosTeste() {
    list = [
        {
            "timestamp": 1475242340,
            "Temperatura": 20.331,
            "Umidade": 80.331
        },
        {
            "timestamp": 1475245940,
            "Temperatura": 40.034,
            "Umidade": 55.034
        },
        {
            "timestamp": 1475253140,
            "Temperatura": 12.249,
            "Umidade": 70.249
        },
        {
            "timestamp": 1475260340,
            "Temperatura": 30.765,
            "Umidade": 65.765
        },
        {
            "timestamp": 1475267340,
            "Temperatura": 31.765,
            "Umidade": 80.765
        }
    ]
    return list
}


function teste() {

    var DataTemperatura = [];
    var DataUmidade = [];

    var chart1 = new CanvasJS.Chart("chart1", {
        animationEnabled: false,
        zoomEnabled: false,
        title: {
            text: "PCD-Temperatura"
        },
        axisY: {
            title: "Temperatura",
            titleFontSize: 24,
            includeZero: true
        },
        axisX: {
            intervalType: "hour",
            valueFormatString: "HH:mm:ss",
            labelAngle: -45,
            //labelMaxWidth: 100 // change label width accordingly

        },
        data: [{
            name: "teste",
            type: "splineArea",
            color: "rgba(255,0,0,0.7)",
            yValueFormatString: "0.00 ºC",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        },
        {
            name: "teste2",
            type: "splineArea",
            color: "rgba(0,0,255,0.3)",
            yValueFormatString: "0.00%",
            xValueType: "dateTime",
            dataPoints: DataUmidade
        }
        ]
    });

    function addData(data) {
        for (var i = 0; i < data.length; i++) {
            DataTemperatura.push({
                x: data[i].timestamp,
                y: data[i].Temperatura,
                label: data[i].timestamp
            });
            DataUmidade.push({
                x: data[i].timestamp,
                y: data[i].Umidade,
                label: data[i].timestamp

            });
        }
        chart1.render();
    }
    addData(dadosTeste())
    //$.getJSON("https://canvasjs.com/data/gallery/jsp/total-biomass-energy-consumption.json", addData);

}
function teste2() {
    var DataUmidade = [];

    var chart2 = new CanvasJS.Chart("chart2", {
        animationEnabled: true,
        zoomEnabled: false,
        title: {
            text: "PCD=Umidade"
        },
        axisY: {
            title: "Umidade",
            titleFontSize: 24,
            includeZero: true
        },
        axisX: {
            intervalType: "hour",
            valueFormatString: "HH:mm:ss",
            labelMaxWidth: 100, // change label width accordingly
        },
        data: [{
            type: "splineArea",
            yValueFormatString: "#,##0.0#%",
            xValueType: "dateTime",
            dataPoints: DataUmidade
        }]
    });

    function addData(data) {
        for (var i = 0; i < data.length; i++) {
            DataUmidade.push({
                x: data[i].timestamp,
                y: data[i].Umidade
            });
        }
        chart2.render();
    }
    addData(dadosTeste())
}

setInterval(function () {
    teste()
    teste2()


}, 30000)