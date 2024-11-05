import React, {useContext, useEffect} from "react";
import NoteContext from "../Context/Notes/NotesContext";



export const About = () => {
    const a = useContext(NoteContext)

    useEffect(() =>{
        a.update();
        // eslint-disable-next-line
    },[])
    return (
        <div> This is about :  {a.state.name}, who is in : {a.state.class}</div>
    )
}
export default About