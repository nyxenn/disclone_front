# Changelog

## 08/10/2020
### Added
- Channel creation, deletion
- Server deletion
- Server inviting
- Added v-tooltip, vue-clipboard2 to project

## 26/09/2020
### Added
- Added socket.io to project
- Chatting in channels or DMs with the use of socket.io for real-time messaging
### Changed
- Updated friend requests to work with socket.io

## 21/09/2020
### Added
- Startpage shows friend list, friend requests
- Added user, servers, friends, requests, conversations to vuex store
- Added axios, vuex to project
### Changed
- Refactored project file tree slightly
- Updated many components to interact with backend instead of test data in helpers.js

## 14/09/2020
### Added
- Startpage overview
- Startpage friend view
- Direct message ('dm') view and list
- Test data for dms ('conversations') in helpers.js
- Helper functions for testing conversations and friends
### Updated
- Restructured project file tree
- Added simplified data where needed to older test functions in helpers.js

## 09/09/2020
### Added
- Server joining by server id
- Server creation
- Helper functions for joining and creating servers
- Added rxjs to project
### Updated
- Changed user server list to be an observable

## 07/09/2020
### Added
- Server list for user
- Channel list for server
- Member list for server
- Chat history for channel
- User information tag
- Start for adding servers to list (joining or creating)
- Helper functions for testing server and channel-member listing
- Added vue-js-modal to project

## 05/09/2020
### Added
- Register form
- Login form
- Login and register testing helper functions
- Set up git repository