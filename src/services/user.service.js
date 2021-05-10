import axios from 'axios';
import { authService } from './';

const url = 'http://127.0.0.1:8000';
// const url = 'https://gsk.scel.net.br';

const AuthData = authService.getAuthData();
const UserData = authService.getLoggedUser();

let AuthStr = {} 

if(AuthData){
     AuthStr = { headers: { Authorization: `${AuthData.token_type} ${AuthData.access_token}` }}
}


const userService = {
    async getUserHistory() {
        const endPoint = `${url}/api/user/history`;
        return axios.get(endPoint, AuthStr);
    },

    async getUserProducts() {
        const endPoint = `${url}/api/products`;
        return axios.get(endPoint, AuthStr);
    },
};

export default userService;