import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import "./home.css"
import WidgeetSm from "../../components/widgetSm/WidgeetSm"
import WidgeetLg from "../../components/widgetLg/WidgeetLg"
import { useEffect, useMemo, useState } from "react";
// import { useDispatch } from "react-redux"
// import { loginFailure } from "../../redux/userRedux"
import { userRequest } from "../../requestMethods"

export default function Home() {
  const [userStats,setUserStats] = useState([]);
  // const dispatch =useDispatch()

  const MONTHS = useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[]);

  useEffect(()=>{
    const getUserStats = async() => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data?.map((item)=>(
          setUserStats((prev)=>[...prev, {name:MONTHS[item._id - 1],"Active User":item.total}])
        ))
      } catch (err) {
        console.log(err)
      }
    }
    getUserStats()
  },[])

  console.log(userStats)

  return (
    <div className="home"> 
        <FeaturedInfo/>
        <Chart data={userStats} title={"User Analytics"} grid dataKey={"Active User"}/>
        <div className="homeWidget">
          <WidgeetSm/>
          <WidgeetLg/>
        </div>
    </div>
  )
}
