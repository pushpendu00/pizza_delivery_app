import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import useRazorpay from "react-razorpay";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContext from '../context/login/loginContext';
import { postMethod_withBody } from '../utils/methods';


const Cart = () => {
    const loginContext = useContext(LoginContext);
    const Navigate = useNavigate();
    const [Razorpay] = useRazorpay();
    const [orderAmount, setOrderAmount] = useState(0);
    const [cartItem, setCartItem] = useState(loginContext.user.cartItem);
    const [orderSpinner, setOrderSpinner] = useState(false);
    const [cheeseCount, setCheeseCount] = useState(0);


    useEffect(()=>{
        // console.log(cartItem)
        Total_Amount_Calculate_Fun();
    },[loginContext.user.cartItem]);


    async function Total_Amount_Calculate_Fun(){
        let amount = 0;
        loginContext.user.cartItem?.map((item)=>{
            amount += item.quantity*item.pizza.price;
        });
        setOrderAmount(amount);
    }


    const HandlePayment = async (cartItem,amount) => {
        // console.log(loginContext.user.cartItem);
        const token = loginContext.cookies.pizza_only_auth_token;
        if(!token){
            toast.warn("Please refresh your page and  Login");
            return;
        }
        if(amount === 0){
            toast.warn("please choose items");
            return;
        }

        const address = prompt("Your Delivery address",loginContext.user.address);
        if(address == null){
            return;
        }
        //  Create order on your backend
        const result = await postMethod_withBody('/order/create-orderid',{token, cartItem, amount});
        if(result.status === 401){
            toast.warn(result.message);
        }else if(result.status === 502){
            toast.error(result.message);
        }
        // console.log(result);
        const options = {
            // Enter the Key ID generated from the Dashboard
            key: "rzp_test_l4dQdaUvFxpwOy",
            // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            amount: result.order.amount,
            currency: "INR",
            name: "Pizza Only",
            description: "Test Transaction",
            image: "https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...CIqBFMkR7OwXs1M3EMoAJtlyArjvVv8fs...",
            //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            order_id: result.order.id,
            handler: async function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                await createOrder(token, loginContext.user.cartItem, cheeseCount, address, amount, response.razorpay_payment_id, response.razorpay_order_id);
            },
            prefill: {
                name: "Pupai J",
                email: "pushpendujana007.com",
                contact: "8336870054",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
            };
        
            const rzp1 = new Razorpay(options);
        
            rzp1.on("payment.failed", function (response) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            toast.error("Payment Failed");
            });
        
            rzp1.open();
    }


    async function createOrder(token, cartItem, cheese, address, amount, payment_Id, order_Id){
        // console.log("hello")
        const result = await postMethod_withBody('/order/create-order',{token, cartItem, cheese, address, amount, payment_Id, order_Id});
        // console.log(result);
        if(result.status === 200){
            setCheeseCount(0);
            loginContext.setReloadUser(prev=>!prev);
            toast.success("Order Sucessfully");
            Navigate('/order');
        }else if(result.status === 401){
            toast.warn(result.message);
            // loginContext.removeCookie('pizza_only_auth_token');
        }else{
            toast.error(result.message);
        }
    }

    async function increment_quantity(pizza_id, quantity){
        if(quantity === 10){
            toast.warn("Maximum quantity must be 10");
            return;
        }
        const token = loginContext.cookies.pizza_only_auth_token;
        const response = await postMethod_withBody('/user/cart/increment-item',{token, pizza_id});
        if(response.status === 200){
            loginContext.setReloadUser(prev=>!prev);
        }else if(response.status === 401){
            toast.warn(response.message);
            // window.location.reload();
            // Navigate('/');
            // loginContext.removeCookie('pizza_only_auth_token');
        }else{
            toast.error(response.message);
        }
    }

    async function decrement_quantity(pizza_id, quantity){
        if(quantity === 1){
            toast.warn("Minimum quantity must be 1");
            return;
        }
        const token = loginContext.cookies.pizza_only_auth_token;
        const response = await postMethod_withBody('/user/cart/decrement-item',{token, pizza_id});
        if(response.status === 200){
            loginContext.setReloadUser(prev=>!prev);
        }else if(response.status === 401){
            toast.warn(response.message);
            // window.location.reload();
            // Navigate('/');
        }else{
            toast.error(response.message);
        }
    }

    async function removeFromCart(itemId){
        const token = loginContext.cookies.pizza_only_auth_token;
        const result = await postMethod_withBody('/user/cart/remove-item',{token,itemId});
        if(result.status === 200){
            loginContext.setReloadUser(prev=>!prev);
        }else if(result.status === 401){
            toast.warn(result.message);
            // window.location.reload();
            // Navigate('/');
        }else{
            toast.error(result.message);
        }
    }


    return (
        <>
            <div className='w-full min-h-full'>
                <div className='sticky top-0 w-full flex justify-center bg-white py-2 shadow-md shadow-[#656565]'>
                    <button onClick={()=>HandlePayment(cartItem, orderAmount+(cheeseCount*10))} className='h-[60px] w-[200px] flex justify-around items-center bg-[#24aa22] text-[#fff] rounded-md'>
                        <div className='text-center'>
                            <p>{orderAmount+(cheeseCount*10)}</p>
                            <p>Total</p>
                        </div>
                        <div className='text-[22px] flex items-center'>Place Order</div>
                    </button>
                </div>

                {/* {loginContext.user.cartItem?.length <=0?(
                    <>
                        <div className='w-full text-center'>Empty</div>
                    </>
                    ):(<></>)} */}

                    {/* Add Extra Chees */}
                {loginContext.user.cartItem?.length >=1 && cheeseCount<=0?(
                    <div className='px-5 py-2 md:px-10'>
                        <div className='w-full flex justify-center'>
                            <button onClick={()=>setCheeseCount(prev=>prev+1)} className='px-3 py-1 bg-[#5ddc6e]'>Add extra cheese {'>'}</button>
                        </div>
                    </div>
                ):(
                    <Link to={'/'}>
                        <div className='mt-10 w-full text-center p-2 bg-[#028a6b] text-[#fff] cursor-pointer'>Choose Your Favourite Items</div>
                    </Link>
                )}

                {cheeseCount>0?(
                    <>
                        <div className='w-full flex gap-3 justify-center items-center'>
                            <img className='h-20 aspect-square' src="https://imgs.search.brave.com/cB-FizDssz1-rwo-W-f2187j99S2N04q-YFwAok0Si0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxWkpnNHFJUGRM/LmpwZw" alt="cheese" />
                            <div>
                                <p className='text-[18px] font-semibold line-clamp-2'>Cheese</p>
                                    <p className='flex items-center'><Icon icon="mdi:rupee" height={16} />10</p>
                            </div>
                            <div>
                                <div className='flex items-center justify-between border-[1px] border-red-400 rounded-md'>
                                    <button onClick={()=>setCheeseCount(prev=>prev-1)}><Icon className='p-2' icon="ic:baseline-minus" height={35} /></button>
                                    <p>{cheeseCount}</p>
                                    <button onClick={()=>setCheeseCount(prev=>prev+1)}><Icon className='p-2' icon="ic:baseline-plus" height={35} /></button>
                                </div>
                                <div className='text-center'>{10*cheeseCount}</div>
                            </div>
                        </div>

                    </>
                ):(<></>)}

                {/* All Cart pizza */}
                {loginContext.user.cartItem?.map((item, index)=>(
                    <div key={index} className='px-5 py-2 md:px-10'>
                        <div className='flex'>
                            <img className='h-40 md:h-40 aspect-square' src={item.pizza.image} alt="pizza" />
                            <div className='w-full pl-2'>
                                <p className='text-[18px] font-semibold line-clamp-2'>{item.pizza.itemName}</p>
                                <p className='flex items-center'><Icon icon="mdi:rupee" height={16} />{item.pizza.price}</p>
                                <p className='line-clamp-1 md:line-clamp-2'>{item.pizza.description}</p>
                                <div className='w-full flex justify-between'>
                                    <div>
                                        <button onClick={()=>removeFromCart(item._id)} className='px-2 py-1 rounded-md text-[#fff] bg-[#f34b4b] hover:bg-[#dc4b4b]'>Remove</button>
                                    </div>
                                    <div>
                                        <div className='flex items-center justify-between border-[1px] border-red-400 rounded-md'>
                                            <button onClick={()=>decrement_quantity(item.pizza._id, item.quantity)}><Icon className='p-2' icon="ic:baseline-minus" height={35} /></button>
                                            <p>{item.quantity}</p>
                                            <button onClick={()=>increment_quantity(item.pizza._id, item.quantity)}><Icon className='p-2' icon="ic:baseline-plus" height={35} /></button>
                                        </div>
                                        <div className='text-center'>{item.pizza.price*item.quantity}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex'>
                            {/* <div className='flex items-center justify-between border-[1px] border-red-400 rounded-md'>
                                <button onClick={()=>decrement_quantity(item.pizza._id, item.quantity)}><Icon className='p-2' icon="ic:baseline-minus" height={35} /></button>
                                <p>{item.quantity}</p>
                                <button onClick={()=>increment_quantity(item.pizza._id, item.quantity)}><Icon className='p-2' icon="ic:baseline-plus" height={35} /></button>
                            </div> */}
                            {/* <div className='w-40 mt-2 flex justify-center items-center'>
                                <div onClick={()=>decrement_quantity(item.pizza._id, item.quantity)} className='bg-[#bababa] cursor-pointer'>
                                    <Icon icon="ic:baseline-minus" height={35} />
                                </div>
                                <div className='text-[30px] w-10 flex justify-center'>&nbsp;{item.quantity}&nbsp;</div>
                                <div onClick={()=>increment_quantity(item.pizza._id, item.quantity)} className='bg-[#bababa] cursor-pointer'>
                                    <Icon icon="ic:baseline-plus" height={35} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Cart;
