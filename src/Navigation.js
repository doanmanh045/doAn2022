import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Dashboard from "./components/common/Dashboard";
import Header from './components/common/Header';
import ForgotPassword from "./components/features/forgot-password/ForgotPassword";
import ResetPassword from "./components/features/forgot-password/ResetPassword";
import Login from "./components/features/login/Login";
import API from "./lib/API";
import { setPageRedux } from "./redux/PageSlice";

const token = localStorage.getItem("token");
const roleId = localStorage.getItem("roleId")
function Navigation() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => {
            return (
              (token ? <Admin roleId={roleId} /> : <Login />)
            )
          }} >
          </Route>
          <Route exact path="/forward-password">
            <ResetPassword />
          </Route>
          <Route exact path="/forgot">
            <ForgotPassword />
          </Route>
        </Switch>
      </Router>
    </>

  );
}

function Admin({ roleId }) {
  const [roomName, setRoomName] = useState("");
  let handleRoomName = (room) => {
    setRoomName(room)
  }
  let dispatch = useDispatch()

  let handleClick = (item) => {
    dispatch(setPageRedux(JSON.parse(JSON.stringify(item))))
    localStorage.removeItem("apartmentId")
  };
  const [isChange,setIsChange] = useState(false);
  const handleChange = () => {
    setIsChange(!isChange)
  }

  let page = useSelector(state => state.page);
  const handleClass = (currentPage) => {
      if (page === currentPage) {
          return `menu-item menu-item__active`
      } else {
          return `menu-item`
      }
  }

  const rightPanChange= () =>{
    if(document.getElementById("nav-toggle").checked === true){
      //document.getElementById("right-panel").style.marginLeft='104px';
      document.getElementById("right-panel").style.transform='translate(6.5rem)';
      document.getElementById("right-panel").style.maxWidth='calc(100% - 6.5rem)';
    
    }if(document.getElementById("nav-toggle").checked === false){
      //document.getElementById("right-panel").style.marginLeft='280px';
      document.getElementById("right-panel").style.transform='translate(17.5rem)';
      document.getElementById("right-panel").style.maxWidth='calc(100% - 17.5rem)';
    }
  }

  return (
    <>
      <Header handleClick={handleClick} isChange={isChange} />
      <input style={{visibility:'hidden'}} type="checkbox" id="nav-toggle"  onChange={rightPanChange}/>    
      <div  className="sidebar">
        <div className="sidebar-brand">
          <label  for="nav-toggle"><span style={{padding:"5px"}}  className="faBars fa fa-arrow-right"></span></label>
          <h6 className="menu-title ">Thanh ??i???u h?????ng</h6>
        </div>
        <div  className="sidebar-menu">
                <ul style={{listStyle:'none'}}>
                    <>
                        
                        <li className={handleClass("home")} title="Dashboard" onClick={() => {
                            handleClick("home")
                        }}>
                            <i className="menu-icon fa-solid fa fa-chart-bar"></i><span>Th???ng k??</span>
                        </li>
                        {roleId == 1 && <>
                            <li className={handleClass("isstay")} title="IsStaying" onClick={() => {
                                handleClick("isstay")
                            }}>
                                <i class=" menu-icon fa fa-regular fa-address-book"></i><span>T???m tr?? - T???m v???ng</span>
                            </li>
                        </>}
                        <li className={handleClass("employee")} title="Employee" onClick={() => {
                            handleClick("employee")
                        }}>
                            <i class="menu-icon fa fa-solid fa-id-card"></i><span>Nh??n vi??n</span>
                        </li>
                    </>
                    <>
                        <h6 className="menu-title">Qu???n l?? d???ch v???</h6>
                        <li className={handleClass("service")} title="Service" onClick={() => {
                            handleClick("service")
                        }}>
                            <i className="menu-icon fa fa-solid fa-dice"></i><span>D???ch v???</span>
                        </li>
                        <li className={handleClass("request-service")} title="Request Service" onClick={() => {
                            handleClick("request-service")
                        }}>
                            <i className="menu-icon fa fa-solid fa-cubes"></i><span>Y??u c???u d???ch v???</span>
                        </li>
                    </>
                    {roleId == 1 &&
                        <>
                            <>
                                <h6 className="menu-title">Qu???n l?? c?? d??n</h6>
                                <li className={handleClass("department")} title="Department" onClick={() => {
                                    handleClick("department")
                                }}>
                                    <i className="menu-icon fa fa-solid fa-door-closed"></i><span>C??n h???</span>

                                </li>
                                <li className={handleClass("resident")} title="Resident" onClick={() => {
                                    handleClick("resident")
                                    handleRoomName("")
                                    localStorage.removeItem("status")
                                }}>
                                    <i className="menu-icon fa fa-solid fa-users"></i><span>C?? d??n</span>
                                </li>
                            </>
                            <>
                                <h6 className="menu-title">Qu???n l?? t??i ch??nh</h6>
                                <li className={handleClass("fee-department")} title="Fee Department" onClick={() => {
                                    handleClick("fee-department")
                                }}>
                                    <i className="menu-icon fa fa-solid fa-wallet"></i><span>Ph?? c??n h???</span>
                                </li>
                            </>
                        </>
                    }
                    <h6 className="menu-title">Qu???n l?? Th???</h6>
                    <li className={handleClass("card-parking")} title="Card Parking" onClick={() => {
                        handleClick("card-parking")
                    }}>
                        <i className="menu-icon fa fa-laptop"></i><span>Th??? xe</span>
                    </li>
                    <>
                        <h6 className="menu-title">Th??ng b??o</h6>
                        <li className={handleClass("notification")} title="Notification" onClick={() => {
                            handleClick("notification")
                        }}>
                            <i className="menu-icon fa fa-bell"></i><span>Th??ng b??o</span>

                        </li>
                        {roleId == 1 && <li className={handleClass("feedback")} title="Feedback" onClick={() => {
                            handleClick("feedback")
                        }}>
                            <i className="menu-icon fa fa-comments"></i><span>Ph???n h???i</span>
                        </li>}
                        {roleId == 1 && <li >
                        </li>}
                    </>

                </ul>
        </div>
      </div>
      
      {/* <div id="right-panel" onClick={rightPanChange} className="right-panel brightMode"> */}
      <div id="right-panel" onClick={rightPanChange} className="right-panel">
        <label className="toggle-right" for="nav-toggle"><span className="fa fa-bars"></span></label>
        <Dashboard roomName={roomName} handleRoomName={handleRoomName} handleChange={handleChange} />
      </div>

    </>
  )
}





export default Navigation;

