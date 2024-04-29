import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContext from '../../context/login/loginContext';
import { base_url } from '../../utils/constant';
import './login_signup_modal.css';

const LoginSignupModal = (props) => {
    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();
    const {setVisible} = props;
    const [isVisible_form, setIsVisible_form] = useState(true);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone,setPhone] = useState('');
    const [password_in, setPassword_in] = useState('');
    const [password_up, setPassword_up] = useState('');
    // let history = useHistory();

    // Sign In funtionality
    const handelSubmit_signin=async(e)=>{
        if(phone === '' || password_in === ''){
            return;
        }

        let res = await fetch(`${base_url}/auth/login`,{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                phone : phone,
                password : password_in
            })
        });
        let response = await res.json();
        // console.log("client = ",response);
        if(response.status === 200){
            // login successfully
            toast.success(response.message);
            loginContext.setCookie("pizza_only_auth_token",response.token);
            setName('');
            setAddress('');
            setPhone('');
            setPassword_in('');
            setPassword_up('');
            setVisible(false);
            loginContext.setReloadUser(prev=>!prev);
        }else if(response.status === 401){
            // Incorrect Password
            toast.warn(response.message);

        }else if(response.status === 404){
            // User not registered
            toast.warn(response.message);

        }else{
            toast.error(response.message);
        }
    }

    // Sign Up funtionality
    async function handelSubmit_signup(){
        if(address === '' || name === '' || phone === '' || password_up === ''){
            return;
        }
        // console.log(name,phone,password_up);
        let res = await fetch(`${base_url}/auth/register`,{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                name : name,
                address,
                phone : phone,
                password : password_up,
            })
        });
        let response = await res.json();
        if(response.status === 200){
            // Show successfully message
            toast.success("Registration Successfully");
            loginContext.setCookie("pizza_only_auth_token",response.token);
            setName('');
            setAddress('');
            setPhone('');
            setPassword_in('');
            setPassword_up('');
            setVisible(false);
            loginContext.setReloadUser(prev=>!prev);
        }else if(response.status === 201){
            // User already loged In
            toast.warn("User Already Exist");
        }else{
            // Register error
            toast.error("Sign Up Error!");
        }
    }


    return (
        <>
            <div className='model-box h-full w-full md:h-[450px] md:w-[400px]'>
                {/* <p>
                    <div>
                        <RxCross2 onClick={()=>setVisible(false)} className='cross-icon'/>
                    </div>
                </p> */}
                <h2>
                    {isVisible_form?"Please Login To Continue":"Please Register To Continue"}
                </h2>
                <div className='change-sign-in-up-div'>
                    {isVisible_form?<div className='button-signIn h-full w-[80%]' >Sign In Page</div>
                    :<div className='button-signUp h-full w-[80%]' >Sign Up Page</div>}
                    
                </div>
                {isVisible_form?(
                    <>
                        <div className='form-div'>
                            {/* onSubmit={(e)=>handelSubmit_signin(e)} */}
                            <div className='input-div'>
                                <input className='px-3 py-2' type='number' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter your phone number' required/>
                            </div>

                            {/* <br/><br/> */}

                            <div className='input-div'>
                                <input className='px-3 py-2' type='password' value={password_in} onChange={(e)=>setPassword_in(e.target.value)} placeholder='Enter password' required/>
                            </div>

                            {/* <br/><br/> */}

                            <button type='submit' onClick={handelSubmit_signin}>Sign In</button>
                        </div>
                        <div className='goto-signup'>
                        Don't have an account? <span  onClick={()=>setIsVisible_form(false)}>Sign Up</span>
                        </div>
                    </>
                    ):(
                <>
                    <div className='form-div'>
                        <div className='input-div'>
                            <input className='px-3 py-2' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter youer Name' required/>
                        </div>

                        <div className='input-div'>
                            <input className='px-3 py-2' type='text' value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Type your Full Address' required/>
                        </div>

                        {/* <br/><br/> */}

                        <div className='input-div'>
                            <input className='px-3 py-2' type='number'  value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your 10 digit's phone number" required/>
                        </div>

                        {/* <br/><br/> */}

                        <div className='input-div'>
                            <input className='px-3 py-2' type='password' value={password_up} onChange={(e)=>{setPassword_up(e.target.value)}} placeholder='Enter password' required/>
                        </div>

                        {/* <br/><br/> */}

                        <button type='submit' onClick={()=>handelSubmit_signup()}>Sign Up</button>
                    </div>
                    <div className='goto-signup'>
                        Already have an account? <span  onClick={()=>{setPassword_in("");setPassword_up("");setIsVisible_form(true)}}>Sign In</span>
                    </div>
                </>
                )}
            </div>
        </>
    );
}

export default LoginSignupModal;
