import authUtils from "../utils/authUtils"
import { useNavigate } from "react-router-dom";


const Admin = ({ currentRoles }) => {
  const username = localStorage.getItem('user')

  const navigate = useNavigate();


  const viewCreateConference = () => {
    navigate('/createconference')
  }

  const viewTalks = () => {
    navigate('/talk')
  }

  const viewSpeakers = () => {
    navigate('/adminspeakersite')
  }

  return (
    <div>
      {authUtils.handleAccess('admin', currentRoles) ? < h1 > Welcome {username}, this is the admin page. Only users with the role: 'admin' may access this.</h1> : (<h1>You do not have the correct role to view this page</h1>)}
    
    
      <button className="btn btn-success m-1 " onClick={viewCreateConference}>Conference Info</button> 
      <button className="btn btn-success m-1 " onClick={viewTalks}>Talks Info</button> 
      <button className="btn btn-success m-1 " onClick={viewSpeakers}>Speaker Info</button> 
    
    </div >
  )
}

export default Admin