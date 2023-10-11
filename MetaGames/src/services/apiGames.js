import axios from "axios";

const key = process.env.KEY;
const axiosCreate = axios.create({
    baseURL: 'https://api.rawg.io/api'
})


const getGenreList = axiosCreate.get('/genres?key=' + key);
const getAllGames = axiosCreate.get('/games?key=' + key);
const getDetails = (id) => axiosCreate.get(`/games/${id}?key=` + key); 
const getGameListByGenreId = (id) => axiosCreate.get('/games?key=' + key + '&genres=' + id)

export default {
    getGenreList,
    getAllGames,
    getGameListByGenreId,
    getDetails
}
