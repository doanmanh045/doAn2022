import React, { useEffect, useState } from 'react';
import API from '../../../lib/API';
import { Doughnut } from 'react-chartjs-2';
export default function TypeApartmentAccount() {
    const [labels, setLabels] = useState();
    const [data, setData] = useState();
    const [colors, setColors] = useState();
    useEffect(() => {
        search()
    }, [])
    const search = async () => {
        let path = '/manager-service/dashboard/typeApartmentAccount';
        let resp = await API.authorizedJSONGET(path);
        if (resp.ok) {
            let response = await resp.json();
            let respLabels = [];
            let respDatas = [];
            let respColors = [];
            for (let i = 0; i < response?.length; i++) {
                respLabels.push(response[i]?.type)
                respColors.push(response[i]?.color)
                respDatas.push(response[i]?.total)
            }
            setLabels(respLabels)
            setColors(respColors)
            setData(respDatas)

        }
    }
    const pies = {
        labels: labels,
        datasets: [
            {
                label: ' ',
                data: data,
                backgroundColor:['rgba(92,179,119,1)','rgba(234,196,120,1)','rgba(169,189,120,1)','rgba(172,189,120,1)','rgba(205,193,120,1)',] ,
            
                borderWidth: 1,

            },
        ],
    }


    return (
        <>

            {(labels && colors && data) &&
                
                <Doughnut data={pies}

                    options={{ 
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Cư dân ở loại căn hộ theo m2'
                            }
                        }, 
                        
                    }}
                />
            }
        </>
    )
}