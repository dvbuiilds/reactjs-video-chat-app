import React from 'react'

const MessageDisplayer = (props) => {
    return (
        <>
            <div className="container-fluid" style={{width: '30vw'}}>
                {props.message}
            </div>
        </>
    );
};

export default MessageDisplayer;