import React from 'react';
import useRazorpay from "react-razorpay";
import { toast } from 'react-toastify';
import { postMethod_withBody } from '../utils/methods';

const Payment = () => {
    const [Razorpay] = useRazorpay();

    function HandelBuy(){
        console.log("Click Buy button = ",500)
    }

    const HandlePayment = async (amount) => {
        //  Create order on your backend
        const result = await postMethod_withBody('/order/create-orderid',{amount});
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
            handler: function (response) {
                toast.success("Order Sucessfully");
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
            },
            prefill: {
                name: "Pushpendu Jana",
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


    return (
        <>
            <div>
                This ia Payment page
                <br />
                Rs : 500 <br />
                <button className='border-2 border-[#000] rounded-md px-5 py-1 text-[20px]' onClick={()=>HandlePayment(500)}>Buy</button> <br /> <br />
            </div>
        </>
    );
}

export default Payment;
