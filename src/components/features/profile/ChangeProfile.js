import moment from 'moment';
import style from './profile.module.css';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import API, { BASE_DOWNLOAD_URL } from '../../../lib/API';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
export default function ChangeProfile({ data, search }) {
    const { control, reset, handleSubmit, formState: { errors }, register } = useForm();
    const [dob, setDob] = useState(moment(data?.dob, "DD/MM/YYYY").format("YYYY-MM-DD"));
    const [file, setFile] = useState();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("")
    const handleClose = () => {
        setShow(false)
    }
    let updateProfile = async form => {
        let path = '/tenant/update/profile';
        let formData = new FormData();
        formData.append("name", form?.name);
        formData.append("dob", moment(dob, "YYYY-MM-DD").format("DD/MM/YYYY"));
        formData.append("email", form?.email);
        formData.append("phone", form?.phone);
        formData.append("currentAddress", form?.currentAddress);
        formData.append("homeTown", form?.homeTown);
        formData.append("identifyCard", form?.identifyCard);
        if (file) {
            formData.append("multipartFile", file)
        }
        let resp = await API.authorizedFilePost(path, formData);
        if (resp.ok) {
            setMessage("")
            setShow(true)
            search()
        } else {
            setShow(true)
            let response = await resp.json();
            setMessage(response?.message)
        }
    }
    return (
        <>
            <div className={style.container} style={{ background: 'var(--silver)', width:'100%' }}>
                <div className="item" className={style.item}>
                    <div className="item-label"><strong>Họ và tên</strong></div>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                required
                                onBlur={onBlur}
                                className=""
                                onChange={e => {
                                    onChange(e.target.value)
                                }}
                                 value={value}
                                style={{ background:'none',border: 'none', width: '100%', marginBottom: 3 }}
                            />
                        )}
                        name="name"
                        defaultValue={data?.name}
                        rules={{ required: true }}
                    />
                    <div style={{position:'absolute', transform:'translateY(-7px)'}}>{errors?.name && <tt style={{color:'red'}}>Trường hợp này không được để trống!</tt>}</div>
                </div>
                <div className="item" className={style.item}>
                    <div className="item-label"><strong>Ngày sinh</strong></div>
                    <input
                        className=""
                        onChange={e => {
                            setDob(e.target.value)
                        }}
                        value={dob}
                        style={{ border: 'none', borderRadius:3, maxWidth: '100%', marginBottom: 9,marginTop: 3, color: 'black', padding: 8, backgroundColor: 'rgb(233, 233, 233)' }}
                        type="date"
                    />
                </div>
                <div className="item" className={style.item}>
                    <div className="item-label"><strong>Email</strong></div>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                onBlur={onBlur}
                                className=""
                                onChange={e => {
                                    onChange(e.target.value)
                                }}
                                value={value}
                                style={{ background:'none',border: 'none', width: '100%', marginBottom: 3}}
                            />
                        )}
                        name="email"
                        defaultValue={data?.email}
                        rules={{ required: true }}
                    />
                    <div style={{position:'absolute', transform:'translateY(-7px)'}}>{errors?.email && <tt style={{ color: 'red'}}>Trường hợp này không được để trống!</tt>}</div>
                </div>
                <div className="item" className={style.item}>
                    <div className="item-label"><strong>Căn cước công dân</strong></div>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                onBlur={onBlur}
                                className=""
                                onChange={e => {
                                        onChange(e.target.value)
                                }}
                                value={value}
                                style={{ background:'none',border: 'none', width: '100%', marginBottom: 3 }}
                            />
                        )}
                        name="identifyCard"
                        defaultValue={data?.identifyCard}
                        rules={{ required: true }}
                    />   
                    <div style={{position:'absolute', transform:'translateY(-7px)'}}>{errors?.identifyCard && <tt style={{ color: 'red'}}>Trường hợp này không được để trống!</tt>}</div>
                </div>
                <div className="item" className={style.item}>
                    <div className="item-label"><strong>Số điện thoại</strong></div>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                onBlur={onBlur}
                                className=""
                                onChange={e => {
                                    onChange(e.target.value)
                                }}
                                value={value}
                                style={{ background:'none',border: 'none', width: '100%', marginBottom: 3}}
                            />
                        )}
                        name="phone"
                        defaultValue={data?.phone}
                        rules={{ required: true }}
                    />
                    <div style={{position:'absolute', transform:'translateY(-7px)'}}>{errors?.phone && <tt style={{ color: 'red'}}>Trường hợp này không được để trống!</tt>}</div>
                </div>
                <div className="item" className={style.item}>
                    <div className="item-label"><strong>Địa chỉ hiện tại</strong></div>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                onBlur={onBlur}
                                className=""
                                onChange={e => {
                                    onChange(e.target.value)
                                }}
                                value={value}
                                style={{ background:'none',border: 'none', width: '100%', marginBottom: 3}}
                            />
                        )}
                        name="currentAddress"
                        defaultValue={data?.currentAddress}
                        rules={{ required: true }}
                        />              
                    <div style={{position:'absolute', transform:'translateY(-7px)'}}>{errors?.currentAddress && <tt style={{ color: 'red' }}>Trường hợp này không được để trống!</tt>}</div>
                </div>
                <div className="item" className={style.item}>
                    <div className="item-label"><strong>Quê quán</strong></div>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                onBlur={onBlur}
                                className=""
                                onChange={e => {
                                     onChange(e.target.value)
                                }}
                                value={value}
                                style={{ background:'none',border: 'none', width: '100%' , marginBottom: 3}}
                            />
                        )}
                        name="homeTown"
                        defaultValue={data?.homeTown}
                        rules={{ required: true }}
                    />
                    <div style={{position:'absolute', transform:'translateY(-7px)'}}>{errors?.homeTown && <tt style={{ color: 'red' }}>Trường hợp này không được để trống!</tt>}</div>
                </div>
                <div className="item" className={style.item}>
                    <div className="item-label"><strong>Avatar</strong></div>
                    <div className="form-group">
                        <input type="file"
                            onChange={e => {
                                setFile(e.target.files[0])
                            }}
                        />
                    </div>
                    {file &&
                        <img id="target" src={URL.createObjectURL(file)} alt="" style={{ width: 150, height: 'auto' }} />
                    }
                    {!file &&
                        <img id="target" src={`${BASE_DOWNLOAD_URL}${data?.image}`} alt="" style={{ width: 150, height: 'auto' }} />
                    }
                </div>
                <button className='btnProfilesSubmit' onClick={handleSubmit(updateProfile)} style={{}}>
                    Xác nhận
                </button>
            </div>

            <ModalUpdate show={show} handleClose={handleClose} message={message} />
        </>
    )
}

function ModalUpdate({ show, handleClose, message }) {

    return (
        <>

            <Modal show={show} onHide={() => {
                handleClose()
            }} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {message ? <div className="menu__item--error" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {message && <span>{message}</span>}</div>
                        : <> Bạn đã cập nhật thông tin tài khoản thành công!</>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => { handleClose() }}>
                        Đóng
                    </Button>
                </Modal.Footer>


            </Modal>
        </>
    )
}