import React, { useEffect, useRef, useState } from "react";
import "../../styles/Chat.css";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";


import { io} from "socket.io-client";
import ChatCard from './ChatCard.js'
const ENDPOINT = window.location.href.split('/')[2].split(':')[0] + ':667';


function Chat(props) {
    const room = {
        id:1,
        userOne:{
            id: 1,
            username:'edepauw'
        },
        userTwo:{
            id:2,
            username:'jdel-rossa'
        },
        messages:[[1, 'salut toi', '1655988634'],[2, 'wesh', '1655988635']]
    }
    const room2 = {
        id:2,
        userOne:{
            id: 1,
            username:'edepauw'
        },
        userTwo:{
            id:2,
            username:'jdel-rossa'
        },
        messages:[[1, 'salut toi', '1655988634'],[2, 'wesh', '1655988635']]
    }
    const room3 = {
        id:3,
        userOne:{
            id: 1,
            username:'edepauw'
        },
        userTwo:{
            id:2,
            username:'jdel-rossa'
        },
        messages:[[1, 'salut toi', '1655988634'],[2, 'wesh', '1655988635']]
    }
    const [rooms, setRooms] = useState([room, room2])
    const [current, setCurrent] = useState(null)
    const cardRefs = useRef(new Array());
    const chatRef = useRef(null);
    var socket = null;

    useEffect(() => {
        //connect to socket
        socket = io(ENDPOINT, {
        });
        socket.on("FromAPI", data => {
        setResponse(data);
        });
        const headers = new Headers();
        headers.append('x-xsrf-token', localStorage.getItem('xsrf'));
        const options = {
        method: 'GET',
        mode: 'cors',
        headers,
        credentials: 'include'
        };
        fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/matchs', options)
            .then(function(response) {
                console.log(response);
            })
    }, []);

    const OpenChat = (id) => {
        cardRefs.current.forEach(ref => ref.hide())
        chatRef.current.className = "ChatGrid";
    }
    const CloseChat = (id) => {
        cardRefs.current.forEach(ref => ref.show())
        chatRef.current.className = "ChatGridHide";
    }
    const sendMessage = () =>
    {
        socket.emit('msg', { id:2, msg: 'salut'})

    }

    return (
        <>
           {rooms.map((room, index) =>( <ChatCard ref={(element) =>{ cardRefs.current.push(element)}} key={room.id} onClick={OpenChat} room={room} id={1} px={(index * 100 - (rooms.length * 100) / 2) + 10}/>))}
            <div ref={chatRef} className="ChatGridHide">
                <div className="userNameChat" >Pseudo
                </div>
                <ArrowForwardIosIcon onClick={CloseChat} className="exit"/>
                <div className="messageContainer" >
                </div>
                <div className="sender" >
                    <input type="text" placeholder="message" className="inputSend"/>
                </div>
                <SendRoundedIcon onClick={sendMessage} className="send"/>
            </div>
        </>
    );
}

export default Chat;
