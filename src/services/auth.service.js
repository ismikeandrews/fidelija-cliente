import axios from 'axios';

const url = 'https://gsk.scel.net.br';

const authService = {

    async authenticate(data){
        const endPoint = `${url}/users/sign-in`
        return axios.post(endPoint, data);
    },

    setLoggedUser(data){
        const stingData = JSON.stringify(data);
        localStorage.setItem("user", stingData);
    },

    getLoggedUser(){
        const data = localStorage.getItem("user");
        if(!data) return null;
        try {
            let parsedData = JSON.parse(data);
            return parsedData;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    isAuthenticated(){
        const data = localStorage.getItem("user");
        if(data){
            return true;
        }else{
            return false;
        }
    }

}

export default authService;