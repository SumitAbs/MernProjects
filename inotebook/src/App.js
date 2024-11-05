import './App.css';

import {Navbar} from "./Components/Navbar";
import {Home} from "./Components/Home";
import {About} from "./Components/About";

import {
    Routes,
    Route,
} from "react-router-dom";
import NotesState from "./Context/Notes/NotesState";


function App() {
    return (
        <>
            <NotesState>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>

                    <Route path="/about" element={<About/>}/>
                </Routes>
            </NotesState>
        </>
    );
}

export default App;
