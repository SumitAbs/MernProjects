import NoteContext from "./NotesContext";
import {useState} from "react";

const NotesState    = (props) =>{
    const  s1 = {
        "name" : "Sumit",
        "class" : "5b",
    }

    const[state,setState] = useState(s1)
    const update= ()=>{
        setTimeout( ()=>{
            setState({
                "name" : "Shubham",
                "class":  "6b"
            })
        },1000);
    }
    return (
        <NoteContext.Provider value={{state:state,update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;