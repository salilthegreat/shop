import { useEffect, useState } from "react"
import "./widgetSm.css"
import { Visibility } from "@mui/icons-material"
import { useDispatch } from "react-redux";
import { loginFailure } from "../../redux/userRedux";
import { userRequest } from "../../requestMethods";

export default function WidgeetSm() {
    const [users,setUsers] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const getUser = async() => {
            try {
                const res = await userRequest.get("/users?new=true");
                setUsers(res.data)
            } catch (err) {
                dispatch(loginFailure())
            }
        }
        getUser()
    })

  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {users?.map((user)=>(           
        <li className="widgetSmListItem" key={user._id} >
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="widdgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">{user.username}</span>
                    <span className="widgetSmUserTitle">Software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon"/>
                    Display
                </button>
            </li>
            ))}
        </ul>
    </div>
  )
}
