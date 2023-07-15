import React, { useEffect } from 'react'
import ActiveUsersList from './ActiveUsersList'
import { getLocalStream } from '../Utils/webRTC/webRTCHandler'
import DirectCall from './DirectCall';
import DashboardInfo from './DashboardInfo.jsx';
import { connect } from 'react-redux';
import { callStates } from '../redux/Call/actions';
import { connectWithMyPeer } from '../Utils/webRTC/webRTCGroupCallHandler';

const Dashboard = ({ username, callState }) => {
    useEffect(()=>{
        getLocalStream();
        connectWithMyPeer();
    });
    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-10 text-center h1" style={{height: "80vh", backgroundColor: "blue"}}>
                        <DirectCall/>
                        {/* { callState !== callStates.CALL_IN_PROGRESS && <DashboardInfo username={username} />} */}
                    </div>
                    <div className="col-sm-2 text-center h1"  style={{height: "80vh", backgroundColor: "black", overflowX: "hidden", overflowY: "auto"}}>Users<ActiveUsersList/></div>
                </div>
                <div className="row">
                    <div className="col-sm-10 text-center h1" style={{height:   "20vh", backgroundColor: "orange"}}>Rooms</div>
                    <div className="col-sm-2 text-center h1"  style={{height: "20vh", backgroundColor: "brown"}}>LOGO</div>
                </div>
            </div>
        </>
    );
};

// const mapStateToProps = ({ dashboard, call })=>{
//     return {
//         ...dashboard, 
//         ...call
//     };
// };
// const mapStateToProps = (state)=>{
//     return {
//         username: state.dashboard.username,
//         callState: state.call.callState
//     };
// };

// export default connect(mapStateToProps) (Dashboard);
export default Dashboard;