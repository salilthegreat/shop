import { Link } from 'react-router-dom'
import './user.css'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material'

export default function User() {
  return (
    <div className='user'>
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to={"/newuser"}>
            <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src="https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">Loid Forger</span>
                        <span className="userShowUserTitle">Software Enginer</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                    <PermIdentity className='userShowIcon'/>
                    <span className="userShowInfoTitle">loidforger007</span>
                    </div>
                    <div className="userShowInfo">
                    <CalendarToday className='userShowIcon'/>
                    <span className="userShowInfoTitle">26.03.1998</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                    <PhoneAndroid className='userShowIcon'/>
                    <span className="userShowInfoTitle">+91 9937159501</span>
                    </div>
                    <div className="userShowInfo">
                    <MailOutline className='userShowIcon'/>
                    <span className="userShowInfoTitle">loidforger@gmail.com</span>
                    </div>
                    <div className="userShowInfo">
                    <LocationSearching className='userShowIcon'/>
                    <span className="userShowInfoTitle">New York | USA</span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form  className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input type="text" placeholder='loidforger007' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input type="text" placeholder='Loid Forger' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="text" placeholder='loidforger@gmail.com' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" placeholder='+91 9937159501' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input type="text" placeholder='New York | USA' className='userUpdateInput' />
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src="https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className='userUpdateImg'/>
                            <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
                            <input type="file"  id='file' style={{display:"none"}}/>
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
