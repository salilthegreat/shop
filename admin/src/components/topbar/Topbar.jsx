import "./topbar.css"
import {NotificationsNone, Language, Settings} from '@mui/icons-material';
export default function Topbar() {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo">salilAdmin</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone/>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language/>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings/>
                </div>
                <img src="https://images.pexels.com/photos/6324235/pexels-photo-6324235.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="topAvatar" />
            </div>
        </div>
    </div>
  )
}
