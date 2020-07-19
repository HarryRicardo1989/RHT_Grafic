
const teste1 = []
const teste2 = []
const teste3 = []
const teste4 = []
teste = function (data) {
    for (var i = 0; i < data.PCD_data["PCD-001"].length; i++) {

        teste1.push([data.PCD_data["PCD-001"][i].timestamp * 1000, data.PCD_data["PCD-001"][i].Temperatura])
        teste2.push([data.PCD_data["PCD-001"][i].timestamp * 1000, data.PCD_data["PCD-001"][i].Pressao / 100])
        teste3.push([data.PCD_data["PCD-001"][i].timestamp * 1000, data.PCD_data["PCD-001"][i].Umidade])
        teste4.push([data.PCD_data["PCD-001"][i].timestamp * 1000, data.PCD_data["PCD-001"][i].Altitude])
    }
    console.log(teste1)
    console.log(teste2)
    console.log(teste3)
    console.log(teste4)
}
Highcharts.getJSON('/rhtdata',
    function (json) {
        teste(json)
        Highcharts.chart('container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Plataforma de Coleta de Dados'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: true
            },

            series: [{
                name: 'Temperatura',
                data: teste1
            }, {
                name: 'Pressao',
                data: teste2
            }, {
                name: 'Umidade',
                data: teste3
            }, {
                name: 'Altitude',
                data: teste4
            }]
        });
    }
)

