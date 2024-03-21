import React, {useEffect, useState} from 'react';
import '../index.css'

export default function hotPicks() {

    // -------------- Image Generation --------------




    return (
        <main>
            <div className="hotPicks" id="hotPicks">

                <div id="results">
                    <h1>🔥 Hot Picks 🔥</h1>
                    <button id="filmSubmit" onClick={dataRetrieval}>🔍</button>
                    <div id="api">
                        <p id="answer"></p>
                    </div>
                </div>

            </div>
        </main>
    );
}
