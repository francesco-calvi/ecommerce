import { mockData } from "./mockData";

var users = mockData.users;

const getUsers = function() {
    return users;
}

const getUser = async function(user) {
    return users.find(u => u.email == user.email && u.password == user.password);
}

const addUser = async function(user) {
    user.id == null ? user.id = users.length+1 : user.id;
    users.push(user);
    return this.getUser(user);
}

export const userDao = {
    getUsers,
    getUser,
    addUser
}