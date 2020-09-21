/* eslint-disable no-unused-vars */
import {Observable, Subject, BehaviorSubject} from 'rxjs';

let users = [{
  "_id": {
    "$oid": "5f5ce927c420944e3c657e81"
  },
  "username": "s",
  "password": "a",
  "uid": 1,
  "friends": [2],
  "__v": 0
},{
  "_id": {
    "$oid": "5f5ce93bc420944e3c657e82"
  },
  "username": "lostmylife",
  "password": "b",
  "uid": 2,
  "friends": [1, 3],
  "requests": [],
  "__v": 0
},{
  "_id": {
    "$oid": "5f5ce94dc420944e3c657e84"
  },
  "username": "sticks",
  "password": "c",
  "uid": 3,
  "friends": [2],
  "__v": 0
}];


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
    let u = users.find(u => u.username === username);
    let user = {... u};
    if (user) {
        let conversations = getConversationsSimple(user.uid);
        let reqs = getRequests(user.uid);

        user.conversations = conversations;
        user.requests = reqs;
        user.friends = getFriends(user.friends);
        console.log(user);
        console.log(users);
        return user;
    }
    return null;
}

export function getUsername(uid) {
  let user = users.find(u => u.uid === uid);
  if (user) return user.username;
  return null;
}

function getFriends(fl) {
  let friends = [];

  for (let f of fl) {
    friends.push({"uid": f, "name": getUsername(f)});
  }

  return friends;
}



let servers = [{
  "_id": {
    "$oid": "5f5b83a8f485883b58e33aa5"
  },
  "sid": 1,
  "name": "Bjoef Fanclub",
  "members": [
    1,
    2,
    3
  ],
  "channels": [
    {
      "cid": 1,
      "name": "it-fct",
      "history": [
        {
          "mid": 0,
          "user": 1,
          "message": "lol",
          "timestamp": 1599483727
        },
        {
          "mid": 1,
          "user": 2,
          "message": "?",
          "timestamp": 1599483787
        },
        {
          "mid": 2,
          "user": 3,
          "message": "ge stinkt",
          "timestamp": 1599483797
        },
        {
          "mid": 3,
          "user": 3,
          "message": "xd",
          "timestamp": 1599483798
        }
      ]
    },
    {
      "cid": 2,
      "name": "shitpost",
      "history": [
        {
          "mid": 0,
          "user": 2,
          "message": "cava zeep",
          "timestamp": 1599483798
        }
      ]
    },
    {
      "cid": 3,
      "name": "billypaal",
    },
    {
      "cid": 4,
      "name": "rules",
      "history": [
        {
          "mid": 0,
          "user": 1,
          "message": "#1 yentl mag geen gifs spammen",
          "timestamp": 1599483798
        }
      ]
    },
    {
      "cid": 5,
      "name": "Voice"
    },
    {
      "cid": 6,
      "name": "no-yentl",
      "history": [
        {
          "mid": 0,
          "user": 2,
          "message": "no yentls allowed",
          "timestamp": 1599483798
        }
      ]
    }
  ]
},{
  "_id": {
    "$oid": "5f5b83a8f485883b58e33aa6"
  },
  "sid": 2,
  "name": "Minecraft",
  "members": [
    1,
    3
  ],
  "channels": [
    {
      "cid": 1,
      "name": "announcements"
    },
    {
      "cid": 2,
      "name": "discussion"
    },
    {
      "cid": 3,
      "name": "admin"
    }
  ]
},{
  "_id": {
    "$oid": "5f5b83a8f485883b58e33aa7"
  },
  "sid": 3,
  "name": "The Bromo's",
  "members": [2],
  "channels": [
    {
      "cid": 1,
      "name": "general"
    },
    {
      "cid": 2,
      "name": "DnD"
    },
    {
      "cid": 3,
      "name": "Mancave 0/10"
    }
  ]
},{
  "_id": {
    "$oid": "5f5b83a8f485883b58e33aa8"
  },
  "sid": 4,
  "name": "Warframe",
  "members": [
    1
  ],
  "channels": [
    {
      "cid": 1,
      "name": "announcements"
    },
    {
      "cid": 2,
      "name": "discussion"
    }
  ]
}];

