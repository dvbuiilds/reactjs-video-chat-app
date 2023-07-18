import React, { useEffect, useState } from 'react'
import { sendMessageUsingDataChannel } from '../Utils/webRTC/webRTCHandler';
import MessageDisplayer from './MessageDisplayer';

const Messenger = ({ message, setDirectCallMessage }) => {
    const [inputValue, setInputValue] = useState('');
    const handleOnKeyDownEvent = (event)=>{
        if(event.keyCode === 13){
            sendMessageUsingDataChannel(inputValue);
            setInputValue('');
        }
    };

    useEffect(()=>{
        if(message.received){
            setTimeout(() => { setDirectCallMessage(false, '') }, 6000);
        }
    }, [setDirectCallMessage, message]);

    return (
        <>
            <div className="container-fluid p-0">
                <input 
                type="text" 
                value={inputValue} 
                onChange={ event => setInputValue(event.target.value) } 
                onKeyDown={ handleOnKeyDownEvent }
                className='border border-primary rounded p-2' 
                placeholder='Type your message' 
                />
            </div>
            <div className="container-fluid">
                {message.received && <MessageDisplayer message={message.content} />}
            </div>
        </>
    );
};

export default Messenger;