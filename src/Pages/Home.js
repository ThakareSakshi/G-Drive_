import Data from "../components/Data"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Home = ({profile}) => {
  return (
    <><Header profile={profile}/>
    <div className="w-full flex">
      <Sidebar/>
      <Data/>
    </div>
    </>

  )
}

export default Home
