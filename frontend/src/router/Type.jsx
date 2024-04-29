import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import LoginContext from '../context/login/loginContext';
import { base_url } from '../utils/constant';
import { postMethod_withBody } from '../utils/methods';

const Type = () => {
    const location = useLocation();
    const loginContext = useContext(LoginContext);
    const [allPizza, setAllPizza] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(()=>{
        // console.log(location.pathname.substring(1));
        HandelAllPizza();
    },[location.pathname,loginContext.reloadUser]);

    async function HandelAllPizza(){
        // console.log("pathname = ",location.pathname)
        setShowSpinner(true);
        if(location.pathname === "/" || location.pathname === ""){
            const response = await fetch(`${base_url}/type`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            const result = await response.json();
            if(result.status === 200){
                setAllPizza(result.all_pizza);
                setShowSpinner(false);
            }else{
                toast.error("Internal Server Down");
            }
            return;
        }
        const response = await fetch(`${base_url}/type/item-type`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                item_type : location.pathname.substring(1),
            }),
        });
        const result = await response.json();
        if(result.status === 200){
            setAllPizza(result.all_pizza);
            setShowSpinner(false);
        }else{
            toast.error("Internal Server Down");
        }
    }


    async function HandelCart(pizza_id){
        const token = loginContext.cookies.pizza_only_auth_token;
        // console.log("Added to cart  ",token);
        const response = await postMethod_withBody('/user/cart/addToCart',{token,pizza_id});
        if(response.status === 200){
            toast.success("Added");
            loginContext.setReloadUser(prev=>!prev);
        }else if(response.status === 401){
            toast.warn(response.message);
        }else if(response.status === 404){
            loginContext.setReloadUser(prev=>!prev);
            toast.warn(response.message);
        }else{
            toast.error(response.message);
        }
    }


    return (
        <>
            {showSpinner?(
                <>
                    <div className='h-full w-full'>
                        Spinner............
                    </div>
                </>
            ):(
                <>
                    {allPizza?.map((pizza,index)=>(
                        <div key={index} className='md:p-4'>
                            <div className='flex'>
                                <img className='h-40 md:h-40 aspect-square' src={pizza.image} alt="pizza" />
                                <div className='pl-2'>
                                    <p className='text-[18px] font-semibold line-clamp-2'>{pizza.itemName}</p>
                                    <p className='flex'>
                                        {pizza.rating}
                                        <Icon icon="material-symbols:star" height={20} />
                                        <Icon icon="material-symbols:star" height={20} />
                                        <Icon icon="material-symbols:star" height={20} />
                                        <Icon icon="material-symbols:star" height={20} />
                                        <Icon icon="material-symbols:star" height={20} />
                                        {/* {pizza.rating} */}
                                        <p>({pizza.votes} Votes)</p>
                                    </p>
                                    <p className='flex items-center'><Icon icon="mdi:rupee" height={16} />{pizza.price}</p>
                                    <p className='line-clamp-2'>{pizza.description}</p>
                                    <button onClick={()=>HandelCart(pizza._id)} className='px-2 py-1 bg-yellow-400 rounded-md'>Add to Cart</button>
                                </div>
                            </div>
                            {/* <div className='w-40 mt-2 flex justify-center items-center'>
                                <div className='bg-[#bababa]'>
                                    <Icon icon="ic:baseline-minus" height={30} />
                                </div>
                                <div className='text-[25px] w-10 text-center'>&nbsp;{0}&nbsp;</div>
                                <div className='bg-[#bababa]'>
                                    <Icon icon="ic:baseline-plus" height={30} />
                                </div>
                            </div> */}
                        </div>
                    ))}
                </>
            )}
            
        </>
    );
}

export default Type;
