const BASE_URL = "https://jsonplaceholder.typicode.com";
const API = {
    getPosts: async function () {
        try {
            const responce = await fetch(`${BASE_URL}/posts`);
            const data = await responce.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    getUsers: async function () {
        try {
            const responce = await fetch(`${BASE_URL}/users`);
            const data = await responce.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    getPhotos: async function () {
        try {
            const responce = await fetch(`${BASE_URL}/photos`);
            const data = await responce.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
};
export default API;
