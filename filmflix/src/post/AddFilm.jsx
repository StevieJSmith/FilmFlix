import React, {useEffect, useState} from 'react';
import '../index.css'
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

export default function AddFilm() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const navigate = useNavigate();



    async function createFilm() { 
        try {
            const url = "http://localhost:8080/home/film";
            const newFilm = {
                title: title,
                description: desc,
                releaseYear: releaseYear
            };
            axios.post(url, newFilm)
            .then((response) => {
                console.log(response.status, response.data.token);
            }); 
            navigate('/');
            enqueueSnackbar('Film was successfully Created!!!', {variant: 'success'})

        }catch(error){
            console.error(error);
            navigate('/');
            enqueueSnackbar('An error has occured!!!', {variant: 'error'});
        }
    };

    return (
        <main>

            <header class="title">
                <h1>📽️ Add a new Film 📽️</h1>

            </header>

            
                <p>Title: </p>
                <input onChange={(event) => setTitle(event.target.value)}id="title"/>
                <p>Description: </p>
                <textarea onChange={(event) => setDesc(event.target.value)} rows="5" cols="80" id="description">
                </textarea>
                <p>Release Year: </p>
                <input onChange={(event) => setReleaseYear(event.target.value)} id="releaseYear"/>
                <br/>
                <button onClick={createFilm} id="addFilmSubmit">Submit</button>

        </main>
    );
}