import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

export default function App() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const { roomID } = useParams();

    let myMeeting = async (element) => {
        const appID = 893576107;
        const serverSecret = '980391f1b57ac5e5728db5747167f87b';
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            currentUser._id,
            currentUser.username,
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Join the room with one-on-one tutoring scenario
        zp.joinRoom({
            container: element,
          
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
        });
    };

    return (
        <div className="myCallContainer" ref={myMeeting} style={{ width: '100vw', height: '100vh' }}>

        </div>
    );
}
