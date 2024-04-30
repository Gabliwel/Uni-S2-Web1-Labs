const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())

let users = []

const findUserById = (userId) => {
    return users.find(user => user.id === userId)
}

const findTaskById = (user, taskId) => {
    return user.tasks.find(task => task.id === taskId)
}


app.post('/users', (req, res) => {
    const newUser = {
        id: uuidv4(),
        tasks: []
    };
    users.push(newUser);
    res.json({ id: newUser.id })
})


app.get('/:userId/tasks', (req, res) => {
    const { userId } = req.params
    const user = findUserById(userId)
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    const tasks = user.tasks.map(task => ({ id: task.id, name: task.name }))
    res.json({ tasks: tasks })
})


app.post('/:userId/tasks', (req, res) => {
    const { userId } = req.params
    const { name } = req.body
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Name must not be empty' })
    }
    const user = findUserById(userId)
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    const newTask = {
        id: uuidv4(),
        name: name
    }
    user.tasks.push(newTask)
    res.status(201).json({ id: newTask.id, name: newTask.name })
})


app.put('/:userId/tasks/:id', (req, res) => {
    const { userId, id } = req.params
    const { name } = req.body;
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Name must not be empty' })
    }
    const user = findUserById(userId)
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    const task = findTaskById(user, id)
    if (!task) {
        return res.status(404).json({ error: 'Task not found' })
    }
    task.name = name
    res.json({ id: task.id, name: task.name })
})

app.delete('/:userId/tasks/:id', (req, res) => {
    const { userId, id } = req.params
    const user = findUserById(userId)
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    const index = user.tasks.findIndex(task => task.id === id)
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' })
    }
    user.tasks.splice(index, 1)
    res.sendStatus(204)
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
