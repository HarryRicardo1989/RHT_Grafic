const PCD_NAME = "PCD-001"

function RHTrelativo() {

    var DataTemperatura = [];
    var DataUmidade = [];

    var RHTrelativo = new CanvasJS.Chart("RHTrelativo", {
        animationEnabled: false,
        zoomEnabled: false,
        backgroundColor: "#C0C0C0",
        title: {

            text: "PCD-Temperatura/Umidade",
            //padding: 5
        },
        exportEnabled: true,
        legend: {
            fontSize: 15,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right 
            verticalAlign: "bottom",  // top, center, bottom
        },
        axisY: {
            title: "Temperatura (°C)",
            //interval: 1,
            titleFontSize: 15,
            //includeZero: true
            includeZero: false
        },
        axisY2: {
            title: "Umidade (%)",
            //interval: 2,
            //maximum: 90,
            titleFontSize: 15,
            //includeZero: true
            includeZero: false

        },
        axisX: {
            interval: 30,
            //title: "Hora LOCAL",
            //titleFontSize: 15,
            intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm",
            labelAngle: -25,
            labelMaxWidth: 100, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "DD/MMM HH:mm"
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: "Temperatura (°C)",
            color: "rgba(255,0,0,1)",
            yValueFormatString: "Temperatura 00.00°C",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        },
        {
            type: "spline",
            showInLegend: true,
            name: "Umidade (%)",
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
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);

}


function Pressure() {
    var DataPressure = [];

    var Pressure = new CanvasJS.Chart("Pressure", {
        animationEnabled: false,
        zoomEnabled: false,
        backgroundColor: "#C0C0C0",
        title: {

            text: "PCD-Pressao Barometrica",
            //padding: 5
        },
        exportEnabled: true,
        legend: {
            fontSize: 15,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right 
            verticalAlign: "bottom",  // top, center, bottom
        },
        axisY: {
            title: "Pressao Barometrica (hPa)",
            //interval: 2,
            titleFontSize: 15,
            //includeZero: true
            includeZero: false
        },
        axisX: {
            interval: 30,
            //title: "Hora LOCAL",
            //titleFontSize: 15,
            intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm",
            labelAngle: -25,
            labelMaxWidth: 100, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "DD/MMM HH:mm"
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: "Pressao (hPa)",
            color: "rgba(0,0,255,0.7)",
            yValueFormatString: "Pressão 0.00 hPa",
            xValueType: "dateTime",
            dataPoints: DataPressure
        }]
    });

    function addData(json) {
        let data = json["PCD_data"][PCD_NAME];

        for (var i = 0; i < data.length; i++) {
            let localtimestamp = (data[i].timestamp) * 1000
            let datatimeUTC = ((localtimestamp) + ((10800) * 1000))
            let HMS = new Date(localtimestamp).toISOString().slice(0, 19).replace('T', ' ');
            if (data[i].Pressao != 0) {
                DataPressure.push({
                    x: datatimeUTC,
                    y: (data[i].Pressao / 100), label: HMS

                });
            }
        }
        Pressure.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);
}
setInterval(function () {
    RHTabsoluto()
    RHTrelativo()
    RHTUmidade()
    Pressure()
    RHTtemperatura()
    Pressure()
}, 60000)

/* function RHTabsoluto() {

    var DataTemperatura = [];
    var DataUmidade = [];

    var RHTabsoluto = new CanvasJS.Chart("RHTabsoluto", {
        animationEnabled: false,
        zoomEnabled: false,
        backgroundColor: "#C0C0C0",
        title: {

            text: "PCD-Temperatura/Umidade",
            //padding: 5
        },
        exportEnabled: true,
        legend: {
            fontSize: 15,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right
            verticalAlign: "bottom",  // top, center, bottom
        },

        axisY: {
            //maximum: 90,
            interval: 5,
            title: "Temperatura/Umidade",
            titleFontSize: 15,
            includeZero: true
            //includeZero: false
        },

        axisX: {
            interval: 30,
            title: "Hora LOCAL",
            titleFontSize: 15,
            intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm",
            labelAngle: -25,
            labelMaxWidth: 100, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "HH:mm"
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: "Temperatura",
            color: "rgba(255,0,0,1)",
            yValueFormatString: "Temperatura 00.00°C",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        },
        {
            //axisYType: "secondary",
            type: "spline",
            showInLegend: true,
            name: "Umidade",
            color: "rgba(0,0,255,1)",
            yValueFormatString: "Umidade #,##%",
            xValueType: "dateTime",
            dataPoints: DataUmidade
        }],
    });

    function addData(json) {
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
        RHTabsoluto.render();
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
        backgroundColor: "#C0C0C0",
        title: {

            text: "PCD-Umidade",
            //padding: 5
        },
        exportEnabled: true,
        legend: {
            fontSize: 15,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right
            verticalAlign: "bottom",  // top, center, bottom
        },
        axisY: {
            title: "Umidade",
            interval: 2,
            titleFontSize: 15,
            //includeZero: true
            includeZero: false
        },
        axisX: {
            interval: 30,
            title: "Hora LOCAL",
            titleFontSize: 15,
            intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm",
            labelAngle: -25,
            labelMaxWidth: 100, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "HH:mm"
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: "Umidade",
            color: "rgba(0,0,255,0.7)",
            yValueFormatString: "Umidade #,##%",
            xValueType: "dateTime",
            dataPoints: DataUmidade
        }]
    });

    function addData(json) {
        let data = json["PCD_data"][PCD_NAME];

        for (var i = 0; i < data.length; i++) {
            let localtimestamp = (data[i].timestamp) * 1000
            let datatimeUTC = ((localtimestamp) + ((10800) * 1000))
            let HMS = new Date(localtimestamp).toISOString().slice(0, 19).replace('T', ' ');
            DataUmidade.push({
                x: datatimeUTC,
                y: data[i].Umidade, label: HMS

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
        backgroundColor: "#C0C0C0",
        title: {

            text: "PCD-Temperatura",
        },
        exportEnabled: true,
        legend: {
            fontSize: 15,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right
            verticalAlign: "bottom",  // top, center, bottom


        },
        axisY: {
            title: "Temperatura",
            interval: 1,
            titleFontSize: 15,
            //includeZero: true
            includeZero: false
        },
        axisX: {
            interval: 30,
            title: "Hora LOCAL",
            titleFontSize: 15,
            intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm",
            labelAngle: -25,
            labelMaxWidth: 100, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "HH:mm"
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: "Temperatura",
            color: "rgba(255,0,0,1)",
            yValueFormatString: "Temperatura 00.00°C",
            xValueType: "dateTime",
            dataPoints: DataTemperatura
        }]
    });

    function addData(json) {
        let data = json["PCD_data"][PCD_NAME];

        for (var i = 0; i < data.length; i++) {
            let localtimestamp = (data[i].timestamp) * 1000
            let datatimeUTC = ((localtimestamp) + ((10800) * 1000))
            let HMS = new Date(localtimestamp).toISOString().slice(0, 19).replace('T', ' ');
            DataTemperatura.push({
                x: datatimeUTC,
                y: data[i].Temperatura, label: HMS
            });
        }
        RHTtemperatura.render();
    }
    //addData(dadosTeste())
    $.getJSON("/rhtdata", addData);
}
*/