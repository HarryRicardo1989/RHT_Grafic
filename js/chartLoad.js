const PCD_NAME = "PCD-001"

ultima_amostra = function (data) {
    let temperaturaAtual = data[0].Temperatura;
    let umidadeAtual = data[0].Umidade;
    let pressaoAtual = (data[0].Pressao / 100);
    let pressao_mmHg = pressaoAtual / 1.333;
    stringRHT = `Umidade: <span class="Verde">${umidadeAtual} %</span> Temperatura:<span class="Verde"> ${temperaturaAtual} ºC</span>`;
    stringPressao = `Pressão: <span class="Verde">${pressaoAtual} mmHg (${pressao_mmHg.toFixed(3)} mmHg)</span>`;
    let probabilidade = ''
    if (pressao_mmHg > 760 && umidadeAtual < 70) {
        probabilidade = `<span class="Verde">"Nao Chover"</span>`
    } else if (pressao_mmHg < 740 && umidadeAtual > 60) {
        probabilidade = `<span class="Azul">"Vai Chover"</span>`
    } else {
        probabilidade = `<span class="Aqua">"Tempo Nublado"</span>`
    }
    const RHTAtual = document.getElementById("RHT");
    const barometroAtual = document.getElementById("Pressao");
    const Probabilidade = document.getElementById("Probabilidade");
    RHTAtual.innerHTML = stringRHT;
    barometroAtual.innerHTML = stringPressao;
    Probabilidade.innerHTML = `Previsão de ${probabilidade} nas proximas Horas</span>`;
}


var PCD = function () {

    var DataTemperatura = [];
    var DataUmidade = [];
    var DataPressure = [];

    var RHTrelativo = new CanvasJS.Chart("RHTrelativo", {
        animationEnabled: false,
        zoomEnabled: true,
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
            verticalAlign: "top",  // top, center, bottom
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
            //interval: 30,
            //title: "Hora LOCAL",
            //titleFontSize: 15,
            //intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -25,
            labelMaxWidth: 100, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "DD/MMM HH:mm:ss"
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



    var Pressure = new CanvasJS.Chart("Pressure", {
        animationEnabled: false,
        zoomEnabled: true,
        backgroundColor: "#C0C0C0",
        title: {

            text: "Pressão Barométrica",
            //padding: 5
        },
        exportEnabled: true,
        legend: {
            fontSize: 15,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right 
            verticalAlign: "top",  // top, center, bottom
        },
        axisY: {
            title: "Pressão Barométrica (hPa)",
            //interval: 2,
            titleFontSize: 15,
            //includeZero: true
            includeZero: false
        },
        axisX: {
            //interval: 30,
            //title: "Hora LOCAL",
            //titleFontSize: 15,
            //intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -25,
            labelMaxWidth: 100, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "DD/MMM HH:mm:ss"
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: "Pressão (hPa)",
            color: "rgb(255,150,0)",
            yValueFormatString: "Pressão 0.00 hPa",
            xValueType: "dateTime",
            dataPoints: DataPressure
        }]
    });



    var update = function (json) {
        DataTemperatura.length = 0;
        DataUmidade.length = 0;
        DataPressure.length = 0;
        let data = json.PCD_data[PCD_NAME];
        ultima_amostra(data);
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
            DataPressure.push({
                x: datatimeUTC,
                y: (data[i].Pressao / 100), label: HMS

            });
        }
        RHTrelativo.render();
        Pressure.render();

    }
    //************auto-update*****************/
    callUpdate = function () {
        $.getJSON("/rhtdata", update);
    }
    callUpdate()
    setInterval(function () {
        callUpdate()

    }, 10000)
}