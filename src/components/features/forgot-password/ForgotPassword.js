import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../../lib/API';
import { doPost } from '../../../lib/DataSource';

import { Controller, useForm } from "react-hook-form";

export default function ForgotPassword() {
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    let history = useHistory();
    const { control, reset, handleSubmit, formState: { errors }, register } = useForm();

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }
    const forgot = async (data) => {
        let path = `/forward-password?email=${data?.email}`;
        let resp = await API.anonymousJSONPost(path);
        if (resp.ok) {
            setShow(true)
        } else {
            let response = await resp.json()
            setMessage(response?.message)
        }
    }
    return (
        <>
            <div>
                <ModalSuccess show={show} handleClose={handleClose} />
                <div id="intro">
                    <div className="signin">
                        <div class="container">
                            <div className="logo" style={{transform:'translateY(43px)'}}>
                                    <div onClick={() => {
                                        history.push('/')
                                    }}
                                        style={{ cursor: 'pointer' }}
                                    ><p style={{ fontStyle: 'italic', fontSize: '45px', color: 'var(--golden)' }}><b>AMS Building</b></p></div><br />
                            </div>
                            <div className="login-panel">
                                
                                
                                <div className="form-group">
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <div className="input-control">
                                                <p style={{color:'var(--golden)'}}>Email:</p>
                                                <input
                                                    onBlur={onBlur}
                                                    className=""
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                    
                                                    value={value}
                                                    
                                                />
                                                {errors?.email && <small className="smal" style={{color:'var(--golden)'}}>Mail bạn nhập chưa đúng!</small>}
                                            </div>
                                        )}
                                        rules={{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}
                                        name="email"
                                        defaultValue=""
                                    />
                                </div>
                                
                                <div ><p style={{ color: 'var(--golden)', fontSize:13, textAlign:'center', height:20, marginBottom:5 }}>{message && <>{message}</>}</p></div>
                                <div className="form-group">
                                    <div className="col">
                                        <button className="btn btn-sm" onClick={handleSubmit(forgot)} >
                                            Lấy lại mật khẩu
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col">
                                        <button className="btn btn-sm" onClick={() => {
                                            history.push('/')
                                        }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <i className="fas fa-sign-in-alt fa-fw mr-1" />Quay lại
                                        </button>
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


function ModalSuccess({ show, handleClose }) {
    let history = useHistory()
    return <>
        <Modal show={show} onHide={handleClose} animation={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Vui lòng kiểm tra lại email!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    history.push('/forward-password')
                    handleClose()
                }}>
                    Tiếp tục
                </Button>
                {/* <Button variant="primary" onClick={handleCloseMessage}>
                    Save Changes
                </Button> */}
            </Modal.Footer>
        </Modal>
    </>
}