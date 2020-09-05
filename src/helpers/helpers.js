/* eslint-disable no-unused-vars */
let users = [
    {
        'username': 'swakke007',
        'password': 'alpha'
    },
    {
        'username': 'lostmylife',
        'password': 'beta'
    },
    {
        'username': 'sticks',
        'password': 'omega'
    }
]


export function login(username, password) {
    let user = users.find(u => u.username === username.toLowerCase());
    if (user && user.password === password) {
        return true;
    }
    return false;
}

export function register(username, password) {
    let user = users.find(u => u.username === username.toLowerCase());
    if (!user) {
        users.push({username: username.toLowerCase(), password})
        return true;
    }
    return false;
}