import axios from 'axios';

const url = 'https://www.receitaws.com.br/v1/cnpj/';

const cnpjService = {

    async getCompanty(cnpj){
        const endpoint = `${url}${cnpj}`
        return axios.get(endpoint);
    }

};

export default cnpjService; 