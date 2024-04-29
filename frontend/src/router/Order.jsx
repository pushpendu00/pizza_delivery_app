import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import LoginContext from '../context/login/loginContext';

import { Link } from 'react-router-dom';

const Order = () => {
    const loginContext = useContext(LoginContext);


    function reloadOrderPage(){
        loginContext.setReloadUser(prev=>!prev);
    }
    return (
        <>
            {/* <Navbar /> */}

            <div className=' w-full'>
                <div className='w-full'>
                    {/* <Link to={'/order/history'}>history</Link> <br />
                    <Link to={'/order/item'}>items</Link> */}
                    {/* {console.log(loginContext.user.order)} */}
                    <div className='flex flex-col gap-3 px-3 py-5'>
                        <div className='flex justify-between'>
                            <Link to={'/'}>
                                <button className='px-2 py-1 border-2 border-[#6e6e6e] rounded-lg'>{'< '}Back</button>
                            </Link>

                            <button onClick={()=>reloadOrderPage()} className='px-2 py-1 border-2 border-[#6e6e6e] rounded-lg'>Reload</button>
                        </div>
                        {loginContext.user.order?.map((eachOrder, index)=>(
                            <div className='p-2 border-2 border-[#ff4ba5] rounded-md'>
                                    <div>
                                        <div className='flex flex-col lg:flex-row'>
                                            <div className='w-full'>
                                                    {eachOrder.order.map((item, index1)=>(<>
                                                    <span className='text-[#ff3535]'>{'# ' + eachOrder.order_Id}</span> <br />
                                                    {item.quantity + " x " + item.pizza.itemName} <br />
                                                </>))}
                                                {eachOrder.cheese > 0?(<>{eachOrder.cheese + " x Cheese"}</>):(<></>)}
                                            </div>
                                            {!eachOrder.delivery?(
                                                <div className='w-full flex p-3 gap-5'>
                                                    {/* Order-----Picked-----On the way-----Delivered */}
                                                    <div className='mt-[5px] h-[215px] w-[3px] flex flex-col items-center'>
                                                        <div className='w-3 h-3 rounded-full bg-[#6bd345]'></div>
                                                        <div className={`w-full h-[${eachOrder.orderStatus-5}%] bg-[#6bd345]`}></div>
                                                        {/* <div className='w-3 h-3 rounded-full bg-[#6bd345]'></div> */}
                                                        {/* <div className='w-3 h-3 rounded-full bg-[#6bd345]'></div> */}
                                                    </div>
                                                    <div className='w-[250px]flex flex-col items-end'>
                                                        <div className='h-[50px]'>Order Confirmed</div>
                                                        <div className='h-[50px]'>Picked Order</div>
                                                        <div className='h-[50px]'>Processing</div>
                                                        <div className='h-[50px]'>Out for Delivery</div>
                                                        <div className='h-[50px]'>Delivered</div>
                                                    </div>
                                                    {/* {eachOrder.orderStatus.map((orderStatus, index2)=>(
                                                        
                                                    ))} */}
                                                </div>
                                            ):(
                                            <div className='text-[#43b934]'>
                                                Delivered
                                            </div>)}
                                        </div>
                                        <div className='border-b-[1px] border-dashed border-[#2466f3]'></div>
                                        <div className='flex justify-between'>
                                            <span className='text-[14px]'>{eachOrder.date}</span>
                                            <span className='flex items-center text-[14px]'><Icon icon="mdi:rupee" height={14} />{eachOrder.amount}</span>
                                        </div>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className=' w-full bg-pink-300'>
                    <Outlet />
                </div> */}
            </div>
        </>
    );
}

export default Order;
