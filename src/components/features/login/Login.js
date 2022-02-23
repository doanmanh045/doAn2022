import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../../lib/API';
import { doPost } from '../../../lib/DataSource';
import { Controller, useForm } from "react-hook-form";


export default function Login({ messageError }) {

    const { control, reset, handleSubmit, formState: { errors }, register } = useForm();

    function enters(event) {
        if (event.key === "Enter") {
            document.getElementById("btnSubmit").click();
        }
    };

    let history = useHistory()
    const [message, setMessage] = useState();
    useEffect(() => {
        localStorage.removeItem("page");
        localStorage.removeItem("token");
        localStorage.removeItem("roleId");

        
    }, [])
    
    let login = async (data) => {
        let path = "/login";
        let resp = await API.anonymousJSONPost(path, data);
        if (resp.status === 200) {
            let response = await resp.json();

            if (response.roleId < 3) {
                localStorage.setItem("token", response.accessToken);
                localStorage.setItem("roleId", response.roleId);
                window.location.reload()
            } else {
                setMessage("Từ chối truy cập!")
            }
        } else {
            setMessage("Tài khoản hoặc mật khẩu chưa đúng!")
        }
    }

    return (
        <>
            <div>
                 
                <div id="intro">
                    <div className="signin">
                        <div class="container" style={{padding: 0}}> 
                            <div className="logo">
                                <div
                                    onClick={() => {
                                        history.push('/')
                                    }}
                                    style={{ cursor: 'pointer' }}
                                ><p style={{ fontStyle: 'italic', fontSize: '2.5em', color: 'var(--golden)', lineHeight: '1em' }}><b>AMS Building</b></p>
                                </div>
                            </div>
                            <div className="login-panel">
                                <div className="form-group">
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <div className="input-control col">
                                                <p style={{color:'var(--golden)'}}>Email:</p>
                                                <input 
                                                    onKeyUp={enters}
                                                    onBlur={onBlur}
                                                    className="float-right myInput"
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                    placeholder="Email"
                                                    value={value} 
                                                />
                                                {errors?.username && <small className="small" style={{ color:'var(--golden)' }}>Mail bạn nhập chưa đúng!</small>}
                                            </div>
                                        )}
                                        rules={{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}
                                        name="username"
                                        defaultValue=""
                                    />   
                                </div>
                                <div className="form-group">
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <div className="input-control col"> 
                                                <p style={{color:'var(--golden)'}}>Mật khẩu:</p>
                                                <input 
                                                    onKeyUp={enters}
                                                    onBlur={onBlur}
                                                    type="password"
                                                    className="float-right myInput"
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                    placeholder="Mật khẩu"
                                                    value={value}
                                                />
                                                {errors?.password && <small className="small" style={{ color:'var(--golden)' }}>Chưa nhập mật khẩu!</small>}
                                            </div>
                                        )}
                                        rules={{ required: true }}
                                        name="password"
                                        defaultValue=""
                                    />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--golden)', fontSize:13, textAlign:'center', height:20, marginBottom:5 }}>{message && message}</p>
                                </div>
                                <div className="form-group">
                                    <div className="col">
                                        <button className="btn btn-sm" id="btnSubmit" onClick={handleSubmit(login)}>
                                            <i className="fas fa-sign-in-alt fa-fw mr-1" />Login
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <div className="col">
                                        
                                        <a className="float-right" id="fgotPass" onClick={() => {history.push('/forgot')}}
                                            style={{ cursor: 'pointer', color:'var(--golden)'}}>
                                            <i style={{ color: 'rgb(236,203,125)' }} className="fas fa-question fa-fw mr-1" />Quên mật khẩu
                                        </a><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

