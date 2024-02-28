import Data from "../components/Data"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Home = () => {
  return (
    <><Header/>
    <div className="w-full flex">
      <Sidebar/>
      <Data/>
    </div>
    </>

  )
}

export default Home
