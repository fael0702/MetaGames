import axios from "axios";

const key = "21258690ff12425abae95209cf50b7ab";
const axiosCreate = axios.create({
    baseURL: 'https://api.rawg.io/api'
})

const getGenreList = axiosCreate.get('/genres?key=' + key);
const getAllGames = axiosCreate.get('/games?key=' + key);
const getDetail = axiosCreate.get('/games/3498?key=' + key);
const getGameListByGenreId = (id) => axiosCreate.get('/games?key=' + key + '&genres=' + id)
export default {
    getGenreList,
    getAllGames,
    getGameListByGenreId,
    getDetail
}
