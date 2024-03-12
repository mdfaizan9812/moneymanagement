export function addItem(key, data) {
    localStorage.setItem(key, data);
}

export function getItem(key) {
    const storageData = localStorage.getItem(key);
    if(storageData === "true" || storageData === "false"){
        return storageData == "true"
    }
    return storageData
}

export function removeItem(key) {
    localStorage.removeItem(key);
}