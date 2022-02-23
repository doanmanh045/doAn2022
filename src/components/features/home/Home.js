import DashboardNumber from "./DashboardNumber";
import TotalRevenue from './TotalRevenue';
import CountRequestService from './CountRequestService';
import MonthlyAccount from './MonthlyAccount';
import TypeApartmentAccount from './TypeApartmentAccount';
import MonthlyVehicle from './MonthlyVehicle';
import UseRequestService from './UseRequestService';
export default function Home() {
    return <>


        <div className="content ">
            
            <DashboardNumber />
            
                <div className="chartContainer fadeIn">
  
                        <div className="row">
                            <div className="col-lg chart">
                                <TotalRevenue />
                            </div>
                            
                            <div className="col-lg chart">
                                <CountRequestService />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg chart">
                                <MonthlyAccount />
                            </div>
                            
                            <div className="col-lg chart">
                                <TypeApartmentAccount />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg chart">
                                <MonthlyVehicle />
                            </div>
                            
                            <div className="col-lg chart"  >
                                <UseRequestService />
                            </div>
                        </div>
                    
                </div>
         
        </div>
    </>
}