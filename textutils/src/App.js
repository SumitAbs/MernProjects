import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';



// import router
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {
    return (
        <> 
            <Navbar title="Sumit Website" />
            <TextForm title="Sumit Website" />


        </>
    );
}

export default App;
