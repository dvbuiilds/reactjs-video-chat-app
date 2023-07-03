import React from 'react'

const ConversationButton = (props) => {
    const { onClickHandler } = props;
    return (
        <>
            <button onClick={ onClickHandler } className='btn btn-lg btn-dark'>
                {props.children}
            </button>
        </>
    );
};

export default ConversationButton