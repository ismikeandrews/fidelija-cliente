import axios from 'axios';
import { authService } from './';

const url = process.env.REACT_APP_BASE_URL;

const AuthData = authService.getAuthData();


let AuthStr = {} 

if(AuthData){
     AuthStr = { headers: { Authorization: `${AuthData.token_type} ${AuthData.access_token}` }}
}


const productService = {

    async getUserProducts() {
        const endPoint = `${url}api/products/list`;
        return axios.get(endPoint, AuthStr);
    },

    async getCategories() {
        const endPoint = `${url}api/categories`
        return axios.get(endPoint);
    },

    async setProduct(data) {
        const endPoint = `${url}api/products/create`;
        return axios.post(endPoint, data, AuthStr);
    },

    async editProduct(data, id){
        const endPoint = `${url}api/products/${id}/edit`;
        return axios.post(endPoint, data, AuthStr);
    },

    async deleteProduct(id){
        const endPoint = `${url}api/products/${id}/delete`;
        return axios.delete(endPoint, AuthStr);
    },

    async pauseProduct(id){
        const endPoint = `${url}api/products/${id}/toggle-active`
        return axios.put(endPoint, {} ,AuthStr);
    }

};

export default productService;