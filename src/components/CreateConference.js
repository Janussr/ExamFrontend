import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"
import axios from "axios";
import { NavLink } from "react-router-dom"

const CreateConference = () => {

    const URL = apiUtils.getUrl()

    const [conferences, setConferences] = useState([]);
    const [createcon, setCreateCon] = useState({ name: "", location: "", capacity: "", date: "", time: "" });

    //Used to create conf
    const handleInput = (event) => {
        setCreateCon({ ...createcon, [event.target.id]: event.target.value })
    }

    const createConference = async () => {
        await axios.post(URL + "/conference/create", {
            name: createcon.name,
            location: createcon.location,
            capacity: createcon.capacity,
            date: createcon.date,
            time: createcon.time,
        })

        //Fetch again in the function in order to re render the website(so it doesnt spam in network)
        const response = await apiUtils.getAuthAxios().get(URL + '/conference/all')
        setConferences(response.data.conferenceDTOs)
    }

    useEffect(() => {
        const getConferences = async () => {
            const response = await axios.get(URL + "/conference/all")
            setConferences(response.data.conferenceDTOs)
        }
        getConferences()
    }, [URL]);



    return (
        <div>
            <h1>Welcome here you can create or view/edit conferences</h1>



            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>capacity</th>
                        <th>Date</th>
                        <th>time the conference starts</th>
                        <th>See talks in this conference</th>
                        <th>Edit Conference</th>
                    </tr>
                </thead>
                <tbody>
                    {conferences.map((c) => (<tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.location}</td>
                    <td>{c.capacity}</td>
                    <td>{c.date}</td>
                    <td>{c.time}</td>
                    <td><NavLink to={`/conferencecontent/${c.id}`}><button className="btn btn-success">See talks in this conference</button></NavLink></td>
                    <td><NavLink to={`/editconference/${c.id}`}><button className="btn btn-success">Edit Conference</button></NavLink></td>
                    </tr>))}


                </tbody>
            </table>

            <div className="center">
                <form onChange={handleInput}>
                    <input placeholder="name" id="name" />
                    <input placeholder="location" id="location" />
                    <input placeholder="capacity" id="capacity" />
                    <input placeholder="date" id="date" />
                    <input placeholder="time" id="time" />
                </form>
                <button className="btn btn-success" onClick={createConference}>Create conference</button>
            </div>

        </div>
    )
}
export default CreateConference