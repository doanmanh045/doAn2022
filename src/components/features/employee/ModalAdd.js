import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import API from '../../../lib/API';
import { Controller, useForm } from "react-hook-form";
import moment from 'moment';

export default function ModalAdd({ show, handleClose, search }) {

    const { control, reset, handleSubmit, formState: { errors }, register } = useForm();
    const [gender, setGender] = useState(true)
    const [message, setMessage] = useState()
    const [dob, setDob] = useState(new Date());
    let [positionId, setPositionId] = useState(1);
    let [arrPosition, setArrPosition] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
    let submitHandler = async (form) => {
        let path = "/admin/employee/add";
        let objReq = {
            name: form.name,
            gender: gender,
            dob: moment(dob, "YYYY-MM-DD").format("DD/MM/YYYY"),
            phoneNumber: form.phoneNumber,
            email: form.email,
            identifyCard: form.identifyCard,
            currentAddress: form.currentAddress,
            homeTown: form.homeTown,
            position: positionId
        }
        let resp = await API.authorizedJSONPost(path, objReq);
        if (resp.ok) {
            handleClose()
            reset();
            setGender(true)
            setDob(new Date())
            search()
            setMessage(null)
        } else {
            let response = await resp.json();
            setMessage(response.message);
        }
    }


    let fetchData = async () => {
        let path = `/manager-service/position/search?show=false`;
        let resp = await API.authorizedJSONGET(path);
        if (resp.status === 200) {
            let response = await resp.json();
            setArrPosition(response);
        }

    }
    return (
        <>
            <Modal show={show} onHide={() => {
                handleClose()
                reset();
                setGender(true)
                setDob(new Date())
             
                setMessage(null)

            }} animation={false} centered>

                <Modal.Header closeButton>
                    <Modal.Title>Th??m nh??n vi??n</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="menu__item--error" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> {message && <span>{message}</span>}</div>
                    <ul className="menu">
                        <li className="menu__item">
                            <div className="menu__item--title">T??n:</div>
                            <div className="menu__item--input">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <input
                                            onBlur={onBlur}
                                            className=""
                                            onChange={e => { onChange(e.target.value) }}
                                            value={value}
                                        />
                                    )}
                                    rules={{ required: true, maxLength: 100 }}
                                    name="name"
                                    defaultValue=""
                                />
                                <div className="menu__item--error--Small"> {errors.name && <small>Tr?????ng n??y kh??ng ???????c ????? tr???ng</small>}</div>
                            </div>
                        </li>

                        <li className="menu__item">
                            <div className="menu__item--title">Gi???i t??nh:</div>
                            <div className="menu__item--input">
                                <div style={{ display: 'flex', alignItems: 'center', width: 300 }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="radio" style={{ width: 50 }}
                                            onClick={() => { setGender(true) }}
                                            name="gender"
                                            checked={gender}
                                        /> Nam</div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}><input type="radio" name="gender" style={{ width: 50 }}
                                        onClick={() => { setGender(false) }}
                                        name="gender"
                                        checked={!gender}
                                    />N???</div>
                                </div>
                            </div>
                            <div className="menu__item--error"> </div>
                        </li>
                        <li className="menu__item">
                            <div className="menu__item--title">Ng??y sinh:</div>
                            <div className="menu__item--input">
                                <input
                                    className=""
                                    onChange={e => {
                                        setDob(e.target.value)
                                    }}
                                    value={moment(dob).format("YYYY-MM-DD")}
                                    type="date"
                                />
                            </div>
                            <div className="menu__item--error"> </div>

                        </li>
                        <li className="menu__item">
                            <div className="menu__item--title">S??? ??i???n tho???i:</div>
                            <div className="menu__item--input">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <input
                                            onBlur={onBlur}
                                            className=""
                                            onChange={e => { onChange(e.target.value) }}
                                            value={value}
                                        />

                                    )}
                                    rules={{ required: true, maxLength: 100 }}
                                    name="phoneNumber"
                                    defaultValue=""
                                />
                                <div className="menu__item--error--Small"> {errors.phoneNumber && <small>Tr?????ng n??y kh??ng ???????c ????? tr???ng</small>}</div>
                            </div>
                            

                        </li>
                        <li className="menu__item">
                            <div className="menu__item--title">Email:</div>
                            <div className="menu__item--input">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <input
                                            onBlur={onBlur}
                                            className=""
                                            onChange={e => { onChange(e.target.value) }}
                                            value={value}
                                        />

                                    )}
                                    name="email"
                                    defaultValue=""
                                    rules={{ required: true, maxLength: 100 }}
                                />
                                <div className="menu__item--error--Small"> {errors.email && <small>Tr?????ng n??y kh??ng ???????c ????? tr???ng</small>}</div>
                            </div>
                            

                        </li>
                        <li className="menu__item">
                            <div className="menu__item--title">S??? CCCD</div>
                            <div className="menu__item--input">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <input
                                            onBlur={onBlur}
                                            className=""
                                            onChange={e => { onChange(e.target.value) }}
                                            value={value}
                                        />

                                    )}
                                    rules={{ required: true, maxLength: 100 }}
                                    name="identifyCard"
                                    defaultValue=""
                                />
                                <div className="menu__item--error--Small"> {errors.identifyCard && <small>Tr?????ng n??y kh??ng ???????c ????? tr???ng</small>}</div>
                            </div>
                            

                        </li>
                        <li className="menu__item">
                            <div className="menu__item--title">?????a ch??? hi???n t???i:</div>
                            <div className="menu__item--input">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <input
                                            onBlur={onBlur}
                                            className=""
                                            onChange={e => { onChange(e.target.value) }}
                                            value={value}
                                        />

                                    )}
                                    rules={{ required: true, maxLength: 100 }}
                                    name="currentAddress"
                                    defaultValue=""
                                />
                                <div className="menu__item--error--Small"> {errors.currentAddress && <small>Tr?????ng n??y kh??ng ???????c ????? tr???ng</small>}</div>
                            </div>
                            

                        </li>
                        <li className="menu__item">
                            <div className="menu__item--title">Qu?? qu??n:</div>
                            <div className="menu__item--input">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <input
                                            onBlur={onBlur}
                                            className=""
                                            onChange={e => { onChange(e.target.value) }}
                                            value={value}
                                        />

                                    )}
                                    rules={{ required: true, maxLength: 100 }}
                                    name="homeTown"
                                    defaultValue=""
                                />
                                <div className="menu__item--error--Small"> {errors.homeTown && <small>Tr?????ng n??y kh??ng ???????c ????? tr???ng</small>}</div>
                            </div>
                            

                        </li>
                        <li className="menu__item">
                            <div className="menu__item--title">V??? tr??:</div>
                            <div className="menu__item--input">
                                <select
                                    value={positionId}
                                    onChange={e => setPositionId(e.target.value)}
                                >
                                    {arrPosition?.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id} >{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="menu__item--error--Small"> {errors.position && <small>Tr?????ng n??y kh??ng ???????c ????? tr???ng</small>}</div>

                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSubmit(submitHandler)}>
                        Th??m
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                        reset();
                        setGender(true)
                        setDob(new Date())
                        setMessage(null)
                    }}>
                        H???y

                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}