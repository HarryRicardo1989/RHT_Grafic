const PCD_NAME = "PCD-001"
const Pa_to_mmHg = 0.0075006157593005
const lineThickness = 2
const lineType = "line"
const labelFontSize = 10
const backgroundColor = "#aaaaaa"
const GridColor = "#cococo"
const bacgroundGraph = "rgba(0,0,0,0.4)"
const fontColor = "black"
const opac1 = 1
const Xaxis = {
    //interval: 30,
    //title: "Hora LOCAL",
    //titleFontSize: 15,
    //intervalType: "minute",
    gridColor: GridColor,
    lineDashType: "dot",
    valueFormatString: "DD/MMM/YY HH:mm:ss",
    labelAngle: -45,
    labelFontSize: 12,
    labelMaxWidth: 50, // change label width accordingly
    labelFontColor: fontColor,
    crosshair: {
        enabled: true,
        gridDashType: "dot",

    },
    gridThickness: 1,
    gridDashType: "dot",
    valueFormatString: "DD/MMM HH:mm:ss"
}

ultima_amostra = function (data) {
    let ultimaAtualizacao = new Date(data[0].timestamp * 1000).toISOString().slice(11, 19).replace('T', ' ');
    let temperaturaAtual = data[0].Temperatura;
    let umidadeAtual = data[0].Umidade;
    let Altitude = data[0].Altitude;
    let pressao = (data[0].Pressao / 100);
    let sea_level_press = (data[0].Sea_level / 100);// convert Pa to hPa
    let pressao_mmHg = (data[0].Sea_level * Pa_to_mmHg); //convert Pa to mmHg
    let pontoDeOrvalho = data[0].Dew_point
    stringRHT = `Hora: <span class="Verde">${ultimaAtualizacao}</span> Umidade: <span class="Verde">${umidadeAtual.toFixed(2)} %</span> Temperatura:<span class="Verde"> ${temperaturaAtual.toFixed(2)} ºC</span>`;
    stringPressao1 = `Pressão ao Nível do Mar: <span class="Verde">${sea_level_press.toFixed(3)} hPa (${(pressao_mmHg).toFixed(3)} mmHg)</span>`;
    stringPressao2 = `Pressão Aferida: <span class="Verde">${pressao.toFixed(3)} hPa (${(pressao * Pa_to_mmHg * 100).toFixed(3)} mmHg) </span> Altimetro: <span class="Verde">${Altitude.toFixed(1)}m</span>`;
    stringDewPoint = `Temperatura de Ponto de Orvalho: <span class="Verde">${pontoDeOrvalho.toFixed(3)}ºC</span>`;
    let probabilidade = ''
    if (pressao_mmHg > 760.0 && umidadeAtual < 70) {
        probabilidade = `<span class="Verde">"Não Chover"</span>`
    } else if (pressao_mmHg < 750.0 && umidadeAtual > 60) {
        probabilidade = `<span class="Azul">"Chuva"</span>`
    } else {
        probabilidade = `<span class="Aqua">"Tempo Nublado"</span>`
    }
    const RHTAtual = document.getElementById("RHT");
    const Pressao_nivel_mar = document.getElementById("Pressao");
    const Pressao_Atual = document.getElementById("Pressao1");
    const ponto_orvalhoT = document.getElementById("Dew_point");
    const Probabilidade = document.getElementById("Probabilidade");
    RHTAtual.innerHTML = stringRHT;
    Pressao_nivel_mar.innerHTML = stringPressao1;
    Pressao_Atual.innerHTML = stringPressao2;
    ponto_orvalhoT.innerHTML = stringDewPoint;
    Probabilidade.innerHTML = `Previsão de ${probabilidade} nas próximas Horas (Ribeirão Preto)`;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = `${h}:${m}:${s}`;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
var PCD = function () {

    var DataTemperatura = [];
    var DataUmidade = [];
    var DataPressure = [];
    var Data_mmHg = [];
    var DataDew_point = [];
    var RHTrelativo = new CanvasJS.Chart("RHTrelativo",
        {
            animationEnabled: false,
            zoomEnabled: true,
            backgroundColor: backgroundColor,
            legend: {
                fontColor: fontColor,
                fontSize: 15,
                fontFamily: "tamoha",
                horizontalAlign: "center", // left, center ,right 
                verticalAlign: "top",  // top, center, bottom
            },
            exportEnabled: true,
            title: {
                fontColor: fontColor,
                text: "PCD-Temperatura/Umidade",
                //paddingLeft: 5
            },

            axisY: {
                title: "Temperatura (°C)",
                //labelAngle: -45,
                gridColor: GridColor,
                titleFontSize: 15,
                titleFontColor: fontColor,
                labelFontSize: labelFontSize,
                valueFormatString: "0.0",
                labelFontColor: fontColor,
                includeZero: false,
                crosshair: {
                    enabled: true, //disable here
                    snapToDataPoint: true,
                    valueFormatString: "##.0",
                    lineThickness: lineThickness,

                },
                stripLines: [
                    {
                        startValue: 26,
                        endValue: 28,
                        color: "rgba(255,0,0,0.00)",
                        label: "Calor",
                        labelFontColor: "rgba(255,50,50,0.5)",
                        labelAlign: "near",
                        labelBackgroundColor: "rgba(0,0,0,0.01)",
                    },
                    {
                        startValue: 20,
                        endValue: 22,
                        color: "rgba(0,0,255,0.00)",
                        label: "Frio",
                        labelFontColor: "rgba(0,180,255,0.3)",
                        labelAlign: "near",
                        labelBackgroundColor: "rgba(0,0,0,0.01)",
                    },
                    {
                        startValue: 22.5,
                        endValue: 26.5,
                        color: "rgba(0,255,0,0.00)",
                        label: "Conforto NBR",
                        labelFontColor: "rgba(0,255,100,0.3)",
                        labelAlign: "near",
                        labelBackgroundColor: "rgba(0,0,0,0.01)",
                    },
                    {
                        startValue: 26,
                        endValue: 300,
                        color: "rgba(255,0,0,0.07)",
                    },
                    {
                        startValue: 22,
                        endValue: 26,
                        color: "rgba(0,255,0,0.05)"
                    },
                    {
                        startValue: -40,
                        endValue: 22,
                        color: "rgba(0,0,255,0.07)"
                    },

                    {
                        startValue: 2000,
                        endValue: 0,
                        color: bacgroundGraph
                    },
                ]
                //interval: 1,
                //includeZero: true,
            },
            axisY2: {
                title: "Umidade (%)",
                //labelAngle: -45,
                titleFontSize: 15,
                labelFontSize: labelFontSize,
                //reversed: true,
                titleFontColor: fontColor,
                labelFontColor: fontColor,
                valueFormatString: "0.0",
                includeZero: false,
                crosshair: {
                    enabled: true, //disable here
                    snapToDataPoint: true,
                    valueFormatString: "##.0",
                    lineThickness: lineThickness,
                },
                //interval: 2,
                //maximum: 90,
                //includeZero: true,


            },
            axisX: Xaxis,
            data: [{
                type: lineType,
                lineThickness: lineThickness,
                showInLegend: true,
                markerType: "none",
                name: "Temperatura (°C)",
                //lineColor: "rgba(255,0,0,1)",
                color: "rgba(255,0,0,1)",
                yValueFormatString: "Temperatura 00.000°C",
                xValueType: "dateTime",
                dataPoints: DataTemperatura
            },
            {
                type: lineType,
                showInLegend: true,
                markerType: "none",
                lineThickness: lineThickness,
                name: "Umidade (%)",
                axisYType: "secondary",
                //lineColor: "rgba(0,0,255,1)",
                color: "rgba(0,170,255,1)",
                yValueFormatString: "Umidade #,##%",
                xValueType: "dateTime",
                dataPoints: DataUmidade
            }
            ]
        });


    var Pressure = new CanvasJS.Chart("Pressure", {
        animationEnabled: false,
        zoomEnabled: true,
        backgroundColor: backgroundColor,
        title: {
            fontColor: fontColor,

            text: "Pressão Barométrica",
        },
        exportEnabled: true,
        legend: {
            fontColor: fontColor,
            fontSize: 15,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right 
            verticalAlign: "top",  // top, center, bottom
        },
        axisY: {
            title: "Pressão Barométrica (hPa)",
            gridColor: GridColor,
            titleFontSize: 15,
            titleFontColor: fontColor,
            labelFontColor: fontColor,
            includeZero: false,
            labelFontSize: labelFontSize,
            valueFormatString: "0.0",
            crosshair: {
                enabled: true, //disable here
                snapToDataPoint: true,
                valueFormatString: "##.0"
            },
            //labelAngle: -45,
            //interval: 0.5,
            //includeZero: true
        },
        axisY2: {
            title: "Pressão Barométrica (mmHg)",
            titleFontSize: 15,
            gridColor: GridColor,
            //reversed: true,
            titleFontColor: fontColor,
            labelFontColor: fontColor,
            includeZero: false,
            labelFontSize: labelFontSize,
            valueFormatString: "0.0",
            crosshair: {
                enabled: true, //disable here
                snapToDataPoint: true,
                valueFormatString: "##.0"
            },
            stripLines: [
                {
                    startValue: 2000,
                    endValue: 0,
                    color: bacgroundGraph
                },]
            //labelAngle: -45,
            //interval: 0.5,
            //includeZero: true

        },
        axisX: Xaxis,
        data: [{
            type: lineType,
            showInLegend: true,
            markerType: "none",
            lineThickness: lineThickness,
            name: "Pressão (hPa)",
            //lineColor: "rgba(255,150,50,0.3)",
            color: "rgb(255,150,0)",
            yValueFormatString: "Pressão 0.00 hPa",
            xValueType: "dateTime",
            dataPoints: DataPressure
        }, {
            type: lineType,
            showInLegend: true,
            markerType: "none",
            lineThickness: lineThickness,
            name: "Pressão (mmHg)",
            //lineColor: "rgba(50,150,150,0.3)",
            color: "rgb(0,255,0)",
            axisYType: "secondary",
            yValueFormatString: "Pressão 0.00 mmHg",
            xValueType: "dateTime",
            dataPoints: Data_mmHg
        }]
    });

    var DewPoint = new CanvasJS.Chart("DewPoint", {
        animationEnabled: false,
        zoomEnabled: true,
        backgroundColor: backgroundColor,
        title: {

            fontColor: fontColor,
            text: "Temperatura de Ponto de Orvalho",
        },
        exportEnabled: true,
        legend: {
            fontSize: 15,
            fontColor: fontColor,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right 
            verticalAlign: "top",  // top, center, bottom
        },
        axisY: {
            title: "Temperatura de Ponto de Orvalho (ºC)",
            titleFontSize: 15,
            gridColor: GridColor,
            includeZero: false,
            titleFontColor: fontColor,
            labelFontColor: fontColor,
            labelFontSize: labelFontSize,
            fontColor: fontColor,
            valueFormatString: "0.0",
            crosshair: {
                enabled: true, //disable here
                snapToDataPoint: true,
                valueFormatString: "##.0"
            },
            stripLines: [
                {
                    startValue: 2000,
                    endValue: 0,
                    color: bacgroundGraph
                },]
            //labelAngle: -45,
            //interval: 0.5,
            //includeZero: true
        },


        axisX: Xaxis,
        data: [{
            type: lineType,
            lineThickness: lineThickness,
            markerType: "none",
            showInLegend: true,
            name: "Ponto de Orvalho (°C)",
            //lineColor: "rgba(255,0,0,1)",
            color: "rgba(255,255,0,1)",
            yValueFormatString: "Ponto de Orvalho 00.000°C",
            xValueType: "dateTime",
            dataPoints: DataDew_point
        },]
    });


    var update = function (json) {
        DataTemperatura.length = 0;
        DataUmidade.length = 0;
        DataPressure.length = 0;
        Data_mmHg.length = 0;
        DataDew_point.length = 0;
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
            if (data[i].Dew_point > 0) {
                DataDew_point.push({
                    x: datatimeUTC,
                    y: (data[i].Dew_point), label: HMS

                });
            }

            DataPressure.push({
                x: datatimeUTC,
                y: (data[i].Sea_level / 100), label: HMS

            });
            Data_mmHg.push({
                x: datatimeUTC,
                y: (data[i].Sea_level * Pa_to_mmHg), label: HMS

            });



        }
        RHTrelativo.render();
        Pressure.render();
        DewPoint.render();

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
