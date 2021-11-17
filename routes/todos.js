//import dependencies
import express from 'express'
import jwt from 'jsonwebtoken'
import validator from 'express-validator'

//intialize router
const router = express.Router();
const {check, validationResult} = validator;

//import models
import Todo from '../models/Todo.js'

//import middleware
import auth from '../middleware/auth.js'

//@GET - /api/todos - get all todos from database - Private
router.get('/', auth, async(req, res)=>{
    try {
        const todos = await Todo.find({user: req.user.id}).sort({date: -1})
        res.json(todos)
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

//@POST - /api/todos - create new todo - Private
router.post('/', [
    check("text", "Please enter a todo item for the list.").not().isEmpty()
], auth, async(req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {text, important }= req.body;

    try {
        const todoFields = {
            text: text, 
            user: req.user.id,
        }
        if(!important){
            todoFields.important = important;
        }

        const newTodo = new Todo({
            ...todoFields,
        })

        const todo = await newTodo.save();
        res.send(todo);
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

//@PUT - /api/todos/:id - update todo by ID - Private
router.put('/:id', auth, async(req, res)=>{
    const {text, completed, important} = req.body;

    const todoFields = {text, completed, important};

    try {
        let todo = await Todo.findById(req.params.id)

        if(!todo){
            return res.status(404).json({msg: "Todo item not found"})
        }

        if(todo.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Not authorized"})
        }

        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {$set: todoFields},
            {new: true}
        );
        res.json(todo)
    } catch (error) {
        res.status(500).send("Server error")
    }
})

//@DELETE - /api/todos/:id - delete todo by ID - Private
router.delete('/:id', [], auth, async(req, res)=>{
    try {
        let todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(404).json({msg: "Todo not found"})
        }

        if(todo.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Not authorized"})
        }

        await Todo.findByIdAndRemove(req.params.id)
        res.json({msg: "Todo removed"})
    } catch (error) {
        res.status(500).send("Server error")
    }
})


export default router;