/** @format */

import axios from "axios";

const baseURL = "https://json-server-kohl-delta-49.vercel.app/users";

const getAllUsers = () => axios.get(baseURL);
const getUserById = (userId) => axios.get(`${baseURL}/${userId}`);
const addNewUser = (user) => axios.post(`${baseURL}`, user);
const editUser = (userId, user) => axios.put(`${baseURL}/${userId}`, user);
const deleteUser = (userId) => axios.delete(`${baseURL}/${userId}`);

export { getAllUsers, getUserById, addNewUser, editUser, deleteUser };
