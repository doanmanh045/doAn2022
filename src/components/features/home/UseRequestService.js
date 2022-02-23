import React, { useEffect, useState } from 'react';
import API from '../../../lib/API';
import { Bar } from 'react-chartjs-2';
export default function UseRequestService() {
    const [labels, setLabels] = useState();
    const [data, setData] = useState();
    const [colors, setColors] = useState();
    useEffect(() => {
        search()
    }, [])
    const search = async () => {
        let path = '/manager-service/dashboard/numberOfUseServiceRequest';
        let resp = await API.authorizedJSONGET(path);
        if (resp.ok) {
            let response = await resp.json();
            let respLabels = [];
            let respDatas = [];
            let respColors = [];
            for (let i = 0; i < response?.length; i++) {
                respLabels.push(response[i]?.serviceName)
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
                label: 'Thống kê số lần sử dụng của từng dịch vụ',
                data: data,
                backgroundColor: 'rgba(92,179,119,1)',
                borderColor:'rgba(92,179,119,1)',
                borderWidth: 1,
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
        indexAxis: 'y',
        maintainAspectRatio: false
    };

    return (
        <>
            {(labels && colors && data) &&
                <Bar data={bars} options={options} />
            }
        </>
    )
}