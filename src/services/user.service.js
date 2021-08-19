import { CheckOutlined } from '@material-ui/icons';
import axios from 'axios';
import { authService } from './';

const url = process.env.REACT_APP_BASE_URL;
// const url = 'https://gsk.scel.net.br';

const AuthData = authService.getAuthData();
const UserData = authService.getLoggedUser();

let AuthStr = {} 

if(AuthData){
     AuthStr = { headers: { Authorization: `${AuthData.token_type} ${AuthData.access_token}` }}
}


const userService = {
    async getUserHistory(page, length) {
        const endPoint = `${url}api/user/history?page=${page}&itens=${length}`;
        return axios.get(endPoint, AuthStr);
    },

    async getClientList(page, length) {
        const endPoint = `${url}api/clients/list?page=${page}&itens=${length}`;
        return axios.get(endPoint, AuthStr);
    },

    async getUserProducts() {
        const endPoint = `${url}api/products`;
        return axios.get(endPoint, AuthStr);
    },

    async searchUser(data, page, itens){
        const endPoint = `${url}api/clients/list?filter=${data}&page=${page}&itens=${itens}`;
        return axios.get(endPoint, AuthStr);
    },

    async getHomeInfo(){
        const endPoint = `${url}api/home/data`
        return axios.get(endPoint, AuthStr);
    },

    async getEmployeeInfo(){
        const endPoint = `${url}api/employee-data`;
        return axios.get(endPoint, AuthStr);
    },

    async setCreditCard(data){
        const endPoint = `${url}api/payments/credit-cards/create`
        return axios.post(endPoint, data, AuthStr);
    }, 

    async getCreditCards(){
        const endPoint = `${url}api/payments/credit-cards/list`;
        return axios.get(endPoint, AuthStr);
    },

    
    async deleteCreditCard(id){
        const endPoint = `${url}api/payments/credit-cards/${id}/delete`;
        return axios.delete(endPoint, AuthStr);
    },

    async checkout(data){
        const endPoint = `${url}api/payments/checkout`;
        return axios.post(endPoint, data, AuthStr);
    }
    
};

export default userService;