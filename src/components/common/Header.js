import { useEffect, useState } from "react";
import API, { BASE_DOWNLOAD_URL } from "../../lib/API";

export default function Header({ handleClick,isChange }) {
    const [data, setData] = useState();
    useEffect(() => {
        search()
    }, [])
    useEffect(() => {
        search()
    }, [isChange])
    const search = async () => {
        let path = `/member/account/profile`;
        let resp = await API.authorizedJSONGET(path);
        if (resp.ok) {
            let response = await resp.json();
            setData(response)
        }
    }

    const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "darkTheme");
    useEffect(() => {      
      document.body.classList.add(localStorage.getItem("theme"));
    },[]);
  
    const toggleThemeChange = () => {
      if (isDark) {
        localStorage.setItem("theme", "lightTheme");
        document.body.classList.toggle("lightTheme");
        setIsDark(true);
      } else {
        localStorage.setItem("theme", "darkTheme");
        document.body.classList.toggle("lightTheme");
        setIsDark(false);
      }
    }

    const clickTheme = () =>{
        document.getElementById("toggle-theme").click();
    }

    return <header id="header" className="header">
        <input style={{visibility:'hidden'}} type="checkbox" id="theme-toggle" onChange={toggleThemeChange}/>
            <img src="images/logo.png" alt="Logo" />
            <div className="header-left">
                <div className="user-area dropdown float-right" style={{transform:[{translateY:-10}]}}>
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                        <i style={{backgroundColor:'var(--gray)', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'15px', paddingRight:'15px', borderRadius: '25px'}} className="fa fa-caret-down"></i>
                        {/* <img className="user-avatar rounded-circle" src="images/admin.jpg" style={{width:45, height:45, borderRadius:30,}}/> */}
                    </a>
                    <div style={{borderRadius:7}} className="user-menu dropdown-menu">
                        <div className="dropDownOption" style={{cursor:'pointer', color:'var(--white)'}} onClick={() => handleClick("profile")}><i style={{marginRight:5}} className="fa fa-user"></i> Thông tin cá nhân</div>
                        <div className="dropDownOption" style={{cursor:'pointer', color:'var(--white)', display:'inline-block', clear:'both'}} onClick={clickTheme}><i style={{marginRight:5}} className="far fa-moon"></i> Màn hình tối/sáng <label className="toggle-theme" for="theme-toggle" id="toggle-theme" onClick={clickTheme} style={{width: 24, height: 24}}></label></div>
                        <div className="dropDownOption" style={{cursor:'pointer',  color:'var(--white)'}}
                            onClick={() => {
                                localStorage.removeItem("token")
                                localStorage.removeItem("page")
                                localStorage.removeItem("roleId")
                                window.location.reload();
                            }}
                        ><i className="fa fa-sign-out-alt" style={{marginRight:5}}></i> Đăng xuất</div>
                    </div>
                </div>
            </div>
    </header>
}


