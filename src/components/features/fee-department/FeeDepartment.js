import React, { useEffect, useState } from 'react';
import ModalSend from './ModalSend';
import Service from './Service';
import SignUpService from './SignUpService';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import Total from './Total';
import API from '../../../lib/API';
import style from './feedepartment.module.css'

export default function FeeDepartment() {
    const [isSign, setIsSign] = useState("total")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState();
    const [activePage, setActivePage] = useState(1);
    const handleActivePage = (value) => {
        setActivePage(value)
    }
    useEffect(() => {
        search()
    }, []);
    useEffect(() => {
        search()
    }, [isSign,activePage])
    console.log(moment(date).format("MM/YYYY"))
    const search = async () => {
        if (isSign == "service") {
            let path = `/admin/fee-apartment/service?month=${moment(date).format("MM/YYYY")}&pageNo=${activePage - 1}`;
            let resp = await API.authorizedJSONGET(path);
            if (resp.ok) {
                let response = await resp.json();
                setData(response)
            }
        } else if (isSign == "request") {
            let path = `/admin/fee-apartment/total-card?month=${moment(date).format("MM/YYYY")}&pageNo=${activePage - 1}`;
            let resp = await API.authorizedJSONGET(path);
            if (resp.ok) {
                let response = await resp.json();
                setData(response)
            }
        } else if (isSign == "total") {
            let path = `/admin/fee-apartment/total?month=${moment(date).format("MM/YYYY")}&pageNo=${activePage - 1}`;
            let resp = await API.authorizedJSONGET(path);
            if (resp.ok) {
                let response = await resp.json();
                setData(response)
            }
        }
    }

    return (
        <>
            <div className={style.detail}>
            <button className={style.btnSend} onClick={handleShow}>
                            G???i th??ng b??o
                        </button>
                    <div className="send" className={style.wrapSearch}>
                            <h6>Th??ng</h6>
                            <div className="input_datetime wrapp_header--item" className={style.ipSearch}>
                                <Datetime className="calen" dateFormat="MM/YYYY" timeFormat={false}
                                    value={date}
                                    onChange={val => setDate(val)}
                                />
                            </div>
   
                         
                        <button onClick={() => {
                            search()
                            setActivePage(1)
                        }} className={style.btnSearch}><svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                        </button>

                        
                    </div>
  
                      
                    <div>
                        <button className={style.btnSw} onClick={() => setIsSign("service")} style={{
                            color:(isSign == "service" ? 'white' : 'var(--golden)'),
                            backgroundColor: (isSign == "service" ? '#5cb377' : 'transparent')
                        }}>D???ch v??? ?????t ch???</button>
                        <button className={style.btnSw}  onClick={() => setIsSign("request")}
                            style={{
                                color:(isSign == "request" ? 'white' : 'var(--golden)'),
                                backgroundColor: (isSign == "request" ? '#5cb377' : 'transparent')
                            }}
                        >????ng k?? d???ch v???</button>
                        <button className={style.btnSw}  onClick={() => setIsSign("total")}
                            style={{
                                color:(isSign == "total" ? 'white' : 'var(--golden)'),
                                backgroundColor: (isSign == "total" ? '#5cb377' : 'transparent')
                            }}
                        >T???ng</button>
                    </div>
           
                <div className="main__table">
                    {isSign == "service" && <Service data={data} handleActivePage={handleActivePage} activePage={activePage} />}
                    {isSign == "request" && <SignUpService data={data} date={moment(date).format("MM/YYYY")} handleActivePage={handleActivePage} activePage={activePage} />}
                    {isSign == "total" && <Total data={data} handleActivePage={handleActivePage} activePage={activePage} search={search} />}
                </div> 
            </div>
            <ModalSend
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
            /> 
        </>
    )
}