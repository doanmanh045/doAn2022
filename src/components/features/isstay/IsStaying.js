import React, { useEffect, useState } from 'react';
import Item from './Item';
import Pagination from "react-js-pagination";
import API, { BASE_URL } from '../../../lib/API';
import style from './stay.module.css';
import Axios from 'axios';
import fileDownload from 'js-file-download';
export default function IsStaying() {
    const [data, setData] = useState();
    let [activePage, setActivePage] = useState(1);
    let [name, setName] = useState("");
    let [identifyCard, setIdentifyCard] = useState("");
    let [absentType, setAbsentType] = useState(-1);
    useEffect(() => {
        getAbsent()
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        getAbsent()
    }, [activePage])
    const getAbsent = async () => {
        let path = `/admin/absent/search?pageNo=${activePage - 1}&name=${name}&identifyCard=${identifyCard}&absentType=${absentType}`;
        let resp = await API.authorizedJSONGET(path);
        if (resp.ok) {
            let response = await resp.json();
            setData(response)
        }
    }

    const download = async (filename) => {
        try {
            let url = `${BASE_URL}/mem-ber/absent/export?name=${name}&identifyCard=${identifyCard}&absentType=${absentType}`
            await Axios.get(url, {
                responseType: 'blob',
            }).then(res => {
                fileDownload(res.data,filename);
            }).catch(err => {

            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={style.detail}>
                <button className={style.btnDownload}
                        type="button"
                        onClick={() => download("AbsentDetail.csv")}
                        >Tải excel</button>
                    <div className={style.wrapSearch}>
                        <h6>Họ tên</h6>
                        <input 
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            value={name}
                            className={style.ipSearch}
                        />
                        <h6>Số CCCD</h6>
                        <input 
                            onChange={(e) => {
                                setIdentifyCard(e.target.value)
                            }}
                            value={identifyCard}
                            className={style.ipSearch}
                        />  
                        <h6>Trạng thái</h6>
                        <select 
                            onChange={e => setAbsentType(e.target.value)}
                            value={absentType}
                        className={style.ipSearch} id="ipOption"
                        >
                            <option value={-1}>Tất cả</option>
                            <option value={1}>Tạm trú</option>
                            <option value={2}>Tạm vắng</option>
                        </select>
                        <button
                            onClick={() => {
                                getAbsent()
                                setIdentifyCard("")
                                setName("")
                                setActivePage(1)
                            }}
                            type="button"
                            className={style.btnSearch}
                            ><svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="main__table">
                        <table>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Số CCCD</th>
                                <th>Địa chỉ</th>
                                <th>Tạm trú - tạm vắng</th>
                                <th>Lý do</th>
                                <th>Tòa</th>
                                <th>Số phòng</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                            </tr>
                            {data?.totalElement > 0 ?
                                data?.data?.map((item, idx) => {
                                    return (
                                        <Item data={item} key={idx} index={parseInt(5 * (activePage - 1) + idx + 1)} />
                                    )
                                }) :
                                <>
                                    <tbody >
                                        <tr >
                                            <td colSpan="10">Không có dữ liệu</td>
                                        </tr>
                                    </tbody>
                                </>
                            }
                        </table>
                    </div>
                </div>    
            {data?.totalElement > 0 ?
                <div className="wrapper-paginate">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={parseInt(data?.totalElement)}
                        pageRangeDisplayed={3}
                        onChange={(item) => setActivePage(item)}
                    />
                </div> : <></>
            }
    
        </>
    )
}