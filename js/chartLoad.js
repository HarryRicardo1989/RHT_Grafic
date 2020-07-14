function teste() {

    var DataTemperatura = [];
    var DataUmidade = [];

    var chart1 = new CanvasJS.Chart("chart1", {
        animationEnabled: false,
        zoomEnabled: false,
        title: {
            text: "PCD-Temperatura/Umidade"
        },
        axisY: {
            title: "RHT",
            titleFontSize: 18,
            includeZero: true
        },
        axisX: {
            intervalType: "hour",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -45,
            labelMaxWidth: 100 // change label width accordingly

        },
        data: [{
            name: "teste",
            type: "splineArea",
            color: "rgba(255,0,0,0.7)",
            yValueFormatString: "Temperatura #,## C",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        },
        {
            name: "teste2",
            type: "splineArea",
            color: "rgba(0,0,255,0.3)",
            yValueFormatString: "Umidade #,##%",
            xValueType: "dateTime",
            dataPoints: DataUmidade
        }
        ]
    });

    function addData(json) {
        let data = json["rht"]

        for (var i = 0; i < data.length; i++) {
            let datatime = data[i].timestamp * 1000
            DataTemperatura.push({
                x: datatime,
                y: data[i].Temperatura,
            });
            DataUmidade.push({
                x: datatime,
                y: data[i].Umidade,

            });
        }
        chart1.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);

}
/* function teste2() {
    var DataUmidade = [];

    var chart2 = new CanvasJS.Chart("chart2", {
        animationEnabled: false,
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

    function addData(json) {
        let data = json["rht"]
        for (var i = 0; i < data.length; i++) {
            DataUmidade.push({
                x: data[i].timestamp,
                y: data[i].Umidade
            });
        }
        chart2.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);
} */

setInterval(function () {
    teste()
    //teste2()
}, 60000)