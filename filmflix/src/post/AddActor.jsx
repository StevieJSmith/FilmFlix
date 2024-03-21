import React, {useEffect, useState} from 'react';
import '../index.css'
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

export default function AddActor() {

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const navigate = useNavigate();


    async function createActor() { 
        try {
            const url = "http://localhost:8080/home/actor";
            const newActor = {
                firstName: fName,
                lastName: lName
            };
            axios.post(url, newActor)
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
                <h1>⭐ Add an Actor ⭐</h1>
            </header>

            <p>First Name: </p>
            <input onChange={(event) => setFName(event.target.value)} id="fName"/>
            <p>Last Name: </p>
            <input onChange={(event) => setLName(event.target.value)} id="lName"/>
            <br/>
            <button onClick={createActor} id="addActorSubmit">Submit</button>

        </main>
    );
}