import './Home.css';
import axios from "axios";
import { ROOT_URL } from "../../apiRoot";
import { useAppContext } from "../../libs/contextLib";



import React, { useState, useEffect } from 'react';

function Home() {

    const { loggedInUser, setLoggedInUser } = useAppContext();

    const [ value, setValue ] = useState("");
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ drugName, setDrugName ] = useState(null);

    const [ drugInfo, setDrugInfo ] = useState(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSearchTerm(value);
        setDrugName(searchTerm);
        grabPres(searchTerm);
    }



    const grabPres = async(drug: string) => {
        await axios
            .get(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:${drug}&limit=1`)
            

            .then((response) => {
                setDrugInfo(response.data);
                return response;
            });
    }



    const savePrescription = () => {
        const effectsArray = drugInfo.results[0].patient.reaction.map((item: any, i: number) => (
            item.reactionmeddrapt
        ));
        const sideEffects = effectsArray.join(", ");

       
        console.log(loggedInUser);

        const token = localStorage.getItem('token') // Replace token with the right key
        if (!token) {
            return console.log("no token");
        }

        console.log(token);

        console.log(loggedInUser.user.email);


        const prescription = {
            "prescription_name": drugName.toUpperCase(),
            "side_effects": sideEffects
        }

        var headers = {
            'Content-Type': 'application/json',
            "X-User-Email": loggedInUser.user.email,
            "X-User-Token": token
        }
 
        axios.post(ROOT_URL + "api/v1/prescriptions", { "prescription": prescription }, { headers: headers });
        alert(`Prescription saved`);
    }

    return (
        <div>
          
            <h2 className="m-1 container"><span className="badge badge-secondary text-secondary">Search for Prescriptions & relevant side effects</span> </h2>

            <form onSubmit={handleSubmit} className="m-2 form-inline">
                <input className="form-control mr-sm-2" type="search" onChange={(e) => { setValue(e.target.value) }} placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-3 px-1 my-sm-0" type="submit">Search</button>
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