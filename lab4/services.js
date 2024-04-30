const ENDPOINT = 'http://localhost:8080'

// get id
const getUserId = async () => {
    const response = await fetch(
        `${ENDPOINT}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data)
    return data.id
}

const USER_ID = await getUserId()
const USER_ENDPOINT = `${ENDPOINT}/${USER_ID}`

// Task CRUD operations
// create
const postTask = async (name) => {
    const response = await fetch(
        `${USER_ENDPOINT}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
    });
    const data = await response.json()
    console.log(data)
    return data
}

// read
const getTasks = async () => {
    const response = await fetch(
        `${USER_ENDPOINT}/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    console.log(data)
    return data.tasks
}

// update
const putTask = async (id, name) => {
    const response = await fetch(
        `${USER_ENDPOINT}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
    });
    const data = await response.json()
    console.log(data)
    return data
}

// delete
const deleteTask = async (id) => {
    const response = await fetch(
        `${USER_ENDPOINT}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
}

export {
    postTask,
    getTasks,
    putTask,
    deleteTask
}
