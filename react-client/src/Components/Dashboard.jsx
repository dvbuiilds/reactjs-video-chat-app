import React, { useEffect } from 'react'
import ActiveUsersList from './ActiveUsersList'
import { getLocalStream } from '../Utils/webRTC/webRTCHandler'
import DirectCall from './DirectCall';

const Dashboard = () => {
    useEffect(()=>{
        getLocalStream();
    });
    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-10" style={{height: "80vh", backgroundColor: "blue"}}><p className='text-center h1 text-white'><DirectCall/></p></div>
                    <div className="col-sm-2"  style={{height: "80vh", backgroundColor: "black", overflowX: "hidden", overflowY: "auto"}}><p className='text-center h1 text-white'>Users</p><ActiveUsersList/></div>
                </div>
                <div className="row">
                    <div className="col-sm-10" style={{height:   "20vh", backgroundColor: "orange"}}><p className='text-center h1 text-white'>Rooms</p></div>
                    <div className="col-sm-2"  style={{height: "20vh", backgroundColor: "brown"}}><p className='text-center h1 text-white'>LOGO</p></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard