const username = 'input[type="text"]'
const password = 'input[type="password"]'
const submit = '#login-submit'
export class allObject{
    getUserName(){
        return username;
    }
    getPassword(){
        return password;
    }
    getSubmit(){
        return submit;
    }
}