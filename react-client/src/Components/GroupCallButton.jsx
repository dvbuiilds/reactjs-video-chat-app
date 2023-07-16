import React from 'react'

const GroupCallButton = ({ onClickHandler, label }) => {
    return (
        <>
            <button style={{width: '200px', height: '50px'}} className='btn btn-sm btn-outline-info rounded-5' onClick={ onClickHandler }>
                {label}
            </button>
        </>
    );
};

export default GroupCallButton;