const serverList$ = new BehaviorSubject();

function filterServersByUser(userId) {
    return servers.filter(s => s.members.includes(userId));
}

export function getServerListByUser(userId) {
    serverList$.next(filterServersByUser(userId));
    return serverList$;
}

export function getMembers(userIds) {
    const members = users.filter(u => userIds.includes(u.uid)).map(u => {
        return {
            uid: u.uid,
            username: u.username
        }
    });
    return members;
}

export function createServer(serverName, userId) {
    const newServer = {
        sid: servers[servers.length - 1].sid + 1,
        name: serverName,
        members: [userId],
        channels: [
            {
                cid: 1,
                name: "general"
            },
        ]
    }
    servers.push(newServer);
    getServerListByUser(userId);
}

export function joinServer(serverId, userId) {
    serverId = parseInt(serverId);
    const server = servers.find(s => s.sid === serverId);
    if (server) {
        if (!server.members.includes(userId)) {
            server.members.push(userId);
            getServerListByUser(userId);
        }
        return true;
    }
    return false;
}



let conversations = [
  {
    "dmid": 1,
    "members": [1, 2],
    "history": [
      {
        "mid": 1,
        "user": 1,
        "message": "amai dieje yentl",
        "timestamp": 1599924707
      },
      {
        "mid": 2,
        "user": 2,
        "message": "hij is weer aant zagen",
        "timestamp": 1599924708
      },
      {
        "mid": 3,
        "user": 1,
        "message": "yup",
        "timestamp": 1599924710
      },
    ],
    "date-created": 1599406307
  },
  {
    "dmid": 2,
    "members": [1, 2, 3],
    "history": [
      {
        "mid": 1,
        "user": 3,
        "message": "warzone?",
        "timestamp": 1599924707
      },
      {
        "mid": 2,
        "user": 2,
        "message": "nee",
        "timestamp": 1599924708
      },
      {
        "mid": 3,
        "user": 1,
        "message": "nope",
        "timestamp": 1599924710
      },
    ],
    "date-created": 1599924707
  },
  {
    "dmid": 3,
    "members": [1, 3],
    "history": [
      {
        "mid": 1,
        "user": 1,
        "message": "noob",
        "timestamp": 1599924707
      },
      {
        "mid": 2,
        "user": 3,
        "message": "nou xd",
        "timestamp": 1599924708
      }
    ],
    "date-created": 1599579107
  },
];

export function getConversationHistory(dmid) {
  return conversations.find(c => c.dmid === dmid).history;
}

function getConversationsSimple(userId) {
  return conversations.filter(c => c.members.includes(userId)).map(c => {

    let members = c.members.map(m => {
      return {"uid": m, "name": getUsername(m)}
    });

    return { "dmid": c.dmid, members, "date-created": c["date-created"] }
  });
}

let requests = [
  {
    "rid": 1,
    "sender": 3,
    "receiver": 1,
    "timestamp": 1599483727
  }
];


function getRequests(userid) {
  let reqs = requests.filter(r => r.sender === userid || r.receiver === userid);
  return reqs.map(r => {
    return {
      "rid": r.rid,
      "type": r.receiver === userid ? "incoming" : "outgoing",
      "user": r.receiver === userid ? r.sender : r.receiver,
      "timestamp": r.timestamp
    }
  })
}

function deleteRequest(request) {
  requests.splice(requests.indexOf(request), 1);
}

export function addFriend(reqid) {
  const req = requests.find(r => r.rid === reqid);

  const receiver = users.find(u => u.uid === req.receiver);
  const sender = users.find(u => u.uid === req.sender);
  
  receiver.friends.push(sender.uid);
  sender.friends.push(receiver.uid);

  
  deleteRequest(req);
}