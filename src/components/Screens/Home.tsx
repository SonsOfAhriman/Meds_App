import './Home.css';
import axios from "axios";

import React, { useState, useEffect } from 'react';

function Home() {

    const [ value, setValue ] = useState("");
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ drugInfo, setDrugInfo ] = useState(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSearchTerm(value);
        grabPres(searchTerm);
        console.log(drugInfo);
    }

    async function grabPres(drug:string) {
        await axios
            .get(`https://api.fda.gov/drug/drugsfda.json?search=products.brand_name:${drug}&limit=1`)
            .then((response) => {
                setDrugInfo(response.data);
                return response;
            });
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand">Navbar</a>
                <form onSubmit={handleSubmit} className="form-inline">
                    <input className="form-control mr-sm-2" type="search" onChange={(e) => { setValue(e.target.value)} } placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            
            {drugInfo ? (
                <div>
                    <p>{drugInfo.results[0].sponsor_name}</p>
                    <p>{drugInfo.results[0].products[0].dosage_form}</p>
                    <p>{drugInfo.results[0].products[0].brand_name}</p>

                </div>
            ) : (
                <div></div>
            )}
  

        </div>


  

    );
}

export default Home;