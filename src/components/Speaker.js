import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"
import axios from "axios";
import { NavLink } from "react-router-dom"


const Speaker = () => {
    const URL = apiUtils.getUrl()

    const [speakers, setSpeakers] = useState([]);


    useEffect(() => {
        const getSpeakers = async () => {
            const response = await apiUtils.getAuthAxios().get(URL + '/speaker/all')
            setSpeakers(response.data.speakers)
        }
        getSpeakers()
    }, [URL]);


    return (



        <div>
            <h1>Welcome to SPEAKER SITE</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Profession</th>
                        <th>See talk by speaker</th>
                    </tr>
                </thead>

                <tbody>
                    {speakers.map((s) => (<tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.profession}</td>
                        <td>{s.gender}</td>
                        <td><NavLink to={`/conferencecontent/${s.id}`}><button className="btn btn-success">See talks</button></NavLink></td>
                    </tr>))}
                </tbody>

               
            </table>
        </div>
    )
}

export default Speaker