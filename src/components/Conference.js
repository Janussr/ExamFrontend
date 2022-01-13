import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"
import axios from "axios";
import { NavLink } from "react-router-dom"

const Conference = () => {
    const URL = apiUtils.getUrl()

    const [con, setCon] = useState([]);



    useEffect(() => {
        const getcon = async () => {
            const response = await apiUtils.getAuthAxios().get(URL + '/conference/all')
            setCon(response.data.conferenceDTOs)
        }
        getcon()
    }, [URL]);


    return (
        <div>
            <h1>Welcome TO CONFERENCE SITE</h1>


            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>capacity</th>
                        <th>Date</th>
                        <th>time the conference starts</th>
                        <th>See talks in this conference</th>
                    </tr>
                </thead>



                <tbody>
                    {con.map((c) => (<tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.location}</td>
                        <td>{c.capacity}</td>
                        <td>{c.date}</td>
                        <td>{c.time}</td>
                        <td><NavLink to={`/conferencecontent/${c.id}`}><button className="btn btn-success">See talks</button></NavLink></td>
                    </tr>))}
                </tbody>
            </table>


        </div>
    )
}

export default Conference