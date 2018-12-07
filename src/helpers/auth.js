class Auth {
    static checkSession(){
        const userId = sessionStorage.getItem('userEmail');
        if (userId == null) {
            window.location.href = '/#/login';
        }
    }

    static checkPermission(){
        const userId = sessionStorage.getItem('userId');
        const role = 0;
        
    }

    static setSession(user, type){
        sessionStorage.setItem('userName', user.name);
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userType', 'P');
    }
}

export default Auth;
