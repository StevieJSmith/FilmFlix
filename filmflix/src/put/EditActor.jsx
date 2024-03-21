import React, {useEffect, useState} from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import '../index.css'

export default function EditActor() {

    const location = useLocation();
    const navigate = useNavigate();
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

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
            setFName(data.firstName);
            const td3 = document.createElement("td");
            td3.innerHTML = data.lastName;
            setLName(data.lastName)
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
    
            actorTbody2.appendChild(tr);
    
    
        }catch(error){
            console.error(error);
        }
    }, []);

    async function editactor() { 
        try {
            const url = "http://localhost:8080/home/actor/" + location.state;
            const updatedActor = {
                firstName: fName,
                lastName: lName
            };
            axios.put(url, updatedActor)
            .then((response) => {
                console.log(response.status, response.data.token);
            }); 
            navigate('/');
            enqueueSnackbar('Actor was successfully edited!!!', {variant: 'success'})

    
        }catch(error){
            console.error(error);
            navigate('/');
            enqueueSnackbar('An error has occured!!!', {variant: 'error'});
        }
    }


    
    return (
        <main>
            <header class="title">
                <h1>⭐ Edit an Actor ⭐</h1>
            </header>

            <table id="actorTable3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last name</th>

                </tr>
            </thead>
            <tbody id='actorTbody2'>

            </tbody>
                    
            </table>

            <p>First Name: </p>
            <input id="fName" defaultValue={fName} onChange={(event) => setFName(event.target.value)}/>
            <p>Last Name: </p>
            <input id="lName" defaultValue={lName} onChange={(event) => setLName(event.target.value)}/>
            <br/>
            <button onClick={editactor} id="editActorSubmit">Submit</button>

        </main>
    );
}