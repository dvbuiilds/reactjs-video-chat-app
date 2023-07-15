import React from 'react'

const GroupCallButton = ({ onClickHandler, label }) => {
    return (
        <>
            <button className='btn btn-md btn-info' onClick={ onClickHandler }>
                {label}
            </button>
        </>
    );
};

export default GroupCallButton;