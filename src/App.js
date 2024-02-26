import Data from "./components/Data";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="">
    <Header/>
    <div className="w-full flex">
      <Sidebar/>
      <Data/>
    </div>

    </div>
  );
}

export default App;
