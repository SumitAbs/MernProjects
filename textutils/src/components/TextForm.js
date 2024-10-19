import React, {useState} from 'react'

export default function TextForm(){

	const ButtonClick = ()=>{
		let newText = TextArea_text.toUpperCase();
		setTextArea_text(newText);
	}
	const HandleOnChange = (event)=>{
		setTextArea_text(event.target.value);
	}

	// const [text, setText] = useState("This is State Heading2");
	const [TextArea_text, setTextArea_text] = useState("Place Holder");
	// setText("Testing");
	return(
		<div>
			<div className="mb-3">
				<h1>Testing</h1>
				<textarea className="form-control" id="myBox" row="3" value={TextArea_text} onChange={HandleOnChange}></textarea>
				<button onClick={ButtonClick}>Trigger Button Click </button>
			</div>
		</div>
	)
}