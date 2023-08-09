import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function App() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const { roomID } = useParams();

    let myMeeting = async (element) => {
        const appID = 1774145697;
        const serverSecret = '986c8d720b8c8a8e4e4f46eb0bec87f5';
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            currentUser._id,
            currentUser.username
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Join the room with one-on-one tutoring scenario
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url: window.location.href,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
        });
    };

    return (
        <div className="myCallContainer" ref={myMeeting} style={{ width: '100vw', height: '100vh' }}>

        </div>
    );
}
