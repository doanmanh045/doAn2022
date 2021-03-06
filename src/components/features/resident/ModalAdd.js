import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import API from '../../../lib/API';

export default function ModalAdd({ show, handleClose, handleShow, search, apartmentId }) {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    let [position, setPosition] = useState();
    const [message, setMessage] = useState();
    useEffect(() => {
        fetchData()
    }, [])
    let fetchData = async () => {
        let path = `/manager-service/position/search?show=true`;
        let resp = await API.authorizedJSONGET(path);
        if (resp.status === 200) {
            let response = await resp.json();
            setPosition(response);
        }

    }

    let onSubmit = async (data) => {
        let path = '/admin/a/apartment/add';
        let objData = {
            apartmentId: apartmentId,
            request: {
                name: data.name,
                identifyCard: data?.identifyCard ? data.identifyCard : "",
                phone: data?.phone ? data.phone : "",
                email: data?.email ? data.email : "",
                gender: data.gender,
                dob: data.dob,
                positionId: data.positionId,
                currentAddress: data.currentAddress,
                homeTown: data.homeTown
            }
        };
        console.log("objData", objData)
        let resp = await API.authorizedJSONPost(path, objData);
        if (resp.ok) {
            handleClose()
            search()
            setMessage("")
            reset()
            console.log("ok")
        } else {
            let response = await resp.json();
            setMessage(response?.message)
        }
    }
    return (
        <>
            <Modal show={show}
                onHide={() => {
                    handleClose()
                    setMessage(null)
                    reset()
                }}
                animation={false} centered>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm người phụ thuộc</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="menu__item--error" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {message && <span>{message}</span>}</div>
                        <div>
                            <ul className="menu">
                                <li className="menu__item">
                                    <div className="menu__item--title">Tên:</div>
                                    <div className="menu__item--input">
                                        <input type="text"
                                            {...register("name", { required: true })}
                                        />
                                        <div className="menu__item--error--Small--AddModal"> {errors.name && <small>Trường này không được để trống</small>}</div>
                                    </div>                     
                                </li>
                                <li className="menu__item">
                                    <div className="menu__item--title">Giới tính:</div>
                                    <div className="menu__item--input">
                                        <div style={{ display: 'flex', alignItems: 'center', width: 300 }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="radio" style={{ width: 50 }}
                                                    {...register("gender", { required: true })}
                                                    value={true}
                                                    defaultChecked={true}
                                                    defaultValue={true}
                                                /> Nam</div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}><input type="radio" name="gender" style={{ width: 50 }}
                                                {...register("gender", { required: true })}
                                                value={false}
                                            />Nữ</div>
                                        </div>
                                        <div className="menu__item--error--Small--AddModal"> {errors.gender && <small>Trường này không được để trống</small>}</div>
                                    </div>
                                </li>
                                <li className="menu__item">
                                    <div className="menu__item--title">Ngày sinh:</div>
                                    <div className="menu__item--input">
                                        <input type="date"
                                            name="dob"
                                            {...register("dob", { required: true })}
                                        />
                                        <div className="menu__item--error--Small"> {errors.dob && <small>Trường này không được để trống</small>}</div>
                                    </div>
                                </li>
                                <li className="menu__item">
                                    <div className="menu__item--title">Số ĐT:</div>
                                    <div className="menu__item--input">
                                        <input type="text"
                                            name="phone"
                                            {...register("phone")}
                                        />
                                         <div className="menu__item--error--Small"> {errors.phone && <small>Trường này không được để trống</small>}</div>
                                    </div>                                 
                                </li>
                                <li className="menu__item">
                                    <div className="menu__item--title">Địa chỉ hiện tại:</div>
                                    <div className="menu__item--input">
                                        <input type="text"
                                            name="currentAddress"
                                            {...register("currentAddress", { required: true })}
                                        />
                                        <div className="menu__item--error--Small--AddModal"> {errors.currentAddress && <small>Trường này không được để trống</small>}</div>
                                    </div>
                                </li>
                                <li className="menu__item">
                                    <div className="menu__item--title">Quê Quán:</div>
                                    <div className="menu__item--input">
                                        <input type="text"
                                            name="homeTown"
                                            {...register("homeTown", { required: true })}
                                        />
                                        <div className="menu__item--error--Small--AddModal"> {errors.homeTown && <small>Trường này không được để trống</small>}</div>
                                    </div>                     
                                </li>
                                <li className="menu__item">
                                    <div className="menu__item--title">Email:</div>
                                    <div className="menu__item--input">
                                        <input type="text"
                                            name="email"
                                            {...register("email")}
                                        />
                                        <div className="menu__item--error"></div>
                                    </div>    
                                </li>
                                <li className="menu__item">
                                    <div className="menu__item--title">Số CCCD</div>
                                    <div className="menu__item--input">
                                        <input type="text"
                                            name="identifyCard"
                                            {...register("identifyCard")}
                                        />
                                        <div className="menu__item--error"></div>
                                    </div>
                                </li>
                                <li className="menu__item">
                                    <div className="menu__item--title">Quan hệ chủ hộ:</div>
                                    <div className="menu__item--input">
                                        <select {...register("positionId", { required: true })}>
                                            {position?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item?.id}>{item?.name}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="menu__item--error--Small--AddModal"> {errors.positionId && <small>Trường này không được để trống</small>}</div>
                                    </div>
                                </li>
                            </ul>
                            <br />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Tiếp
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            handleClose()
                            setMessage(null)
                            reset()
                        }}>
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}