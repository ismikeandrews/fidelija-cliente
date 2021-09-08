import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;

const authService = {

    async authenticate(data){
        const endPoint = `${url}oauth/token`
        return axios.post(endPoint, data);
    },

    async setLoggedUser(data){
        const endPoint = `${url}api/user`
        if(data){
            const res = await axios.get(endPoint, { headers: { Authorization: `${data.token_type} ${data.access_token}` }})
            const stringAuthData = JSON.stringify(data);
            const stringUserData = JSON.stringify(res.data);
            localStorage.setItem("authData", stringAuthData);
            localStorage.setItem("userData", stringUserData);
        }

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
    }
}

export default authService;