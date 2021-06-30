import axios from 'axios';

const url = 'http://127.0.0.1:8000';

const authService = {

    async authenticate(data){
        const endPoint = `${url}/oauth/token`
        return axios.post(endPoint, data);
    },

    async setLoggedUser(data){
        const endPoint = `${url}/api/user`
        let res;
        if(data){
            res = await axios.get(endPoint, { headers: { Authorization: `${data.token_type} ${data.access_token}` }})
            console.log(res)
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
        const endPoint = `${url}/api/users/sign-up`;
        return axios.post(endPoint, data)
    }

}

export default authService;