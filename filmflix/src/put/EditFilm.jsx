import React, {useEffect, useState} from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import '../index.css'

export default function EditFilm() {

    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [releaseYear, setReleaseYear] = useState("");


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
            setTitle(data.title);
            const td3 = document.createElement("td");
            td3.innerHTML = data.description;
            setDesc(data.description);
            const td4 = document.createElement("td");
            td4.innerHTML = data.releaseYear;
            setReleaseYear(data.releaseYear);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            filmTbody2.appendChild(tr);

    
    
        }catch(error){
            console.error(error);
        }
    }, []);

    async function editFilm() { 
        try {
            const url = "http://localhost:8080/home/film/" + location.state;
            const updatedFilm = {
                title: title,
                description: desc,
                releaseYear: releaseYear
            };
            axios.put(url, updatedFilm)
            .then((response) => {
                console.log(response.status, response.data.token);
            }); 
            navigate('/');
            enqueueSnackbar('Film was successfully edited!!!', {variant: 'success'})

    
        }catch(error){
            console.error(error);
            navigate('/');
            enqueueSnackbar('An error has occured!!!', {variant: 'error'});
        }
    }





    
    return (
        <main>
            <header class="title">
                <h1>📽️ Edit a Film 📽️</h1>
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


            <p>Title: </p>
            <input id="title" defaultValue={title} onChange={(event) => setTitle(event.target.value)}/>
            <p>Description: </p>
            <textarea rows="5" cols="80" id="description" defaultValue={desc} onChange={(event) => setDesc(event.target.value)}>
            </textarea>
            <p>Release Year: </p>
            <input id="releaseYear" defaultValue={releaseYear} onChange={(event) => setReleaseYear(event.target.value)}/>
            <br/>
            <button onClick={editFilm} id="editFilmSubmit">Submit</button>

        </main>
    );
}