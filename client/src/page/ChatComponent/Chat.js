import React, { useEffect } from "react";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";


import { io} from "socket.io-client";
const ENDPOINT = window.location.href.split('/')[2].split(':')[0] + ':667';


function Chat(props) {
    useEffect(() => {

        //connect to socket
        const socket = io(ENDPOINT, {
        });
        socket.on("FromAPI", data => {
        setResponse(data);
        });
        const headers = new Headers();
        headers.append('x-xsrf-token', localStorage.getItem('x-xsrf-token'));
        const options = {
        method: 'GET',
        mode: 'cors',
        headers,
        credentials: 'include'
        };
        fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/matchs', options)
            .then(function(response) {
                console.log(response);
            })
    }, []);


    return (
        <div style={{ position: "relative", height: "500px" }}>
            <MainContainer>
            <ChatContainer>
                <MessageList>
                <Message
                    model={{
                    message: "Hello my friend",
                    sentTime: "just now",
                    sender: "Joe",
                    }}
                />
                </MessageList>
                <MessageInput placeholder="Type message here" />
            </ChatContainer>
            </MainContainer>
      </div>
    );
}

export default Chat;
