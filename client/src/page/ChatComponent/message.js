import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import "../../styles/message.css";


function mesage(props, ref) {
    const cardRef = useRef(null););
    }
	useEffect(() => {
		console.log( 'calc(50% ' + props.px +'px)')
		console.log(cardRef.current)
		cardRef.current.style.top = (document.documentElement.clientHeight * 0.5 + props.px) + 'px'
    }, []);
	resizeObserver.observe(document.documentElement)
    return (
        <div ref={cardRef} className="ChatCard" onClick={handleClick}>
            <img src={'http://' + window.location.href.split('/')[2].split(':')[0] + ':667/uploads/73ed2e7c-86c1-4859-b8ec-d171913635c9.png'} className="imgChat"/>
            <div className="userName">{props.room.userOne.id === props.id ? props.room.userTwo.username: props.room.userOne.username}</div>
            <div className="last">{props.room.messages[props.room.messages.length - 1][1]}</div>
        </div>
    );
}

ChatCard = forwardRef(ChatCard);

export default ChatCard;
