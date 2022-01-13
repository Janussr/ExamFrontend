import authUtils from "../utils/authUtils"
import { useNavigate } from "react-router-dom";

const User = ({ currentRoles }) => {
  const username = localStorage.getItem('user')

  const navigate = useNavigate();

  const viewConference = () => {
    navigate('/conference')
  }

  const viewTalksBySpeaker = () => {
    navigate('/speaker')
  }

  return (
    <div>
      {authUtils.handleAccess('user', currentRoles) ? < h1 > Welcome {username}, this is the user page. Only users with the role: 'user' may access this.</h1> : (<h1>You do not have the correct role to view this page</h1>)}

      <br></br><br></br>
      <div className="center">
  
      <button className="btn btn-success m-1 " onClick={viewConference}>About conference</button> 
      <button className="btn btn-success m-1 " onClick={viewTalksBySpeaker}>See all talks by specific speaker</button> 
      </div>


    </div>
  )
}

export default User