import Data from "./components/Data";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Sidebar from "./components/Sidebar";
import FileContext from "./Context/FileContext";

function App() {
  return (
   <FileContext>
     <div className="">
    <Home/>
    </div>
   </FileContext>
  );
}

export default App;
