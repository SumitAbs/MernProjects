import './App.css';

import {Navbar} from "./Components/Navbar";
import {Home} from "./Components/Home";
import {About} from "./Components/About";

import {
    Routes,
    Route,
} from "react-router-dom";


function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>

                <Route path="/about" element={<About/>}/>
            </Routes>
        </>
    );
}

export default App;
