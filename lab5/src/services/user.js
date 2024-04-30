import { ENDPOINT } from '../utils/utils.js';

let cachedUserId = null;

export const getUserId = async () => {
    if (cachedUserId !== null) {
        return cachedUserId
    }

    const response = await fetch(`${ENDPOINT}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    cachedUserId = data.id
    return cachedUserId
}
