const express = require('express');
const router = express.Router();
const Note = require('../Models/Note');
const { body, validationResult } = require('express-validator');


var  fetchUser = require('../middleware/fetchUser')


// create Notes : login Required
router.post('/addANote',fetchUser,[
    body('title',"Enter a valid Title").isLength({min:3}),
    body('description',"Discription must me more than 5 characters.").isLength({ min: 5 })
],async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {title,description,tag} = req.body;
        const note = new Note({
            title,description,tag,user : req.user.id
        });
        const saveNote = await note.save();
        res.json(note)
    }catch (error) {
        console.log(error);
        res.status(500).send("Inernal Server Error");
    }

})


// get All the Notes
    router.get('/fetchAllNotes',fetchUser,async (req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    }catch (error) {
        console.log(error);
        res.status(500).send("Inernal Server Error");
    }
})


// Update the Notes : login Required
router.put('/updateNote/:id',fetchUser,async (req, res)=>{
    try{
        const {title,description,tag} = req.body;
        const newNote = {};
        if(title){newNote.title =   title}
        if(description){newNote.description =   description}
        if(tag){newNote.tag =   tag}

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);

        // res.send( req.user.id)
        if(!note){return res.status(404).send("Id Not Found")}

        if(note.user.toString() !== req.user.id){return res.status(401).send("User Not Allowed")}

        note=   await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json(note)
    }catch (error) {
        console.log(error);
        res.status(500).send("Inernal Server Error");
    }
})


// Delete the Note : login Required
router.delete('/deleteNote/:id',fetchUser,async (req, res)=>{
    try{
        const {title,description,tag} = req.body;

        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Id Not Found")}

        // Check valid User
        if(note.user.toString() !== req.user.id){return res.status(401).send("User Not Allowed")}


        note=   await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted"})

    }catch (error) {
        console.log(error);
        res.status(500).send("Inernal Server Error");
    }
})

module.exports = router;