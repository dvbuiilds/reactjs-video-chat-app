import React, { useEffect } from 'react'
import ActiveUsersList from './ActiveUsersList'
import { getLocalStream } from '../Utils/webRTC/webRTCHandler'
import DirectCall from './DirectCall';
import { connectWithMyPeer } from '../Utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoomList from './GroupCallRoomList';

const Dashboard = () => {
    useEffect(()=>{
        getLocalStream();
        connectWithMyPeer();
    });
    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-10 text-center row" style={{height: "80vh", backgroundColor: "blue"}}>
                        <DirectCall/>
                    </div>
                    <div className="col-sm-2 text-center "  style={{height: "80vh", backgroundColor: "black", overflowX: "hidden", overflowY: "auto"}}><ActiveUsersList/></div>
                </div>
                <div className="row">
                    <div className="col-sm-10 text-center " style={{height:   "20vh", backgroundColor: "orange"}}><GroupCallRoomList/></div>
                    <div className="col-sm-2 text-center "  style={{height: "20vh", backgroundColor: "brown"}}>LOGO</div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;