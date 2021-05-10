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


const productService = {

    async getUserProducts() {
        const endPoint = `${url}/api/products`;
        return axios.get(endPoint);
    },

    async getCategories() {
        const endPoint = `${url}/api/categories`
        return axios.get(endPoint);
    },

    async setProduct(data) {
        const endPoint = `${url}/api/products/new`
        return axios.post(endPoint, data, AuthStr);
    }
};

export default productService;