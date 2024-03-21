import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const message = () => {
        alert("PLEASE STOP");
    };

    const goHome = () => {
        navigate('/');
      };

    return (
        <div class="topnav">
            <a className="active" href="#home">Home</a>
            <a href="#films">Films</a>
            <a href="#actors">Actors</a>
            <a href="#hotPicks">Hot Picks</a>


            <i onClick={goHome} id="filmIcon">🎞️</i>
            <button onClick={message} type="button" id="searchButton">🔍</button>
            <input type="text" placeholder="Search.." id="searchField"/>
        </div>
    );
}