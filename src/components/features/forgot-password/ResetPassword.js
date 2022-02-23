import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../../lib/API';
import { doPost } from '../../../lib/DataSource';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";

export default function ResetPassword() {
    const { control, reset, handleSubmit, formState: { errors }, register } = useForm();

    const [account, setAccount] = useState();
    let [message, setMessage] = useState();
    const handleAccount = (e) => {
        let { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value
        })
    }
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }
    let resetPassword = async (data) => {
        try {
            if (data?.newPs !== data?.password) {
                setMessage("Mật khẩu bạn nhập lại chưa đúng")
            } else {
                let path = '/reset-password';
                let resp = await API.anonymousJSONPost(path, {
                    token: data?.token,
                    password: data?.password
                });
                console.log(data)
                if (resp.ok) {
                    setShow(true)
                    history.push('/')
                } else {
                    let response = await resp.json();
                    setMessage(response?.message)
                }
            }
        } catch (error) {

        }

    }
    let history = useHistory();
    return (
        <>
            <ModalSuccess show={show} handleClose={handleClose} />
            <div>
                <div id="intro">
                    <div className="signinForward">
                        <div className="container">
                            <div className="logo">
                                <div onClick={() => {
                                    history.push('/')
                                }}
                                    style={{ cursor: 'pointer' }}
                                ><p style={{ fontStyle: 'italic', fontSize: '45px', color: 'var(--golden)',lineHeight: '1em' }}><b>AMS Building</b></p>
                                </div>
                            </div>
                            <div className="login-panel">
                                <div className="form-group">
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <div className="input-control"> <div><p style={{color:'var(--golden)'}}>Mã xác minh:</p></div>
                                                
                                                <input
                                                    onBlur={onBlur}
                                                    className=""
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                    placeholder="Mã xác minh ..."
                                                    value={value}
        
                                                />
                                                <div>{errors?.token && <div className="smal"  style={{ color: 'var(--golden)' }}>Trường này không được bỏ trống!</div>}</div>
                                            </div>
                                        )}
                                        rules={{ required: true }}
                                        name="token"
                                        defaultValue=""
                                    />
                                    
                                </div>
                                <div className="form-group">
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <div className="input-control">
                                                <p style={{color:'var(--golden)'}}>Mật khẩu mới:</p>
                                                <input
                                                    onBlur={onBlur}
                                                    className=""
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                    placeholder="Mật khẩu ..."
                                                    value={value}
                                                    type="password"
        
                                                />
                                                <div>{errors?.password && <div className="smal"  style={{ color: 'var(--golden)' }}>Trường này không được bỏ trống!</div>}</div>
                                            </div>
                                        )}
                                        rules={{ required: true }}
                                        name="password"
                                        defaultValue=""
                                    />
                                </div>
                                <div className="form-group">
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <div className="input-control">
                                                <p style={{color:'var(--golden)'}}>Nhập lại mật khẩu:</p>
                                                <input
                                                    onBlur={onBlur}
                                                    className=""
                                                    onChange={(e) => {
                                                        onChange(e.target.value)
                                                    }}
                                                    placeholder="Mật khẩu ..."
                                                    value={value}
                                                    type="password"

                                                />
                                                <div>{errors?.newPs && <div className="smal"  style={{ color: 'var(--golden)' }}>Trường này không được bỏ trống!</div>}</div>
                                            </div>
                                        )}
                                        rules={{ required: true }}
                                        name="newPs"
                                        defaultValue=""
                                    />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--golden)', fontSize:13, textAlign:'center', height:20, marginBottom:5 }}>{message && message}</p>
                                </div> 
                                <div className="form-group">
                                    <div className="col">
                                        <button className="btn btn-sm" onClick={handleSubmit(resetPassword)} >
                                            <i className="fas fa-sign-in-alt fa-fw mr-1" />Reset
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
                Bạn đã đổi mật khẩu thành công!. Ấn tiếp tục để quay về đăng nhập
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    history.push('/')
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