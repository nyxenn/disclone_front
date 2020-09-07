/* eslint-disable no-unused-vars */
let users = [
    {
        id: 1,
        'username': 's',
        'password': 'a'
    },
    {
        id: 2,
        'username': 'lostmylife',
        'password': 'beta'
    },
    {
        id: 3,
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

export function getUserInformation(username) {
    let user = users.find(u => u.username === username);
    if (user) {
        return user;
    }
    return null;
}



let servers = [
    {
        id: 1,
        name: "Bjoef Fanclub",
        members: [1, 2, 3],
        channels: [
            {
                id: 1,
                name: "it-fct",
                default: true,
                history: [
                    {
                        id: 0,
                        user: 1,
                        message: "lol",
                        timestamp: 1599483727
                    },
                    {
                        id: 1,
                        user: 2,
                        message: "?",
                        timestamp: 1599483787
                    },
                    {
                        id: 2,
                        user: 3,
                        message: "ge stinkt",
                        timestamp: 1599483797
                    },
                    {
                        id: 3,
                        user: 3,
                        message: "xd",
                        timestamp: 1599483798
                    },
                ]
            },
            {
                id: 2,
                name: "shitpost",
                default: false,
                history: [
                    {
                        id: 0,
                        user: 2,
                        message: "cava zeep",
                        timestamp: 1599483798
                    }
                ]
            },
            {
                id: 3,
                name: "billypaal",
                default: false,
            },
            {
                id: 4,
                name: "rules",
                default: false,
                history: [
                    {
                        id: 0,
                        user: 1,
                        message: "#1 yentl mag geen gifs spammen",
                        timestamp: 1599483798
                    }
                ]
            },
            {
                id: 5,
                name: "Voice",
                default: false,
            },
            {
                id: 6,
                name: "no-yentl",
                default: false,
                history: [
                    {
                        id: 0,
                        user: 2,
                        message: "no yentls allowed",
                        timestamp: 1599483798
                    }
                ]
            },
        ]
    },
    {
        id: 2,
        name: "Minecraft",
        members: [1, 3],
        channels: [
            {
                id: 1,
                name: "announcements",
                default: false,
            },
            {
                id: 2,
                name: "discussion",
                default: true,
            },
            {
                id: 3,
                name: "admin",
                default: false,
            },
        ]
    },
    {
        id: 7,
        name: "The Bromo's",
        members: [2],
        channels: [
            {
                id: 1,
                name: "general",
                default: true,
            },
            {
                id: 2,
                name: "DnD",
                default: false,
            },
            {
                id: 3,
                name: "Mancave 0/10",
                default: false,
            }
        ]
    },
    {
        id: 10,
        name: "Warframe",
        members: [1],
        channels: [
            {
                id: 1,
                name: "announcements",
                default: false,
            },
            {
                id: 2,
                name: "discussion",
                default: false,
            },
        ]
    }
];

export function getServerListByUser(userid) {
    return servers.filter(s => s.members.includes(userid));
}

export function getMembers(userIds) {
    const members = users.filter(u => userIds.includes(u.id)).map(u => {
        return {
            id: u.id,
            username: u.username
        }
    });
    return members;
}