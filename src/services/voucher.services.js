import axios from 'axios';
import { AuthService } from './';
const url = process.env.REACT_APP_BASE_URL;
const AuthStr = AuthService.getAuthData() && { headers: { Authorization: `${AuthService.getAuthData().token_type} ${AuthService.getAuthData().access_token}` }};

const VoucherService = {
    async getVoucher(id){
        const endpoint = `${url}api/vouchers/${id}`;
        return axios.get(endpoint, AuthStr);
    },
    async completeVoucher(data){
        const enpoint = `${url}api/vouchers`;
        return axios.post(enpoint, data, AuthStr);
    }
}

export default VoucherService;