import { CheckOutlined } from '@material-ui/icons';
import axios from 'axios';
import { authService } from './';

const url = process.env.REACT_APP_BASE_URL;
// const url = 'https://gsk.scel.net.br';

const AuthData = authService.getAuthData();

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
    },

    async notificationList(page, length){
        const endPoint = `${url}api/notifications/list?page=${page}&itens=${length}`;
        return axios.get(endPoint, AuthStr);
    },

    async notificationRead(id){
        const endPoint = `${url}api/notifications/mark-read/${id}`;
        return axios.put(endPoint, {}, AuthStr);
    }, 

    async notificationMarkAllRead(){
        const endPoint = `${url}api/notifications/mark-all-read`;
        return axios.put(endPoint, {}, AuthStr);
    }, 

    
    async resendLink(data){
        const endPoint = `${url}api/validation/resend`;
        return axios.post(endPoint, data, AuthStr);
    },

    async setNewEmployee(data){
        const endPoint = `${url}api/new-employee`;
        return axios.post(endPoint, data, AuthStr);
    },

    async getEmployees(){
        const endPoint = `${url}api/employees`;
        return axios.get(endPoint, AuthStr);
    },

    async deleteEmployee(id){
        const endPoint = `${url}api/employees/${id}/delete`
        return axios.delete(endPoint, AuthStr);
    },

    async findEmployee(data){
        const endPoint = `${url}api/employee/search`;
        return axios.post(endPoint, data, AuthStr);
    },

    async update(data){
        const endpoint = `${url}api/user`;
        return axios.post(endpoint, data, AuthStr);
    },

    async updateStablishment(data){
        const endpoint = `${url}api/stablishment/update`;
        return axios.post(endpoint, data, AuthStr);
    },
    async getUserByCpf(data){
        const enpoint = `${url}api/user/cpf`
        return axios.post(enpoint, data, AuthStr)
    },
    async registerPoints(data){
        const enpoint = `${url}api/points/stablishment`
        return axios.post(enpoint, data, AuthStr);
    },
};

export default userService;