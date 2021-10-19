import axios from 'axios';
import { AuthService } from '.';

const url = process.env.REACT_APP_BASE_URL;

const AuthData = AuthService.getAuthData();


let AuthStr = {} 

if(AuthData){
     AuthStr = { headers: { Authorization: `${AuthData.token_type} ${AuthData.access_token}` }}
}


const ProductService = {

    async getUserProducts(page, item, data) {
        const endPoint = `${url}api/products/list?page=${page}&itens=${item}`;
        return axios.get(endPoint, AuthStr);
    },

    async searchUserProducts(page, item, data) {
        const endPoint = `${url}api/products/list?filter=${data}&page=${page}&itens=${item}`;
        return axios.get(endPoint, AuthStr);
    },

    async getProduct(id){
        const endPoint = `${url}api/products/${id}`
        return axios.get(endPoint, AuthStr);
    },

    async getCategories() {
        const endPoint = `${url}api/products/categories`
        return axios.get(endPoint, AuthStr);
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

export default ProductService;