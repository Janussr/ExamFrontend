import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"
import { useParams } from "react-router"
import axios from "axios"
import { NavLink } from "react-router-dom"


const AdminSpeakerSite = () => {
    const URL = apiUtils.getUrl()
    const id = parseInt(useParams().id)

    const [speakers, setSpeakers] = useState([]);
    const [speaker, setSpeaker] = useState({ name: "", profession: "", gender: ""});

    useEffect(() => {
        const getSpeakers = async () => {
            const response = await apiUtils.getAuthAxios().get(URL + '/speaker/all')
            setSpeakers(response.data.speakers)
        }
        getSpeakers()
    }, [URL]);

    const editSpeaker = async () => {
        try {
            await axios.put(URL + '/' + id, {
                name: speaker.name,
                profession: speaker.profession,
                gender: speaker.gender,
            })
        } catch (error) {
        }
    }

    const handleInput = (event) => {
        setSpeaker({ ...speaker, [event.target.id]: event.target.value })
    }

    return (



        <div>
            <h1>Welcome to Admin Speaker Page</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Profession</th>
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


            <form onChange={handleInput} className="form-group">
                <input className="form-control addInput" id="name" defaultValue={speaker.name} placeholder="Enter name" type="text"></input>
                <input className="form-control addInput" id="profession" defaultValue={speaker.profession} placeholder="Enter profession" type="text"></input>
                <input className="form-control addInput" id="gender" defaultValue={speaker.gender} placeholder="Enter gender" type="text"></input>
            </form>
            <button onClick={editSpeaker} className="btn btn-success addButton">Edit Speaker</button>

        </div>
    )
}

export default AdminSpeakerSite