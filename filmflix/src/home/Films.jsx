import React, {useEffect, useState} from 'react';
import '../index.css';
import {Link} from "react-router-dom";

export default function Films() {

    const [filmId, setFilmId] = useState("");


    useEffect(() => async function allFilms() { 
        try { 
            const filmTbody = document.querySelector("#filmTbody");
            const response = await fetch("http://localhost:8080/home/allFilms");
            const data = await response.json();
    
            for(let i = 0; i < 20; i++) {
                let number = Math.floor(Math.random() * data.length) + 1;
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerHTML = data[number].filmID;
                const td2 = document.createElement("td");
                td2.innerHTML = data[number].title;
                const td3 = document.createElement("td");
                td3.innerHTML = data[number].description;
                const td4 = document.createElement("td");
                td4.innerHTML = data[number].releaseYear;
    
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
    
                filmTbody.appendChild(tr);
    
            }
    
    
        }catch(error){
            console.error(error);
        }
    }, []);

    async function getFilm() { 
        try {
            const filmTable2 = document.querySelector("#filmTable2");
            filmTable2.innerHTML = "";
            let tr = document.createElement("tr");
            const th1 = document.createElement("th");
            th1.innerHTML = "ID";
            const th2 = document.createElement("th");
            th2.innerHTML = "Title";
            const th3 = document.createElement("th");
            th3.innerHTML = "Description";
            const th4 = document.createElement("th");
            th4.innerHTML = "Release Year";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            filmTable2.appendChild(tr);
    
            const filmSearch = document.querySelector("#filmSearch");
            setFilmId(filmSearch.value);
            const url = "http://localhost:8080/home/film/" + filmSearch.value;
            const response = await fetch(url);
            const data = await response.json();
    
            tr = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.innerHTML = data.filmID;
            const td2 = document.createElement("td");
            td2.innerHTML = data.title;
            const td3 = document.createElement("td");
            td3.innerHTML = data.description;
            const td4 = document.createElement("td");
            td4.innerHTML = data.releaseYear;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            filmTable2.appendChild(tr);
            filmSearch.value = "";
    
    
        }catch(error){
            console.error(error);
        }
    }

    async function getActorsByFilm() { 
        try {
            const filmTable3 = document.querySelector("#filmTable3");
            filmTable3.innerHTML = "";
            let tr = document.createElement("tr");
            const th1 = document.createElement("th");
            th1.innerHTML = "ID";
            const th2 = document.createElement("th");
            th2.innerHTML = "First Name";
            const th3 = document.createElement("th");
            th3.innerHTML = "Last Name";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            filmTable3.appendChild(tr);
    
            const filmSearch2 = document.querySelector("#filmSearch2");
            const url = "http://localhost:8080/home/actorsByFilm/" + filmSearch2.value;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.films)
    
            for(let i = 0; i < data.actors.length; i++) {
                tr = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerHTML = data.actors[i].actorID;
                const td2 = document.createElement("td");
                td2.innerHTML = data.actors[i].firstName;
                const td3 = document.createElement("td");
                td3.innerHTML = data.actors[i].lastName;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
        
                filmTable3.appendChild(tr);
            }
            filmSearch2.value = "";
    
    
        }catch(error){
            console.error(error);
        }
    }


    return (
        <main>
            <div id="films">
                <h2>📽️ Film Selection 📽️</h2>
                <Link to="/addFilm" className='addFilm'>➕</Link>
                <p id="filmInfo">
                Welcome to our Film Selection section, where the reel world meets your real cravings for cinematic bliss! Dive into our treasure trove of movies curated to cater <br/>
                to every taste and mood imaginable. Whether you're in the mood for spine-tingling suspense, belly-aching laughter, heartwarming romance, or mind-bending sci-fi, <br/>
                we've got you covered. Explore our handpicked collection of classics that stand the test of time, along with the latest releases hot off the silver screen. <br/>
                With a diverse range of genres, languages, and styles, there's something here for everyone. So grab your popcorn, dim the lights, and get ready for a movie marathon like no other!
                </p>

                <table id="filmTable1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Release Year</th>

                        </tr>
                    </thead>
                    <tbody id='filmTbody'>

                    </tbody>
                    
                </table>

                <h3>Find a Film by ID: </h3>

                <input id="filmSearch"></input>
                <button id="filmSubmit" onClick={getFilm}>🔍</button>
                <br />
                <Link to={"/editFilm"} state={filmId} className='option'>✏️</Link>
                <Link to={"/deleteFilm"} state={filmId} className='option'>🗑️</Link>

                <table id="filmTable2">
                    
                </table>

                <h3>Find Actors by Film ID: </h3>

                <input id="filmSearch2"></input>
                <button id="filmSubmit" onClick={getActorsByFilm}>🔍</button>

                <table id="filmTable3">
                    
                </table>


            </div>
        </main>
    );
}