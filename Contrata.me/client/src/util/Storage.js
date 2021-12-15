
export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const removeItem = (key) => {
    localStorage.removeItem(key)
}

export const getItem = (key) => {
    let value = localStorage.getItem(key)
    return JSON.parse(value);
}

