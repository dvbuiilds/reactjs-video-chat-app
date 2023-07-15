import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../redux/Dashboard/actions';
import { connect } from 'react-redux';
import { registerNewUser } from '../Utils/WssConnection/wssConnection';

const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const handleSubmitFn = (e)=>{
        e.preventDefault();
        props.saveUserName(username);
        registerNewUser(username);
        navigate('/dashboard');
    };

    return (
        <>
            <div className='container row my-5'>
                <div className='col-lg-4'></div>
                <div className='col-lg-4'>
                    <div className='row'>
                        <h3>Get Onboard</h3>
                    </div>
                    <div className='row'>
                        <form onSubmit={ handleSubmitFn }>
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">User Name</label>
                                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="userName" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div className='col-lg-4'></div>
            </div>
        </>
    );
};

const mapStateToProps = (state)=>{
    return {username: state.dashboard.username};
};
const mapDispatchToProps = (dispatch)=>{
    return {
        saveUserName : username=> dispatch(setUserName(username))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage);