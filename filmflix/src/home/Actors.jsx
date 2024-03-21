import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import '../index.css'

export default function Actors() {

    const [actorId, setActorId] = useState("");

    useEffect(() => async function allActors() { 
        try { 
            const actorTbody = document.querySelector("#actorTbody");
            const response = await fetch("http://localhost:8080/home/allActors");
            const data = await response.json();
    
            for(let i = 0; i < 20; i++) {
                let number = Math.floor(Math.random() * data.length) + 1;
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerHTML = data[number].actorID;
                const td2 = document.createElement("td");
                td2.innerHTML = data[number].firstName;
                const td3 = document.createElement("td");
                td3.innerHTML = data[number].lastName;
    
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
    
                actorTbody.appendChild(tr);
    
            }
    
    
        }catch(error){
            console.error(error);
        }
    }, []);


    async function getActor() { 
        try { 
            const actorTable2 = document.querySelector("#actorTable2");
            actorTable2.innerHTML = "";
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
            actorTable2.appendChild(tr);
    
            const actorSearch = document.querySelector("#actorSearch");
            setActorId(actorSearch.value);
            const url = "http://localhost:8080/home/actor/" + actorSearch.value;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
    
            tr = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.innerHTML = data.actorID;
            const td2 = document.createElement("td");
            td2.innerHTML = data.firstName;
            const td3 = document.createElement("td");
            td3.innerHTML = data.lastName;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
    
            actorTable2.appendChild(tr);
            actorSearch.value = "";
    
    
        }catch(error){
            console.error(error);
        }
    }

    async function getFilmsByActor() { 
        try {
            const actorTable3 = document.querySelector("#actorTable3");
            actorTable3.innerHTML = "";
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
            actorTable3.appendChild(tr);
    
            const actorSearch2 = document.querySelector("#actorSearch2");
            const url = "http://localhost:8080/home/filmsByActor/" + actorSearch2.value;
            const response = await fetch(url);
            const data = await response.json();
            for(let i = 0; i < data.films.length; i++) {
                tr = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerHTML = data.films[i].filmID;
                const td2 = document.createElement("td");
                td2.innerHTML = data.films[i].title;
                const td3 = document.createElement("td");
                td3.innerHTML = data.films[i].description;
                const td4 = document.createElement("td");
                td4.innerHTML = data.films[i].releaseYear;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
    
                actorTable3.appendChild(tr);
            }
            actorSearch2.value = "";
    
    
        }catch(error){
            console.error(error);
        }
    }


    return (
        <main>
            <div id="actors">
                <h2>⭐ Actor Selection ⭐</h2>
                <Link to="/addActor" className='addActor'>➕</Link>

                <p id="actorInfo">
                    Step into the world of your favorite actors and actresses with our dedicated Actor Section. Here, you can explore a curated collection <br/>
                    of films featuring the talents of renowned performers from across the globe. Whether you're a fan of dramatic performances that tug at your <br/>
                    heartstrings, action-packed adventures that keep you on the edge of your seat, or comedic genius that leaves you in stitches, our Actor Section <br/>
                    caters to all tastes and preferences. Dive into the filmography of your beloved stars, discover hidden gems, and embark on cinematic journeys that <br/>
                    showcase the incredible range and versatility of these captivating performers. Get ready to be mesmerized by their on-screen charisma and talent as <br/>
                    you immerse yourself in a world of unforgettable performances.
                </p>

                <table id="actorTable1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody id='actorTbody'>

                    </tbody>
                    
                </table>


                <h3>Find an Actor by ID: </h3>

                <input id="actorSearch"></input>
                <button id="actorSubmit" onClick={getActor}>🔍</button>
                <br />
                <Link to={"/editActor"} state={actorId} className='option'>✏️</Link>
                <Link to={"/deleteActor"} state={actorId} className='option'>🗑️</Link>

                <table id="actorTable2">
                    
                </table>

                <h3>Find a Film by Actor ID: </h3>

                <input id="actorSearch2"></input>
                <button id="actorSubmit" onClick={getFilmsByActor}>🔍</button>

                <table id="actorTable3">
                    
                </table>


            </div>
        </main>
    );
}