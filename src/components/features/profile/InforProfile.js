import React, { useEffect, useState } from 'react';
import API from '../../../lib/API';
import style from './profile.module.css';
export default function InforProfile({data}) {
    
    return (
        <div className={style.container} style={{background: 'var(--silver)', width:'100%' }} >

            <div className="item" className={style.item}>                
                <div className="item-label"><strong>Họ và tên</strong></div>
                <div className="item-data" >{data?.name}</div>
            </div>

            <div className="item" className={style.item}>  
                <div className="item-label"><strong>Ngày sinh</strong></div>
                <div className="item-data" >{data?.dob}</div>
            </div>

            <div className="item" className={style.item}>
                <div className="item-label"><strong>Giới tính</strong></div>
                <div className="item-data">
                            {data?.gender ? "Nam" : "Nữ"}
                </div>

            </div>
            <div className="item" className={style.item}>
                <div className="item-label"><strong>Email</strong></div>
                <div className="item-data">
                            {data?.email}
                </div>
            </div>
            <div className="item" className={style.item}>
                <div className="item-label"><strong>Căn cước công dân</strong></div>
                <div className="item-data">
                            {data?.identifyCard}
                </div>
            </div>

            <div className="item" className={style.item}>
                <div className="item-label"><strong>Số điện thoại</strong></div>
                <div className="item-data">
                            {data?.phone}
                </div>
            </div>

            <div className="item" className={style.item}>
                <div className="item-label"><strong>Địa chỉ hiện tại</strong></div>
                <div className="item-data">
                            {data?.currentAddress}
                </div>
            </div>

            <div className="item" className={style.item}>
                <div className="item-label"><strong>Quê quán</strong></div>
                <div className="item-data">
                            {data?.homeTown}
                </div>
            </div>
            <div className="item" className={style.item}>
                <div className="item-label"><strong>Quyền</strong></div>
                <div className="item-data">
                            {data?.roleId == 1 ? "Admin" : "Member"}
                </div>
            </div>
        </div>
    )
}