import axios from 'axios';
import { AuthService } from '.';
const viacepUrl = 'https://viacep.com.br/ws/';
const url = process.env.REACT_APP_BASE_URL;

const AuthData = AuthService.getAuthData();
let AuthStr = {} 

if(AuthData){
     AuthStr = { headers: { Authorization: `${AuthData.token_type} ${AuthData.access_token}` }}
}

const AddressService = {
    async getAddress(cep){
        const endpoint = `${viacepUrl}${cep}/json`;
        return axios.get(endpoint);
    },

    async editStablishmentAddress(data){
        const endpoint = `${url}api/address/stablishment`;
        return axios.put(endpoint, data, AuthStr);
    },
    async editUserAddress(data){
        const endpoint = `${url}api/address/user`
        return axios.post(endpoint, data, AuthStr);
    }

};

export default AddressService;