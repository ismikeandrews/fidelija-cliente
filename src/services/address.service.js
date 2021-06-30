import axios from 'axios';

const url = 'https://viacep.com.br/ws/';

const addressService = {

    async getAddress(cep){
        const endpoint = `${url}${cep}/json`
        return axios.get(endpoint);
    }

};

export default addressService;