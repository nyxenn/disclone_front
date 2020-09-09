/* eslint-disable no-unused-vars */
import {Observable, Subject, BehaviorSubject} from 'rxjs';

let users = [
    {
        id: 144,
        'username': 's',
        'password': 'a'
    },
    {
        id: 233,
        'username': 'lostmylife',
        'password': 'beta'
    },
    {
        id: 399,
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
        members: [144, 233, 399],
        channels: [
            {
                id: 1,
                name: "it-fct",
                default: true,
                history: [
                    {
                        id: 0,
                        user: 144,
                        message: "lol",
                        timestamp: 1599483727
                    },
                    {
                        id: 1,
                        user: 233,
                        message: "?",
                        timestamp: 1599483787
                    },
                    {
                        id: 2,
                        user: 399,
                        message: "ge stinkt",
                        timestamp: 1599483797
                    },
                    {
                        id: 3,
                        user: 399,
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
                        user: 233,
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
                        user: 144,
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
                        user: 233,
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
        members: [144, 399],
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
        members: [233],
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
        members: [144],
        channels: [
            {
                id: 1,
                name: "announcements",
                default: true,
            },
            {
                id: 2,
                name: "discussion",
                default: false,
            },
        ]
    }
];

const serverList$ = new BehaviorSubject();

function filterServersByUser(userId) {
    return servers.filter(s => s.members.includes(userId));
}

export function getServerListByUser(userId) {
    serverList$.next(filterServersByUser(userId));
    return serverList$;
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

export function createServer(serverName, userId) {
    const newServer = {
        id: servers[servers.length - 1].id + 1,
        name: serverName,
        members: [userId],
        channels: [
            {
                id: 1,
                name: "general",
                default: true,
            },
        ]
    }
    servers.push(newServer);
    getServerListByUser(userId);
}

export function joinServer(serverId, userId) {
    serverId = parseInt(serverId);
    const server = servers.find(s => s.id === serverId);
    if (server) {
        if (!server.members.includes(userId)) {
            server.members.push(userId);
            getServerListByUser(userId);
        }
        return true;
    }
    return false;
}