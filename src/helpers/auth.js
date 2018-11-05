class Auth {
    static checkSession(){
        const userId = sessionStorage.getItem('userId');
        if (userId == null) {
            window.location.href = '/#/login';
        }
    }

    static checkPermission(){
        const userId = sessionStorage.getItem('userId');
        const role = 0;
        
    }

    static setSession(user){
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('userName', user.name);
        sessionStorage.setItem('userEmail', user.email);
    }
}

export default Auth;
