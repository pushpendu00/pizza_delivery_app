import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { base_url } from '../constant';

const PastOrder = () => {
    const [reloadPage, setReloadPage] = useState(false);
    const [past_order, setPast_order] = useState();

    useEffect(()=>{
        onLoadFun();
    },[reloadPage]);

    async function onLoadFun(){
        const res = await fetch(`${base_url}/admin/past-order`);
        const result = await res.json();
        if(result.status === 200){
            // console.log(result.past_order);
            setPast_order(result.past_order);
        }else{
            toast.warn(result.status,{autoClose : 2000});
        }
    }

    return (
        <div className='past-order h-full w-full px-2 py-5'>
            <div className='mb-10 w-full flex justify-between'>
                <Link to={'/'}>
                    <button className='px-3 py-2  border-2 border-[#5b5b5b] rounded-lg'>{'< '}Back</button>
                </Link>
                <div className='text-[25px]'>Past Order</div>

                <button onClick={()=>setReloadPage(prev=>!prev)} className='px-2 py-1 border-2 border-[#6e6e6e] rounded-lg'>Reload</button>
            </div>

            <div className='flex flex-col gap-5'>
                {past_order?.map((eachOrder,index)=>(
                    <div key={index} className='p-2 border-2 border-[#ff4ba5] rounded-md'>
                        {/* <div> */}
                            <div className='flex flex-col lg:flex-row'>
                                <div className='w-full'>
                                        {eachOrder.order.map((item, index1)=>(
                                        <div key={index1}>
                                            <span className='text-[#ff3535]'>{'# ' + eachOrder.order_Id}</span> <br />
                                            phone : {eachOrder.user.phone} <br />
                                            Delivery Address : {eachOrder.address} <br /> <br />
                                            <hr />
                                            {item.quantity + " x " + item.pizza.itemName} <br />
                                        </div>
                                    ))}
                                    {eachOrder.cheese > 0?(<>{eachOrder.cheese + " x Cheese"}</>):(<></>)}
                                </div>
                                {!eachOrder.delivery?(
                                    <div className='w-full flex p-3 gap-5'>

                                        <div className='mt-[5px] h-[215px] w-[3px] flex flex-col items-center'>
                                            <div className='w-3 h-3 rounded-full bg-[#6bd345]'></div>
                                            <div className={`w-full h-[${eachOrder.orderStatus-5}%] bg-[#6bd345]`}></div>
                                            
                                        </div>
                                        <div className='w-[250px]flex flex-col items-end'>
                                            <div className='h-[50px]'>Order Confirmed</div>
                                            <div className='h-[50px]'>Picked Order</div>
                                            <div className='h-[50px]'>Processing</div>
                                            <div className='h-[50px]'>Out for Delivery</div>
                                            <div className='h-[50px]'>Delivered</div>
                                        </div>
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
                        {/* </div> */}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default PastOrder;
