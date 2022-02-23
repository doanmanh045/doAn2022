import React, { useEffect, useState } from 'react';
import API, { BASE_DOWNLOAD_URL } from '../../../lib/API';
import ChangePassword from './ChangePassWord';
import UpdateProfile from './UpdateProfile';
import style from './profile.module.css';
import InforProfile from './InforProfile';
import ChangeProfile from './ChangeProfile';

export default function Profile({handleChange}) {
    const [data, setData] = useState();
    useEffect(() => {
        search()
    }, []);
    const search = async () => {
        let path = `/member/account/profile`;
        let resp = await API.authorizedJSONGET(path);
        if (resp.ok) {
            let response = await resp.json();
            setData(response);
            handleChange()
        }
    }
    let [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }
    let [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(true)
    }
    const handleClosePassword = () => {
        setShowPassword(false)
    }
    const [tab, setTabs] = useState("infor");
    console.log(tab)
    return (
        <>

            <div className="container-fluid" style={{padding:20}}>
                
                <div className="row">
                    <div className="col-md-4 col-xs-12">
                        <div className="white-box">
                            <div className="user-bg"> <img width="100%" className="user-avatar rounded-circle"
                                src={` ${BASE_DOWNLOAD_URL}${data?.image}`} alt="User Avatar" />
                                <div className="overlay-box">
                                    <div className="user-content">
                                        <a href="javascript:void(0)"><img className="thumb-lg img-circle"
                                            src={` ${BASE_DOWNLOAD_URL}${data?.image}`} alt="User Avatar" /></a>
                                        <h4 className="text-white">{data?.name}</h4>
                                        <h5 className="text-white">{data?.email}</h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-8 col-xs-12" style={{ background: 'transparent' }}>
                        <div  class="nav nav-tabs" id="myTab" role="tablist" style={{border:'none'}}>
                            
                      
                                    <button className={style.btnSw} class="nav-item" onClick={() => setTabs("infor")} style={{ cursor: 'pointer',color:(tab == "infor" ? 'white' : 'var(--golden)'), backgroundColor: (tab == "infor" ? '#5cb377' : 'transparent'), marginRight: -1, borderTop: '0px solid #333', borderBottom: '0px solid #333', borderRight: '1px solid var(--silver)', borderLeft: '1px solid var(--silver)', padding: '11px 9px 11px 9px', borderRadius:0 }}
                                    className={tab == "infor" ? 'nav-link show active' : 'nav-link'} id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected={tab == "infor" ? "true" : 'false'}>
                                    Tài khoản</button>
                          
                                    <button className={style.btnSw} class="nav-item" onClick={() => setTabs("changeProfile")} style={{ cursor: 'pointer',color:(tab == "changeProfile" ? 'white' : 'var(--golden)'), backgroundColor: (tab == "changeProfile" ? '#5cb377' : 'transparent'), marginRight: -1, borderTop: '0px solid #333', borderBottom: '0px solid #333', borderRight: '1px solid var(--silver)', borderLeft: '1px solid var(--silver)', padding: '11px 9px 11px 9px', borderRadius:0 }}
                                    className={tab == "changeProfile" ? 'nav-link show active' : 'nav-link'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected={tab == "changeProfile" ? "true" : 'false'}>
                                    Thay đổi thông tin</button>
                               
                              
                                    <button className={style.btnSw} class="nav-item" onClick={() => setTabs("changePassword")} style={{ cursor: 'pointer',color:(tab == "changePassword" ? 'white' : 'var(--golden)'), backgroundColor: (tab == "changePassword" ? '#5cb377' : 'transparent'), marginRight: -1, borderTop: '0px solid #333', borderBottom: '0px solid #333', borderRight: '1px solid var(--silver)', borderLeft: '1px solid var(--silver)', padding: '11px 9px 11px 9px', borderRadius:0 }}
                                    className={tab == "changePassword" ? 'nav-link show active' : 'nav-link'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected={tab == "changePassword" ? "true" : 'false'}>
                                    Thay đổi mật khẩu</button>
                              

   
                            {tab == "infor" && <InforProfile data={data} />}
                            {tab == "changeProfile" && <ChangeProfile data={data} search={search} /> }
                            {tab == "changePassword" && <ChangePassword />}

                           

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

