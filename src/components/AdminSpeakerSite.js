import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"


const AdminSpeakerSite = () => {
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
            <h1>Welcome to Admin Speaker Page</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Profession</th>
                        <th>Edit speaker here</th>
                    </tr>
                </thead>

                <tbody>
                    {speakers.map((s) => (<tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.profession}</td>
                        <td>{s.gender}</td>
                        <td><NavLink to={`/speakercontent/${s.id}`}><button className="btn btn-success">edit speaker here</button></NavLink></td>
                    </tr>))}
                </tbody>

            </table>


               </div>
    )
}

export default AdminSpeakerSite