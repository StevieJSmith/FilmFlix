import React, {useEffect, useState} from 'react';
import '../index.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default function DeleteFilm() {

    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => async function getFilm() { 
        try {
            const filmTbody2 = document.querySelector("#filmTbody2");
            
            const url = "http://localhost:8080/home/film/" + location.state;
            const response = await fetch(url);
            const data = await response.json();
    
            const tr = document.createElement("tr");
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

            filmTbody2.appendChild(tr);

    
    
        }catch(error){
            console.error(error);
        }
    }, []);

    async function deleteFilm() { 
        try {
            const url = "http://localhost:8080/home/film/" + location.state;
            fetch(url, {
                method: 'DELETE'
            });
            navigate('/');
            enqueueSnackbar('Film was successfully deleted!!!', {variant: 'success'})

    
        }catch(error){
            console.error(error);
            navigate('/');
            enqueueSnackbar('An error has occured!!!', {variant: 'error'});
        }
    }





    return (
        <main>
            <header class="title">
                <h1>📽️ Delete a Film 📽️</h1>
            </header>

            <div id='imageContainer'>
                <img id='filmCover' className='filmCard'></img>

            </div>
            <br/>

            <table id="filmTable3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Release Year</th>

                </tr>
            </thead>
            <tbody id='filmTbody2'>

            </tbody>
                    
            </table>

            <h2>Are you sure you want to delete this Film?</h2>
            <button id="deleteActorSubmit" onClick={deleteFilm}>delete</button>

        </main>
    );
}