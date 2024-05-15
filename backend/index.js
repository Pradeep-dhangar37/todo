const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173" // Adjust origin as needed
}));

app.post('/todo', async (req, res) => {
    const createPayLoad = req.body;
    const parsedPayLoad = createTodo.safeParse(createPayLoad);
    if (!parsedPayLoad.success) {
        return res.status(400).json({ msg: "Wrong Inputs" });
    }
    try {
        await todo.create({
            title: createPayLoad.title,
            description: createPayLoad.description,
            completed: false // Set completed to false by default
        });
        return res.status(201).json({ msg: "Todo Created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find();
        return res.json({ todos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

app.put('/completed', async (req, res) => {
    const updatePayLoad = req.body;
    const parsedPayLoad = updateTodo.safeParse(updatePayLoad);
    if (!parsedPayLoad.success) {
        return res.status(400).json({ msg: "Wrong Inputs" });
    }
    try {
        const updatedTodo = await todo.findOneAndUpdate(
            { _id: req.body.id },
            { completed: true },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        return res.json({ msg: "Todo marked as completed", updatedTodo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
