import './Home.css';
import axios from "axios";
import {MenuItems} from "./MenuItems";

import React, { useState, useEffect } from 'react';

function Home() {

    const [ value, setValue ] = useState("");
    const [ searchTerm, setSearchTerm ] = useState("");
    const [drugName, setDrugName] = useState(null);

    const [ drugInfo, setDrugInfo ] = useState(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSearchTerm(value);
        setDrugName(searchTerm);
        grabPres(searchTerm);
        console.log(drugInfo);
    }

    async function grabPres(drug:string) {
        await axios
            .get(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:${drug}&limit=1`)
            

            .then((response) => {
                setDrugInfo(response.data);
                console.log(drugInfo);
                return response;
            });
    }

    function savePrescription() {
        const effectsArray = drugInfo.results[0].patient.reaction.map((item: any, i: number) => (
            item.reactionmeddrapt
        ));
        const sideEffects = effectsArray.join(", ");
        console.log(sideEffects);

        console.log(drugName.toUpperCase());

        const prescription = {
            prescriptionName: drugName.toUpperCase(),
            sideEffects: sideEffects
        }

        axios.post(`http://localhost:5000/api/prescriptions`, prescription);
        alert(`Prescription saved`);
    }

    return (
        <div>
            <nav className="NavbarItems">
                <h1 className="navbar-logo">React<i className="fab fa-react"></i></h1>
                <div className="menu-icon">

                </div>
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            
            <form onSubmit={handleSubmit} className="form-inline">
                <input className="form-control mr-sm-2" type="search" onChange={(e) => { setValue(e.target.value) }} placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>

            {drugInfo ? (
                <div>
                    <div className="card" style={{width: "18rem"}}>
                        <div className ="card-body">
                            <h5 className="card-title">Drug Name: {drugName}</h5>
                            <h6>Side Effects</h6>
                            <p className ="card-text">
                                <ul>
                                    {drugInfo.results[0].patient.reaction.map((item: any, i: number) => (
                                        <li key={i}> {item.reactionmeddrapt} </li>
                                    ))}
                                </ul>
                            </p>
                            <a href="#" onClick={savePrescription} className ="btn btn-primary">Save</a>
                        </div>
                    </div>

                    {/* <p>{drugInfo.results[0].patient.reaction}</p>
                    <p>{drugInfo.results[0].products[0].dosage_form}</p>
                    <p>{drugInfo.results[0].products[0].brand_name}</p> */}

                </div>
            ) : (
                <div></div>
            )}
  

        </div>


  

    );
}

export default Home;