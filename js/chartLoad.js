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
            title: "Temperatura",
            titleFontSize: 15,
            includeZero: true
            //includeZero: false
        },
        axisY2: {
            title: "Umidade",
            titleFontSize: 15,
            //includeZero: true
            includeZero: false

        },
        axisX: {
            intervalType: "hour",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -20,
            labelMaxWidth: 100 // change label width accordingly

        },
        data: [{
            type: "spline",
            color: "rgba(255,0,0,0.7)",
            yValueFormatString: "Temperatura 00.00 Celsius",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        },
        {
            name: "teste2",
            axisYType: "secondary",
            type: "spline",
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
                y: data[i].Temperatura
            });
            DataUmidade.push({
                x: datatime,
                y: data[i].Umidade

            });
        }
        chart1.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);

}
function teste2() {

    var DataTemperatura = [];
    var DataUmidade = [];

    var chart2 = new CanvasJS.Chart("chart2", {
        animationEnabled: false,
        zoomEnabled: false,
        title: {
            text: "PCD-Temperatura/Umidade"
        },
        axisY: {
            title: "Temperatura",
            titleFontSize: 15,
            //includeZero: true
            includeZero: false
        },
        axisY2: {
            title: "Umidade",
            titleFontSize: 15,
            includeZero: true
            //includeZero: false

        },
        axisX: {
            intervalType: "hour",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -20,
            labelMaxWidth: 100 // change label width accordingly

        },
        data: [{
            type: "spline",
            color: "rgba(255,0,0,0.7)",
            yValueFormatString: "Temperatura 00.00 Celsius",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        },
        {
            name: "teste2",
            axisYType: "secondary",
            type: "spline",
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
                y: data[i].Temperatura
            });
            DataUmidade.push({
                x: datatime,
                y: data[i].Umidade

            });
        }
        chart2.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);

}/* 
function teste2() {
    var DataTemperatura = [];
    var DataUmidade = [];

    var chart2 = new CanvasJS.Chart("chart2", {
        animationEnabled: false,
        zoomEnabled: false,
        title: {
            text: "PCD-Umidade"
        },
        axisY: {
            title: "Umidade",
            titleFontSize: 15,
            //includeZero: true
            includeZero: false
        },
        axisX: {
            intervalType: "hour",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -20,
            labelMaxWidth: 50 // change label width accordingly
        },
        data: [{
            type: "splineArea",
            color: "rgba(0,0,255,0.7)",
            yValueFormatString: "Temperatura 00.00 Celsius",
            xValueType: "dateTime",
            dataPoints: DataUmidade
        }]
    });

    function addData(json) {
        let data = json["rht"]

        for (var i = 0; i < data.length; i++) {
            let datatime = data[i].timestamp * 1000
            DataTemperatura.push({
                x: datatime,
                y: data[i].Temperatura
            });
            DataUmidade.push({
                x: datatime,
                y: data[i].Umidade

            });
        }
        chart2.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);
}

function teste3() {
    var DataTemperatura = [];
    var DataUmidade = [];

    var chart3 = new CanvasJS.Chart("chart3", {
        animationEnabled: false,
        zoomEnabled: false,
        title: {
            text: "PCD-Temperatura"
        },
        axisY: {
            title: "Temperatura",
            titleFontSize: 15,
            //includeZero: true
            includeZero: false
        },
        axisX: {
            intervalType: "hour",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -20,
            labelMaxWidth: 50 // change label width accordingly
        },
        data: [{
            type: "splineArea",
            color: "rgba(255,0,0,1)",
            yValueFormatString: "Temperatura 00.00 Celsius",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        }]
    });

    function addData(json) {
        let data = json["rht"]

        for (var i = 0; i < data.length; i++) {
            let datatime = data[i].timestamp * 1000
            DataTemperatura.push({
                x: datatime,
                y: data[i].Temperatura
            });
        }
        chart3.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);
}
 */

setInterval(function () {
    teste()
    teste2()
    teste3()
}, 60000)