import mongoose from 'mongoose'
import Todos from '../models/Todo.list.js'

export const updateTodo = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        todo,
        userId
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product Id"
        })
    }

    try {
        const updatedTodo = await Todos.findOneAndUpdate({
            _id: id,
            userId
        }, {
            todo
        }, {
            new: true
        });
        res.status(200).json({
            success: true,
            data: updatedTodo
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }

}

export const deleteTodo = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        userid
    } = req.body;


    console.log("Delete request received:");
    console.log("ID:", id);
    console.log("userId from body:", userid);
    console.log("userId from query:", req.query.userId);
    console.log("Full body:", req.body);
    console.log("Full query:", req.query);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Todo Id"
        });
    }

    try {
        const deletedTodo = await Todos.findOneAndDelete({
            _id: id,
            userId: userid
        })
        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or not authorized"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted'
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
}

export const getTodos = async (req, res) => {
    const {
        userId
    } = req.query


    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        const todos = await Todos.find({
            userId
        })
        res.status(200).json({
            success: true,
            data: todos
        })
    } catch (error) {
        console.log("error in fetching todos", error.message)
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

export const createTodo = async (req, res) => {

    const {
        todo,
        userId
    } = req.body;



    if (!todo || !userId) {
        return res.status(400).json({
            success: false,
            message: "Todo cannot be empty"
        })
    }


    try {
        const newTodo = new
        Todos({
            todo,
            userId
        });
        await newTodo.save();
        res.status(201).json({
            success: true,
            data: newTodo
        })

    } catch (error) {
        console.log("error in creating Todo", error.message)
        res.status(500).json({
            success: false,
            message: "server error"
        })

    }


}