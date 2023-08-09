import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function App() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const { roomID } = useParams();

    let myMeeting = async (element) => {
        const appID = 497473618;
        const serverSecret = '9964f61987242f449f86cfa5811c842d';
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            currentUser._id,
            currentUser.username
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Join the room
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
        <div ref={myMeeting} style={{ width: '100vw', height: '100vh' }}>
            <Link to="/">
                <button className="button">Back to Home</button>
            </Link>
        </div>
    );
}
