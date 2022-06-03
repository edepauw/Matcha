import React, { useState } from 'react';
import "../styles/BackAnimation.scss";



const BackAnimation = () => {
	const [img1, setimg1] = useState(0 + Math.random() * 8 + 'vw');
	const [img10] = useState(10 + Math.random() * 8 + 'vw');
	const [img3] = useState(20 + Math.random() * 8 + 'vw');
	const [img9] = useState(30 + Math.random() * 8 + 'vw');
	const [img8] = useState(40 + Math.random() * 8 + 'vw');
	const [img6] = useState(50 + Math.random() * 8 + 'vw');
	const [img7] = useState(60 + Math.random() * 8 + 'vw');
	const [img5] = useState(70 + Math.random() * 8 + 'vw');
	const [img4] = useState(80 + Math.random() * 8 + 'vw');
	const [img2, setimg2] = useState(89 + Math.random() * 8 + 'vw');
	// setTimeout(() => {
	// 	setimg1(0 + Math.random() * 8 + 'vw')
	// }, 10000);

	// setTimeout(() => {
	// 	setimg2(89 + Math.random() * 8 + 'vw')
	// }, 13000);


	return (
		<div id="Back_Anime">
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left: img2}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img4}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img1}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img3}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img5}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img6}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img7}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img8}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img9}}></img></div>
			<div><img id= "BackPic" src="../coeur_etoile.gif" View style={{position: 'relative',left:img10}}></img></div>
		</div>
	);
};

export default BackAnimation;