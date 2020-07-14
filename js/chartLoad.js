function RHTabsoluto() {

    var DataTemperatura = [];
    var DataUmidade = [];

    var RHTabsoluto = new CanvasJS.Chart(" RHTabsoluto", {
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
        /*         axisY2: {
                    title: "Umidade",
                    titleFontSize: 15,
                    includeZero: true
                    //includeZero: false
        
                }, */
        axisX: {
            intervalType: "hour",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -20,
            labelMaxWidth: 100 // change label width accordingly

        },
        data: [{
            type: "spline",
            color: "rgba(255,0,0,1)",
            yValueFormatString: "Temperatura 00.00 Celsius",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        },
        {
            name: "teste2",
            //axisYType: "secondary",
            type: "spline",
            color: "rgba(0,0,255,1)",
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
        RHTabsoluto.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);

}
function RHTrelativo() {

    var DataTemperatura = [];
    var DataUmidade = [];

    var RHTrelativo = new CanvasJS.Chart("RHTrelativo", {
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
            color: "rgba(255,0,0,1)",
            yValueFormatString: "Temperatura 00.00 Celsius",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        },
        {
            name: "teste2",
            axisYType: "secondary",
            type: "spline",
            color: "rgba(0,0,255,1)",
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
        RHTrelativo.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);

}
function RHTUmidade() {
    var DataTemperatura = [];
    var DataUmidade = [];

    var RHTUmidade = new CanvasJS.Chart("RHTUmidade", {
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
        RHTUmidade.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);
}

function RHTtemperatura() {
    var DataTemperatura = [];

    var RHTtemperatura = new CanvasJS.Chart("RHTtemperatura", {
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
        RHTtemperatura.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);
}

setInterval(function () {
    RHTabsoluto()
    RHTrelativo()
    RHTUmidade()
    RHTtemperatura()
}, 60000)