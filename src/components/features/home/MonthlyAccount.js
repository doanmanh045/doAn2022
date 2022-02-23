import React, { useEffect, useState } from 'react';
import API from '../../../lib/API';
import { Line } from 'react-chartjs-2';
export default function MonthlyAccount() {
    const [labels, setLabels] = useState();
    const [data, setData] = useState();
    const [colors, setColors] = useState();
    useEffect(() => {
        search()
    }, [])
    const search = async () => {
        let path = '/manager-service/dashboard/monthlyAccount?year=2022';
        let resp = await API.authorizedJSONGET(path);
        if (resp.ok) {
            let response = await resp.json();
            let respLabels = [];
            let respDatas = [];
            let respColors = [];
            for (let i = 0; i < response?.length; i++) {
                respLabels.push(response[i]?.date)
                respColors.push(response[i]?.color)
                respDatas.push(response[i]?.total)
            }
            setLabels(respLabels)
            setColors(respColors)
            setData(respDatas)
        }
    }
    const bars = {
        labels: labels,
        datasets: [
            {
                label: 'Cư dân vào theo tháng',
                data: data,
                backgroundColor: 'rgba(92,179,119,0.4)',
                borderColor:'rgb(92,179,119',
                fill: true,
                borderWidth: 2,
            },
        ],
    }
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ], 
        },
        maintainAspectRatio: false
    };

    return (
        <>
            {(labels && colors && data) &&
                <Line data={bars} options={options} />
            }
        </>
    )
}