import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

import { Link, useNavigate, useParams } from "react-router-dom";

export default function App() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { roomID } = useParams();

    let myMeeting = async (element) => {
        // generate Kit Token
        const appID = 497473618;
        const serverSecret = "9964f61987242f449f86cfa5811c842d";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, currentUser._id, currentUser.username);


        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
// Add event listener to handle call disconnect
    // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
        });


    };

    return (
        <div
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        >
            <button>back to home </button>
        </div>
    );
}