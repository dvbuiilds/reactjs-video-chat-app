import React from 'react';
import ConversationButtons from './ConversationButtons';
import GroupVideoCall from './GroupVideoCall';

const GroupCallRoom = (props) => {
    const { groupCallStreams } = props;
    return (
        <>
            <div className="container-fluid">
                <div className="row p-0 m-0"><p className="h2">Group Call </p></div>
                <div className="row justify-content-center ">
                    { groupCallStreams && groupCallStreams.map( stream => <GroupVideoCall key={stream.id} stream={stream } /> ) }
                </div>
                <div className="container"><ConversationButtons groupCall {...props} /> </div>
            </div>
        </>
    )
}

export default GroupCallRoom