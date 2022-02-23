import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import API from '../../../lib/API';
import style from './profile.module.css';


export default function ChangePassword({ show, handleClose, handleShow, search }) {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState();

    const [showSuccess, setShowSuccess] = useState(false);
    const handleCloseSuccess = () => {
        setShowSuccess(false)
    }
    let onSubmit = async (data) => {
        if (data?.newPassword !== data?.overPassword) {
            setMessage("Mật khẩu bạn nhập lại chưa đúng!")
            setShowSuccess(true)
        } else {
            let path = '/tenant/change-password';
            let resp = await API.authorizedJSONPost(path, {
                oldPassword: data?.password,
                newPassword: data?.newPassword
            });
            if (resp.ok) {
                reset()
                setMessage("")
                handleClose()
                search()
                setShowSuccess(true)
            } else {
                setShowSuccess(true)
                let response = await resp.json();
                setMessage(response?.message)
            }
        }

    }
    return (
        <>
            <ModalSuccess showSuccess={showSuccess} handleCloseSuccess={handleCloseSuccess} message={message} />

            <div className={style.container} style={{ background: 'var(--silver)', width:'100%' }}>
                
                        <div className="item" className={style.item}>   
                            <div className="item-label"><strong>Mật khẩu cũ</strong></div>
                            <div className="menu__item--input">
                                <input type="password"
                                    {...register("password", { required: true })}
                                    style={{ background:'none',border: 'none', width: '100%' , marginBottom: 3, color: 'var(--white)'}}
                                />
                            </div>
                            <div style={{position:'absolute', transform:'translateY(-7px)'}} className="menu__item--error"> {errors.password && <tt>Trường này không được để trống</tt>}</div>
                        </div>

                        <div className="item" className={style.item}>
                            <div className="item-label"><strong>Mật khẩu mới</strong></div>
                            <div className="menu__item--input">
                                <input type="password"
                                    {...register("newPassword", { required: true })}
                                    style={{ background:'none',border: 'none', width: '100%' , marginBottom: 3, color: 'var(--white)'}}
                                />
                            </div>
                            <div style={{position:'absolute', transform:'translateY(-7px)'}} className="menu__item--error"> {errors.newPassword && <tt>Trường này không được để trống</tt>}</div>
                        </div>

        
                        <div className="item" className={style.item}>
                            <div className="item-label"><strong>Nhập lại mật khẩu mới</strong></div>
                            <div className="menu__item--input">
                                <input type="password"
                                    {...register("overPassword", { required: true })}
                                    style={{ background:'none',border: 'none', width: '100%' , marginBottom: 3, color: 'var(--white)'}}
                                />
                            </div>
                            <div style={{position:'absolute', transform:'translateY(-7px)'}} className="menu__item--error"> {errors.overPassword && <tt>Trường này không được để trống</tt>}</div>
                        </div>

                        <button className='btnProfilesSubmit' style={{marginTop:'0.5em'}} type="button" onClick={handleSubmit(onSubmit)} >Xác nhận</button>
            </div>
            
        </>
    )
}

function ModalSuccess({ handleCloseSuccess, showSuccess, message }) {
    return <>
        <Modal show={showSuccess} onHide={handleCloseSuccess} animation={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message ? <div className="menu__item--error" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {message && <span>{message}</span>}</div> : <>Bạn đã thay đổi mật khẩu thành công!</>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    handleCloseSuccess()
                }}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}