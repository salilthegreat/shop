import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import "./home.css"
import { userData } from "../../dummyData"
import WidgeetSm from "../../components/widgetSm/WidgeetSm"
import WidgeetLg from "../../components/widgetLg/WidgeetLg"

export default function Home() {
  return (
    <div className="home"> 
        <FeaturedInfo/>
        <Chart data={userData} title={"User Analytics"} grid dataKey={"Active User"}/>
        <div className="homeWidget">
          <WidgeetSm/>
          <WidgeetLg/>
        </div>
    </div>
  )
}
