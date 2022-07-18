import React, { useEffect, useState } from "react";
import "../styles/Profile.scss";

import axios from 'axios'

axios.default.port = 667;
const user_axio = axios.create({
    baseURL:'http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/me'
})


function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

function Profile () {
	const [me, setMe] = useState({bd: "1998-11-20",
	bio: "",
	dms: null,
	email: "",
	image: [''],
	lastname: "",
	matchs: null,
	meLikeUsers: null,
	orientationId: "",
	tags: ["", "", "", "", ""],
	userLikesMe: null,
	username: null,}
	);
	const [tags] = useState([
		{
			id:1,
			value:"Shooter"
		},
		{
			id:2,
			value:"Multiplayer"
		},
		{
			id:3,
			value:"Strategy"
		},
		{
			id:4,
			value:"Retro"
		},
		{
			id:5,
			value:"Hardware"
		},
		{
			id:6,
			value:"Dev"
		},
		{
			id:7,
			value:"Computer"
		},
		{
			id:8,
			value:"Console"
		},
		{
			id:9,
			value:"Mobile"
		},
		{
			id:10,
			value:"Travel"
		},
		{
			id:11,
			value:"Home"
		},
		{
			id:12,
			value:"Sport"
		},
		{
			id:13,
			value:"Manga"
		},
		{
			id:14,
			value:"Dog"
		},
		{
			id:15,
			value:"Cat"
		},
		{
			id:16,
			value:"Manga"
		},
		{
			id:17,
			value:"Dog"
		},
		{
			id:18,
			value:"Cat"
		}]
	)
	function change_photo_right(i_photo){
		if (me.image.length - 1 === i_photo)
			return (i_photo)
		else
			set_i(i_photo + 1);
		return i_photo;
	}

	function change_photo_left(i_photo){
		if (0 === i_photo)
			return (i_photo)
		else
			set_i(i_photo - 1);
		return i_photo;
	}

	const [age, setAge] = useState();
	const [i_photo, set_i] = useState(0);


	useEffect(() => {
		setAge(getAge(me.bd));
	}, [me])
	useEffect(() => {

		console.log("ICI ")

		const headers = new Headers();
		headers.append('x-xsrf-token', localStorage.getItem('xsrf'));
		const options = {
			method: 'GET',
			mode: 'cors',
			headers,
			credentials: 'include'
		};
		fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/me', options)
			.then((response) => response.json())
			.then(function (data) {
				// `data` is the parsed version of the JSON returned from the above endpoint.
				setMe(data)
				
			})
	}, []);
	// console.log("HEEEEOOOOOOE "  + window.location.href.split('/')[2].split(':')[0])
	return (
		<div id="profile_text">
			profile
			{(() => {
				if (me.username != null){
					return(
					<div id="Profile_box">
						<div id="test">
							<button onClick={event => change_photo_left(i_photo)} id="boutton_left_profile">←</button>
							<img src={'http://' + window.location.href.split('/')[2].split(':')[0] +':667/uploads/' + me.image[i_photo]} id="photo_profile"/>
							<button onClick={event => change_photo_right(i_photo)} id="boutton_right_profile">→</button>
						</div>
						<div id="nom_prenom_age">
							<span id="pseudo_profile">
								{me.username} 
							</span>
							<span id="age_profile">
								{age} 
							</span>
						</div>
						{/* <h4 id="distance_profile">
							distance
						</h4> */}
						<div id='tags_profile'>
							<span id='tags_profile'>{tags[me.tags[0]].value}</span>
							<span id='tags_profile'>{tags[me.tags[1]].value}</span>
							<span id='tags_profile'>{tags[me.tags[2]].value}</span>
							<span id='tags_profile'>{tags[me.tags[3]].value}</span>
							<span id='tags_profile'>{tags[me.tags[4]].value}</span>
						</div>
						<hr id="bar_profile"/>
						<h4 id="bio_profile">
							{me.bio}
						</h4>
					</div>
				)
			}
			})()}
			<div id="footer">
				{/* FOOTER test */}
			</div>
		</div>
	);
}

export default Profile;