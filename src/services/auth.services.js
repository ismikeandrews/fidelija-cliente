import axios from 'axios';
import moment from 'moment';
const url = process.env.REACT_APP_BASE_URL;

const AuthService = {

    async authenticate(data){
        const endPoint = `${url}oauth/token`
        return axios.post(endPoint, data);
    },

    async getUser(data){
        const endPoint = `${url}api/user`
        return await axios.get(endPoint, { headers: { Authorization: `${data.token_type} ${data.access_token}` }})
    },

    setLoggedUser(userData, token){
        const stringUserData = JSON.stringify(userData);
        const stringAuthData = JSON.stringify(token);
        localStorage.setItem("userData", stringUserData);
        localStorage.setItem("authData", stringAuthData);
    },

    updateLoggedUser(userData){
        const stringUserData = JSON.stringify(userData);
        localStorage.setItem("userData", stringUserData);
    },

    async getUserOff(){
        const { token_type, access_token } = JSON.parse(localStorage.getItem("authData"))
        const AuthStr = {headers: { Authorization: `${token_type} ${access_token}` }}
        const endPoint = `${url}api/user`;
        return await axios.get(endPoint, AuthStr)
    },

    getAuthData(){
        const data = localStorage.getItem("authData");
        if(!data) return null;
        try {
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    getLoggedUser(){
        const data = localStorage.getItem("userData");
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    isAuthenticated(){
        const data = localStorage.getItem("authData");
        if(data){
            return true;
        }else{
            return false;
        }
    },

    clearLoggedUser(){
        const data = localStorage.getItem("authData");
        if (data) {
            localStorage.removeItem("authData");
            localStorage.removeItem("userData");
            return true;
        }else{
            return false;
        }
    },

    async setNewUser(data){
        const endPoint = `${url}api/users/sign-up`;
        return axios.post(endPoint, data)
    },

    async cpfVerifier(cpf){
        return axios.get(`${url}api/registered-user/${cpf}`);
    },
    async recoverPassword(data){
        const endpoint = `${url}api/user/recovery`;
        return axios.post(endpoint, data);
    },

    checkMembership(){
        const user = JSON.parse(localStorage.getItem('userData'))
        console.log(user.stablishment.validity)
        if(user.stablishment.validity === null){
            return false
        }
        if (moment(user.stablishment.validity).isBefore(moment())) {
            return false
        }
        if(moment(user.stablishment.validity).isAfter(moment())){
            return true
        }
    }
}

export default AuthService;