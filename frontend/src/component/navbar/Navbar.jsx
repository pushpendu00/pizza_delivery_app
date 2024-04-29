import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LoginContext from '../../context/login/loginContext';
import LoginSignupModal from './Login_signup_modal';

const Navbar = () => {
    const [profilename, setProfilename] = useState('');
    const [visible_sidebar, setVisible_sidebar] = useState(false);
    const [isVisible_loginModel, setIsVisible_loginModel] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const Navigate = useNavigate();
    const loginContext = useContext(LoginContext);


    useEffect(()=>{
        setShowProfile(false);
        setProfilename(loginContext.user.name?.charAt(0).toUpperCase());
    },[loginContext.user])


    // Log out function
    async function handelLogout(){
        await loginContext.removeCookie('pizza_only_auth_token');
        loginContext.setIsAuthenticate(false);
        Navigate('/');
    }



    return (
        <>
            <nav className='h-[10vh]  px-2 w-full bg-[#cecece] shadow-md shadow-[#909090] flex items-center justify-between z-10'>
                <div onClick={()=>setVisible_sidebar(true)} className='nav-bar md:hidden cursor-pointer'>
                    <Icon icon="fe:bar" height={30} />
                </div>
                <div className='h-full w-[100px] md:w-[130px]'>
                    <Link to={'/'} className='h-full flex items-center p-2'>
                        <img className='w-full' src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...CIqBFMkR7OwXs1M3EMoAJtlyArjvVv8fs..." alt="pizza only" />
                    </Link>
                </div>
                <div className='h-full w-[calc(100%-100px)] md:w-[calc(100%-130px)] flex justify-between items-center'>
                    {/* Search */}
                    <div className='search relative h-full w-[80%] md:w-[50%] flex items-center'>
                            <Icon className='absolute left-2' icon="mingcute:search-line" height={25} />
                            <input className='w-full md:w-full px-10 py-2 rounded-lg' type="text" placeholder='Search Items........' />
                        </div>

                    {/* for laptop and tab */}
                    <div className='w-[50%] hidden h-full md:flex justify-around items-center px-2'>
                        <NavLink to={'/'} style={({ isActive }) => (
                                {borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                color: isActive ? "rgb(24, 174, 19)" : "#646464",
                                })} className='hidden md:block font-bold' 
                            >Home</NavLink>
                            {loginContext.isAuthenticate?(
                                <NavLink to={'/order'} style={({ isActive }) => (
                                    {borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                    color: isActive ? "rgb(24, 174, 19)" : "#646464",
                                    })} className='hidden md:block font-bold' 
                                >Order</NavLink>
                            ):(<></>)}
                            {/* <NavLink to={'/contact'} style={({ isActive }) => (
                                {borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                color: isActive ? "rgb(24, 174, 19)" : "#646464",
                            })} className='hidden md:block font-bold' 
                            >Contact</NavLink>
                            <NavLink to={'/help'} style={({ isActive }) => (
                                {borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                color: isActive ? "rgb(24, 174, 19)" : "#646464"
                                })} className='hidden md:block font-bold' 
                            >Help</NavLink> */}
                    </div>

                    {loginContext.isAuthenticate?(
                        <>
                            <div className='h-full w-full flex justify-end items-center'>
                                <Link to={'/cart'} className='relative h-full flex items-center px-2 md:pr-5 cursor-pointer'>
                                    <Icon icon="vaadin:cart" height={26}/>
                                    {loginContext.user.cartItem?.length >0?(<div className='absolute top-3 right-0 md:right-3 h-6 w-6 rounded-full flex justify-center items-center bg-[#d86200] font-semibold'>{loginContext.user.cartItem?.length}</div>):(<></>)}
                                </Link>
                                <div onClick={()=>setShowProfile(prev=>!prev)} className='profile h-[55%] hidden md:flex  justify-center items-center cursor-pointer text-[18px] font-bold bg-blue-600 border-2 border-black aspect-square rounded-full'>
                                    {profilename}
                                </div>
                            </div>
                            {showProfile?(
                                <div className='h-[180px] w-[150px] absolute top-[11vh] right-3 z-10 rounded-md shadow-lg shadow-[#2e2d2d] bg-[#ffffff]'>
                                    <div className='p-2 cursor-pointer hover:bg-[#1f1f1f] rounded-sm'>Account</div>
                                            <div className='p-2 cursor-pointer hover:bg-[#1f1f1f] rounded-sm'>Profile</div>
                                            <div className='p-2 cursor-pointer hover:bg-[#1f1f1f] rounded-sm'>Settings</div>
                                            <div className='border-b-[1px] border-[#6c6c6c]'></div>
                                            <div onClick={()=>handelLogout()} className='p-2 hover:bg-[#1f1f1f] rounded-sm cursor-pointer'>Log out</div>
                                </div>
                            ):(<></>)}
                        </>
                    ):(
                        <>
                            <div onClick={()=>setIsVisible_loginModel(true)} className='px-3 py-1 ml-2 bg-[#2887ed] text-[#fff] font-semibold rounded-lg cursor-pointer'>Login</div>
                        </>
                    )}
                </div>
            </nav>

            {loginContext.isAuthenticate?(
                <div className={`${visible_sidebar?('flex'):('hidden')} z-10 h-[100vh] w-[100%] absolute top-0`}>
                <div className='h-full w-[70%] md:w-[30%] bg-[#494949] z-10'>
                    <div className='p-4 text-[#dddddd]'>
                        <div onClick={()=>{setVisible_sidebar(false);Navigate('/')}} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="ant-design:home-filled" className='text-[25px]' />
                            <div className='p-2 cursor-pointer rounded-sm'>Home</div>
                        </div>

                        <div onClick={()=>{setVisible_sidebar(false);Navigate('/Search')}} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="tdesign:search" height={25} />
                            <div className='p-2 rounded-sm cursor-pointer'>Search</div>
                        </div>

                        <div onClick={()=>{setVisible_sidebar(false);Navigate('/cart')}} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="vaadin:cart" height={25} />
                            <div className='p-2 rounded-sm cursor-pointer'>Your Cart</div>
                        </div>

                        <div onClick={()=>{setVisible_sidebar(false);Navigate('/order')}} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="icon-park-twotone:delivery" height={25} />
                            <div className='p-2 rounded-sm cursor-pointer'>Your Order</div>
                        </div>

                        <div onClick={()=>{handelLogout();setVisible_sidebar(false);Navigate('/')}} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="ic:round-logout" height={25} />
                            <div className='p-2 rounded-sm cursor-pointer'>Log Out</div>
                        </div>
                    </div>
                </div>
                <div  onClick={()=>setVisible_sidebar(false)} className='h-full w-[30%] md:w-[70%] bg-black opacity-50 p-20'></div>
            </div>
            ):
            (
                <div className={`${visible_sidebar?('flex'):('hidden')} z-10 h-[100vh] w-[100%] absolute top-0`}>
                <div className='h-full w-[70%] md:w-[30%] bg-[#494949] z-10'>
                    <div className='p-4 text-[#dddddd]'>
                        <div onClick={()=>{setVisible_sidebar(false);Navigate('/')}} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="ant-design:home-filled" className='text-[25px]' />
                            <div className='p-2 cursor-pointer rounded-sm'>Home</div>
                        </div>

                        <div onClick={()=>{setVisible_sidebar(false);Navigate('/Search')}} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="tdesign:search" height={25} />
                            <div className='p-2 rounded-sm cursor-pointer'>Search</div>
                        </div>
                    </div>
                </div>
                <div  onClick={()=>setVisible_sidebar(false)} className='h-full w-[30%] md:w-[70%] bg-black opacity-50 p-20'></div>
            </div>
            )}


            <Modal open={isVisible_loginModel}
            onClose={()=>setIsVisible_loginModel(false)}
                    classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                    }}
                    closeIcon={<></>}
                    center
                    >
                {/* <div className=''> */}
                    <LoginSignupModal setVisible={setIsVisible_loginModel} />
                {/* </div> */}
            </Modal>
        </>
    );
}

export default Navbar;
