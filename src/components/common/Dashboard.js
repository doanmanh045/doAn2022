import React, { useState } from 'react';
import Profile from '../features/profile/Profile';
import Department from '../features/department/Department';
import Employee from '../features/employee/Employee';
import Building from '../features/building/Building';
import Resident from '../features/resident/Resident';
import Service from '../features/service/Service';
import IsStaying from '../features/isstay/IsStaying';
import RequestService from '../features/request-service/RequestService';
import FeeBuilding from '../features/fee-building/FeeBuilding';
import FeeDepartment from '../features/fee-department/FeeDepartment';
import CardParking from '../features/card-parking/CardParking';
import CardDepartment from '../features/card-department/CardDepartment';
import Notification from '../features/notification/Notification';
import FeedBack from '../features/feedback/FeedBack';
import Home from '../features/home/Home';
import { useSelector } from 'react-redux';
export default function Dashboard({ roomName, handleRoomName,handleChange }) {
    let page = useSelector(state => state.page);

    return (
        <>

            {page === "home" && <Home />}
            {page === "profile" && <Profile handleChange={handleChange} />}
            {page === "department" && <Department handleRoomName={handleRoomName} />}
            {page === "employee" && <Employee />}
            {page === "building" && <Building />}
            {page === "resident" && <Resident roomName={roomName} handleRoomName={handleRoomName} />}
            {page === "service" && <Service />}
            {page === "isstay" && <IsStaying />}
            {page === "request-service" && <RequestService />}
            {page === "fee-building" && <FeeBuilding />}
            {page === "fee-department" && <FeeDepartment />}
            {page === "card-parking" && <CardParking />}
            {page === "card-department" && <CardDepartment />}
            {page === "notification" && <Notification />}
            {page === "feedback" && <FeedBack />}
        </>
    )
}