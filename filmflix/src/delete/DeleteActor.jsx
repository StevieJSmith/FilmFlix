import React, {useEffect, useState} from 'react';
import '../index.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default function DeleteActor() {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => async function getActor() { 
        try { 
            const actorTbody2 = document.querySelector("#actorTbody2");
    
            const url = "http://localhost:8080/home/actor/" + location.state;
            const response = await fetch(url);
            const data = await response.json();
    
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.innerHTML = data.actorID;
            const td2 = document.createElement("td");
            td2.innerHTML = data.firstName;
            const td3 = document.createElement("td");
            td3.innerHTML = data.lastName;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
    
            actorTbody2.appendChild(tr);
    
    
        }catch(error){
            console.error(error);
        }
    }, []);

    async function deleteActor() { 
        try {
            const url = "http://localhost:8080/home/actor/" + location.state;
            fetch(url, {
                method: 'DELETE'
            });
            navigate('/');
            enqueueSnackbar('Actor was successfully deleted!!!', {variant: 'success'})

    
        }catch(error){
            console.error(error);
            navigate('/');
            enqueueSnackbar('An error has occured!!!', {variant: 'error'});
        }
    }


    
    return (
        <main>
            <header class="title">
                <h1>⭐ Delete a Actor ⭐</h1>
            </header>

            <table id="actorTable3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>

                </tr>
            </thead>
            <tbody id='actorTbody2'>

            </tbody>
                    
            </table>

            <h2>Are you sure you want to delete this Actor?</h2>
            <button id="deleteActorSubmit" onClick={deleteActor}>delete</button>

        </main>
    );
}