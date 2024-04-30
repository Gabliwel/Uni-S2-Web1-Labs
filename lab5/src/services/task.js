import { ENDPOINT } from '../utils/utils.js'
import { getUserId } from './user.js'

const getUserEndpoint = async () => {
    const userId = await getUserId()
    return `${ENDPOINT}/${userId}`
}

// Create a task
export const postTask = async (name) => {
    const userEndpoint = await getUserEndpoint()
    const response = await fetch(`${userEndpoint}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    })
    const data = await response.json()
    return data
}

// Read tasks
export const getTasks = async () => {
    const userEndpoint = await getUserEndpoint();
    const response = await fetch(`${userEndpoint}/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data.tasks
}

// Update a task
export const putTask = async (id, name) => {
    const userEndpoint = await getUserEndpoint()
    const response = await fetch(`${userEndpoint}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    })
    const data = await response.json()
    return data
}

// Delete a task
export const deleteTask = async (id) => {
    const userEndpoint = await getUserEndpoint();
    await fetch(`${userEndpoint}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
