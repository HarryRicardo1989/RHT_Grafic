const PCD_NAME = "PCD-001"
const Pa_to_mmHg = 0.0075006157593005

ultima_amostra = function (data) {
    let temperaturaAtual = data[0].Temperatura;
    let umidadeAtual = data[0].Umidade;
    let pressaoAtual = (data[0].Pressao / 100);// convert Pa to hPa
    let pressao_mmHg = (data[0].Pressao * Pa_to_mmHg); //convert Pa to mmHg
    stringRHT = `Umidade: <span class="Verde">${umidadeAtual.toFixed(2)} %</span> Temperatura:<span class="Verde"> ${temperaturaAtual.toFixed(2)} ºC</span>`;
    stringPressao = `Pressão: <span class="Verde">${pressaoAtual} hPa (${pressao_mmHg.toFixed(3)} mmHg)</span>`;
    let probabilidade = ''
    if (pressao_mmHg > 760 && umidadeAtual < 70) {
        probabilidade = `<span class="Verde">"Não Chover"</span>`
    } else if (pressao_mmHg < 740 && umidadeAtual > 60) {
        probabilidade = `<span class="Azul">"Chuva"</span>`
    } else {
        probabilidade = `<span class="Aqua">"Tempo Nublado"</span>`
    }
    const RHTAtual = document.getElementById("RHT");
    const barometroAtual = document.getElementById("Pressao");
    const Probabilidade = document.getElementById("Probabilidade");
    RHTAtual.innerHTML = stringRHT;
    barometroAtual.innerHTML = stringPressao;
    Probabilidade.innerHTML = `Previsão de ${probabilidade} nas próximas Horas (Ribeirão Preto)</span>`;
}


var PCD = function () {

    var DataTemperatura = [];
    var DataUmidade = [];
    var DataPressure = [];
    var Data_mmHg = [];
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
            //labelAngle: -45,
            titleFontSize: 15,
            labelFontSize: 10,
            valueFormatString: "0.0",
            includeZero: false,
            //interval: 1,
            //includeZero: true,
        },
        axisY2: {
            title: "Umidade (%)",
            //labelAngle: -45,
            titleFontSize: 15,
            labelFontSize: 10,
            valueFormatString: "0.0",
            includeZero: false,
            //interval: 2,
            //maximum: 90,
            //includeZero: true,

        },
        axisX: {
            //interval: 30,
            //title: "Hora LOCAL",
            //titleFontSize: 15,
            //intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -45,
            labelFontSize: 12,
            labelMaxWidth: 50, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "DD/MMM HH:mm:ss"
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: "Temperatura (°C)",
            //lineColor: "rgba(255,0,0,1)",
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
            //lineColor: "rgba(0,0,255,1)",
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
            titleFontSize: 15,
            includeZero: false,
            labelFontSize: 10,
            valueFormatString: "0.0",
            //labelAngle: -45,
            //interval: 0.5,
            //includeZero: true
        },
        axisY2: {
            title: "Pressão Barométrica (mmHg)",
            titleFontSize: 15,
            includeZero: false,
            labelFontSize: 10,
            valueFormatString: "0.0",
            //labelAngle: -45,
            //interval: 0.5,
            //includeZero: true

        },
        axisX: {
            //interval: 30,
            //title: "Hora LOCAL",
            //titleFontSize: 15,
            //intervalType: "minute",
            valueFormatString: "DD/MMM/YY HH:mm:ss",
            labelAngle: -45,
            labelFontSize: 12,
            labelMaxWidth: 50, // change label width accordingly
            crosshair: { enabled: true },
            gridDashType: "dot",
            gridThickness: 1,
            valueFormatString: "DD/MMM HH:mm:ss"
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: "Pressão (hPa)",
            //lineColor: "rgba(255,150,50,0.3)",
            color: "rgba(255,150,0,1)",
            yValueFormatString: "Pressão 0.00 hPa",
            xValueType: "dateTime",
            dataPoints: DataPressure
        }, {
            type: "spline",
            showInLegend: true,
            name: "Pressão (mmHg)",
            //lineColor: "rgba(50,150,150,0.3)",
            color: "rgba(50,100,150,1)",
            axisYType: "secondary",
            yValueFormatString: "Pressão 0.00 mmHg",
            xValueType: "dateTime",
            dataPoints: Data_mmHg
        }]
    });



    var update = function (json) {
        DataTemperatura.length = 0;
        DataUmidade.length = 0;
        DataPressure.length = 0;
        Data_mmHg.length = 0;
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
            Data_mmHg.push({
                x: datatimeUTC,
                y: (data[i].Pressao * Pa_to_mmHg), label: HMS

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