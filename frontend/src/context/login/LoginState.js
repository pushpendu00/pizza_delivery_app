import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { base_url } from '../../utils/constant';
import LoginContext from './loginContext';

const LoginState = (props) => {
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [user,setUser] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies(['pizza_only_auth_token']);
    const [reloadUser, setReloadUser] = useState(false);

    useEffect(()=>{
        try{
            // console.log("relode token = ",cookies.pizza_only_auth_token);
            if(cookies.pizza_only_auth_token){
                fun();
            }
        }catch(err){
            return;
        }
    },[reloadUser]);

    async function fun(){
        await setIsAuthenticate(true);
        if(cookies.pizza_only_auth_token){
            let token = cookies.pizza_only_auth_token;
            let res = await fetch(`${base_url}/user`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    token
                }),
            });
            let u = await res.json();
            if(u.status === 200){
                setIsAuthenticate(true);
                setUser(u.user);
            }else if(u.status === 404){
                // render Login page
                // console.log("render",cookies.pizza_only_auth_token);
                removeCookie('pizza_only_auth_token');
                setIsAuthenticate(false);
            }else{
                removeCookie('pizza_only_auth_token');
                alert(u.message);
            }
        }
    }

    return (
        <>
            <LoginContext.Provider value={{isAuthenticate, setIsAuthenticate, user, setUser, cookies, setCookie, removeCookie, reloadUser, setReloadUser}}>
                {props.children}
            </LoginContext.Provider>
        </>
    );
}

export default LoginState;
