
var botao = 'horas';
var tempo = 24;
let tempoHora = 24
let tempoDia = 1
const PCD_NAME = "PCD-001";
const Pa_to_mmHg = 0.0075006157593005;
const lineThickness = 2;
const lineType = "line";
const labelFontSize = 10;
const backgroundColor = "#aaaaaa";
const GridColor = "#cococo";
const bacgroundGraph = "rgba(0,0,0,0.35)";
const fontColor = "black";
const opac1 = 1;
const markerType = "circle";
const toolTipConfig = {
    borderColor: "black",
    shared: true,
    cornerRadius: 7,
    fontSize: 16,
    backgroundColor: "#555555"
}
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



ultima_amostra = function (data, min_max) {
    let ultimaAtualizacao = new Date((data[0].timestamp - (3600 * 3)) * 1000).toISOString().slice(11, 19).replace('T', ' ');
    let dataAtualizacao = new Date((data[0].timestamp - (3600 * 3)) * 1000).toISOString().slice(0, 10).replace('T', ' ');
    let dataAtualizacaoBr = `${dataAtualizacao.slice(8, 10)}-${dataAtualizacao.slice(5, 7)}-${dataAtualizacao.slice(0, 4)}`
    let temperaturaAtual = data[0].temperatura_ar;
    let umidadeAtual = data[0].umidade;
    let Altitude = data[0].altitude;
    let pressao = (data[0].pressao_local / 100);
    let sea_level_press = (data[0].pressao_nivel_mar / 100);// convert Pa to hPa
    let pressao_mmHg = (data[0].pressao_nivel_mar * Pa_to_mmHg); //convert Pa to mmHg
    let pontoDeOrvalho = data[0].temperatura_orvalho
    let VelocidadeVento = data[0].wind_speed * 3.6
    let tvocppm = data[0].tvoc
    let co2ppm = data[0].co2
    let chuvaStatus = data[0].chuva_status == 1 ? "SIM" : "NÃO"
    let min_temperatura= min_max[0].min_temperatura.toFixed(3)
    let max_temperatura= min_max[0].max_temperatura.toFixed(3)
    let min_umidade= min_max[0].min_umidade.toFixed(3)
    let max_umidade= min_max[0].max_umidade.toFixed(3)
    let min_pressao_local = (min_max[0].min_pressao_local / 100).toFixed(3)
    let max_pressao_local = (min_max[0].max_pressao_local / 100).toFixed(3)
    let max_wind_speed =( min_max[0].max_wind_speed * 3.6).toFixed(3)
    stringHora = `Data da Coleta <span class="Verde">${dataAtualizacaoBr}</span> Hora da Coleta: <span class="Verde">${ultimaAtualizacao}</span>`
    stringTemp = `Temperatura: <span class="Verde">${temperaturaAtual.toFixed(2)} ºC</span> Minima:<span class="Verde"> ${min_temperatura} ºC</span> Maxima:<span class="Verde"> ${max_temperatura} ºC</span>`;
    stringUmid = `Umidade: <span class="Verde">${umidadeAtual.toFixed(2)} %</span> Minima:<span class="Verde"> ${min_umidade} %</span> Maxima:<span class="Verde"> ${max_umidade} %</span>`;
    stringPressao1 = `Pressão ao Nível do Mar: <span class="Verde">${sea_level_press.toFixed(3)} hPa (${(pressao_mmHg).toFixed(3)} mmHg)</span>`;
    
    stringPressao2 = `Pressão Aferida: <span class="Verde">${pressao.toFixed(3)} hPa (${(pressao * Pa_to_mmHg * 100).toFixed(3)} mmHg) </span>`;
    stringPressao3 = `Minima: <span class="Verde">${min_pressao_local} hPa (${(min_pressao_local * Pa_to_mmHg * 100).toFixed(3)} mmHg) </span> Maxima: <span class="Verde">${max_pressao_local} hPa (${(max_pressao_local * Pa_to_mmHg * 100).toFixed(3)} mmHg) </span>`;
    
    stringDewPoint = `Temperatura de Ponto de Orvalho: <span class="Verde">${pontoDeOrvalho.toFixed(3)}ºC</span>`;
    stringWindSpeed = `Velocidade do Vento: <span class="Verde">${VelocidadeVento.toFixed(3)}km/h</span> Maxima: <span class="Verde">${max_wind_speed}km/h</span>`;
    stringCO2Tvoc = `CO2: <span class="Verde">${co2ppm} PPM </span> TVOC: <span class="Verde">${tvocppm} PPM</span>`;
    //stringChuvaStatus = `Está chovendo?: <span class="Verde">${chuvaStatus}</span>`;

    const HoraColeta = document.getElementById("horacoleta");
    const TempAtual = document.getElementById("Temp");
    const UmidAtual = document.getElementById("Umid");
    const Pressao_nivel_mar = document.getElementById("Pressao");
    const Pressao_Atual = document.getElementById("Pressao1");
    const Pressao_minima = document.getElementById("Pressao2");
    const ponto_orvalhoT = document.getElementById("Dew_point");
    const VelociadeVento = document.getElementById("Wind_speed");
    const CO2TVOC = document.getElementById("airQuality");
    //const statusChuva = document.getElementById("statusChuva");
    HoraColeta.innerHTML = stringHora;
    TempAtual.innerHTML = stringTemp;
    UmidAtual.innerHTML = stringUmid;
    Pressao_nivel_mar.innerHTML = stringPressao1;
    Pressao_Atual.innerHTML = stringPressao2;
    Pressao_minima.innerHTML = stringPressao3;
    ponto_orvalhoT.innerHTML = stringDewPoint;
    VelociadeVento.innerHTML = stringWindSpeed;
    CO2TVOC.innerHTML = stringCO2Tvoc;
    //statusChuva.innerHTML = stringChuvaStatus;


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
    var DataWindSpeed = [];
    var DataTVOC = [];
    var DataCO2 = [];
    var DataChuvaStatus = [];
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
                text: "Temperatura/Umidade",
                //paddingLeft: 5
            },
            toolTip: toolTipConfig,

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
                        endValue: -100,
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
                markerType: markerType,
                name: "Temperatura (°C)",
                //lineColor: "rgba(255,0,0,1)",
                color: "rgba(255,0,0,1)",
                yValueFormatString: "00.000°C",
                xValueType: "dateTime",
                dataPoints: DataTemperatura
            },
            {
                type: lineType,
                showInLegend: true,
                markerType: markerType,
                lineThickness: lineThickness,
                name: "Umidade (%)",
                axisYType: "secondary",
                //lineColor: "rgba(0,0,255,1)",
                color: "rgba(0,170,255,1)",
                yValueFormatString: "#,##%",
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
        toolTip: toolTipConfig,
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
                    endValue: -100,
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
            markerType: markerType,
            lineThickness: lineThickness,
            name: "Pressão (hPa)",
            //lineColor: "rgba(255,150,50,0.3)",
            color: "rgb(255,150,0)",
            yValueFormatString: "0.00 hPa",
            xValueType: "dateTime",
            dataPoints: DataPressure
        }, {
            type: lineType,
            showInLegend: true,
            markerType: markerType,
            lineThickness: lineThickness,
            name: "Pressão (mmHg)",
            //lineColor: "rgba(50,150,150,0.3)",
            color: "rgb(0,255,0)",
            axisYType: "secondary",
            yValueFormatString: "0.00 mmHg",
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
        toolTip: toolTipConfig,
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
                    endValue: -100,
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
            markerType: markerType,
            showInLegend: true,
            name: "Ponto de Orvalho (°C)",
            //lineColor: "rgba(255,0,0,1)",
            color: "rgba(255,255,0,1)",
            yValueFormatString: "00.000°C",
            xValueType: "dateTime",
            dataPoints: DataDew_point
        },]
    });
    var WindSpeed = new CanvasJS.Chart("WindSpeed", {
        animationEnabled: false,
        zoomEnabled: true,
        backgroundColor: backgroundColor,
        title: {

            fontColor: fontColor,
            text: "Velocidade do Vento",
        },
        toolTip: toolTipConfig,
        exportEnabled: true,
        legend: {
            fontSize: 15,
            fontColor: fontColor,
            fontFamily: "tamoha",
            horizontalAlign: "center", // left, center ,right 
            verticalAlign: "top",  // top, center, bottom
        },
        axisY: {
            title: "Velocidade do Vento (km/h)",
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
                    endValue: -100,
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
            markerType: markerType,
            showInLegend: true,
            name: "Velocidade do Vento (km/h)",
            //lineColor: "rgba(255,0,0,1)",
            color: "rgba(255,0,255,1)",
            yValueFormatString: "0.0000 km/h",
            xValueType: "dateTime",
            dataPoints: DataWindSpeed
        },]
    });
    var AirQuality = new CanvasJS.Chart("AirQuality",
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
                text: "CO2/TVOC",
                //paddingLeft: 5
            },
            toolTip: toolTipConfig,

            axisY: {
                title: "CO2 (PPM)",
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
                        startValue: 200000,
                        endValue: -100,
                        color: bacgroundGraph
                    },
                ]
                //interval: 1,
                //includeZero: true,
            },
            axisY2: {
                title: "TVOC (ppm)",
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
                markerType: markerType,
                name: "CO2 (PPM)",
                //lineColor: "rgba(255,0,0,1)",
                color: "rgba(127,127,255,1)",
                yValueFormatString: "000 PPM",
                xValueType: "dateTime",
                dataPoints: DataCO2
            },
            {
                type: lineType,
                showInLegend: true,
                markerType: markerType,
                lineThickness: lineThickness,
                name: "TVOC (ppm)",
                axisYType: "secondary",
                //lineColor: "rgba(0,0,255,1)",
                color: "rgba(50,0,127,1)",
                yValueFormatString: "000 PPM",
                xValueType: "dateTime",
                dataPoints: DataTVOC
            }
            ]
        });
    var Chuva = new CanvasJS.Chart("Chuva",
        {
            animationEnabled: false,
            zoomEnabled: true,
            backgroundColor: backgroundColor,
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries,
                fontColor: fontColor,
                fontSize: 15,
                fontFamily: "tamoha",
                horizontalAlign: "center", // left, center ,right 
                verticalAlign: "top",  // top, center, bottom
            },
            toolTip: toolTipConfig,
            exportEnabled: true,
            title: {
                fontColor: fontColor,
                text: "Relação Umidade/Pressão/Chuva ",
                //paddingLeft: 5
            },
            toolTip: toolTipConfig,
            axisY: [{
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
                suffix: "%"
            },
            {
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
                /* stripLines: [
                    {
                        startValue: 2000,
                        endValue: -100,
                        color: "rgba(0,0,0,0.1)"
                    },] */
                //labelAngle: -45,
                //interval: 0.5,
                //includeZero: true
            }],
            axisY2: {
                title: "Chuva Status",
                titleFontSize: 15,
                gridColor: GridColor,
                includeZero: false,
                titleFontColor: fontColor,
                labelFontColor: fontColor,
                labelFontSize: labelFontSize,
                fontColor: fontColor,
                valueFormatString: "0",
                crosshair: {
                    enabled: true, //disable here
                    snapToDataPoint: true,
                    valueFormatString: "##.0"
                },
                stripLines: [
                    {
                        startValue: 2000,
                        endValue: -100,
                        color: bacgroundGraph
                    },],
                includeZero: true,
                //labelAngle: -45,
                //interval: 0.5,
            },
            toolTip: {
                shared: true
            },
            axisX: Xaxis,
            data: [
                {
                    type: lineType,
                    showInLegend: true,
                    markerType: markerType,
                    lineThickness: lineThickness,
                    name: "Pressão (mmHg)",
                    //lineColor: "rgba(50,150,150,0.3)",
                    color: "rgb(0,255,0)",
                    yValueFormatString: "0.00 mmHg",
                    xValueType: "dateTime",
                    axisYIndex: 1,
                    dataPoints: Data_mmHg
                }, {
                    type: lineType,
                    showInLegend: true,
                    markerType: markerType,
                    lineThickness: lineThickness,
                    name: "Umidade (%)",
                    //lineColor: "rgba(0,0,255,1)",
                    color: "rgba(0,170,255,1)",
                    yValueFormatString: "#,##%",
                    xValueType: "dateTime",
                    axisYIndex: 0,
                    dataPoints: DataUmidade
                },
                {
                    type: "area",
                    lineThickness: lineThickness,
                    markerType: markerType,
                    showInLegend: true,
                    name: "Chuva Status ",
                    //lineColor: "rgba(255,0,0,1)",
                    color: "rgba(255,255,255,0.2)",
                    yValueFormatString: "0",
                    xValueType: "dateTime",
                    axisYType: "secondary",
                    dataPoints: DataChuvaStatus,
                }]

        });
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
    var update = function (json) {
        DataTemperatura.length = 0;
        DataUmidade.length = 0;
        DataPressure.length = 0;
        Data_mmHg.length = 0;
        DataDew_point.length = 0;
        DataWindSpeed.length = 0;
        DataCO2.length = 0;
        DataTVOC.length = 0;
        DataChuvaStatus.length = 0;

        let data = json.PCD_data[PCD_NAME];
        let min_max = json.PCD_data["PCD-001_min_max"];
        ultima_amostra(data, min_max);
        for (var i = 0; i < data.length; i++) {
            let localtimestamp = (data[i].timestamp - (3600 * 3)) * 1000
            let datatimeUTC = ((localtimestamp) + ((10800) * 1000))
            let HMS = new Date(localtimestamp).toISOString().slice(0, 19).replace('T', ' ');
            DataTemperatura.push({
                x: datatimeUTC,
                y: data[i].temperatura_ar, label: HMS
            });
            DataUmidade.push({
                x: datatimeUTC,
                y: data[i].umidade, label: HMS

            });

            DataDew_point.push({
                x: datatimeUTC,
                y: (data[i].temperatura_orvalho), label: HMS

            });

            DataPressure.push({
                x: datatimeUTC,
                y: (data[i].pressao_nivel_mar / 100), label: HMS

            });
            Data_mmHg.push({
                x: datatimeUTC,
                y: (data[i].pressao_nivel_mar * Pa_to_mmHg), label: HMS

            });
            DataWindSpeed.push({
                x: datatimeUTC,
                y: (data[i].wind_speed * 3.6), label: HMS

            });
            DataCO2.push({
                x: datatimeUTC,
                y: (data[i].co2), label: HMS

            });
            DataTVOC.push({
                x: datatimeUTC,
                y: (data[i].tvoc), label: HMS

            });
            DataChuvaStatus.push({
                x: datatimeUTC,
                y: (data[i].chuva_status), label: HMS

            });



        }
        document.body.style.cursor = "default"
        RHTrelativo.render();
        Pressure.render();
        DewPoint.render();
        WindSpeed.render();
        AirQuality.render();
        Chuva.render();


    }
    //************auto-update*****************/
    callUpdate = function () {
        $.getJSON(`/api/select/${botao}/${tempo}`, update);

    }
    callUpdate()

    setInterval(function () {
        callUpdate()

    }, 5000)

    botaoSelect = function () {

        if (botao === 'horas') {
            seletor = 'Full data';
            document.querySelectorAll('.DiaSelect').forEach(e => e.style.visibility = "hidden");
            document.querySelectorAll('.HorasMedia').forEach(e => e.style.visibility = "hidden");
            document.querySelectorAll('.intraHour').forEach(e => e.style.visibility = "hidden");
            document.querySelectorAll('.intraDay').forEach(e => e.style.visibility = "visible");

        }
        else if (botao === 'horasmedia') {
            seletor = 'Media/Hora';
            document.querySelectorAll('.DiaSelect').forEach(e => e.style.visibility = "visible");
            document.querySelectorAll('.HorasMedia').forEach(e => e.style.visibility = "visible");
            document.querySelectorAll('.intraDay').forEach(e => e.style.visibility = "visible");
            document.querySelectorAll('.intraHour').forEach(e => e.style.visibility = "hidden");

        } else {
            seletor = 'Media/Dia';
            document.querySelectorAll('.DiaSelect').forEach(e => e.style.visibility = "visible");
            document.querySelectorAll('.HorasMedia').forEach(e => e.style.visibility = "visible");
            document.querySelectorAll('.intraDay').forEach(e => e.style.visibility = "hidden");
            document.querySelectorAll('.intraHour').forEach(e => e.style.visibility = "hidden");

        }


        if (botao === "dias") {

            tempo = tempoDia;
        }
        else if (botao === 'horas' || botao === 'horasmedia') {
            tempo = tempoHora;
        }


        callUpdate();
    }

    tamanhoGrafico = function (horas) {
        tempoHora = parseFloat(horas);
        tempoDia = tempoHora / 24;
        //console.log(tempoDia, tempoHora)

        document.body.style.cursor = "wait"
        botaoSelect();
    }

    periodoSelect = function (periodo) {
        botao = periodo;
        document.body.style.cursor = "wait"
        botaoSelect();

    }

    botaoSelect()


}