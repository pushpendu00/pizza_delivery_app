import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Home = () => {
    // const location = useLocation();

    return (
    <>
        <div className='relative w-full flex flex-wrap gap-5'>
            <div className='h-[40vh] w-full mb-[10px]'>
                {/* <div className='p-3 text-[25px] font-semibold text-amber-700'>Offer Zone</div> */}
                <Slide slidesToScroll={1} slidesToShow={1} arrows={false} indicators={true}>
                    <div className='h-80 w-full bg-[url("https://www.dominos.co.in/blog/wp-content/uploads/2022/12/Blog-Banner-2.jpg")] bg-center bg-cover bg-transparent'>
                        {/* <img src="https://www.dominos.co.in/blog/wp-content/uploads/2022/12/Blog-Banner-2.jpg" alt="" /> */}
                    </div>
                    <div className='h-80 w-full bg-[url("https://cdn4.singleinterface.com/files/enterprise/coverphoto/1093/PH-Offer-249-08-01-24-11-40-26.jpg")] bg-center bg-cover'></div>
                    <div className='h-80 w-full bg-[url("https://www.oneindia.com/img/1200x60x675/2017/10/coupon-article-oct-19-1-19-1508395452.jpg")] bg-center bg-cover'></div>
                    <div className='h-80 w-full bg-[url("https://assets.indiadesire.com/images/pizza%20hut%20friday%20offers.jpg")] bg-center bg-cover'></div>
                </Slide>
            </div>
            <div className='relative md:flex w-[100%] md:mt-10 pt-2 md:px-10'>
                <div className='sticky top-0 md:h-[90vh] md:w-[25%] flex justify-around md:flex md:flex-col'>
                    <NavLink className={'hover:bg-[#bebebe] p-2 rounded-sm'} to={'/'} style={({ isActive }) => ({
                                backgroundColor : isActive ? "#aaa" : "#fff",
                                })}>All pizza</NavLink>
                                
                    <NavLink className={'hover:bg-[#bebebe] p-2 rounded-sm'} to={'/best-pizza'} style={({ isActive }) => ({
                                backgroundColor : isActive ? "#aaa" : "#fff",
                                // borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                // color: isActive ? "rgb(24, 174, 19)" : "#646464",
                                })}>Best Pizza</NavLink>

                    <NavLink className={'hover:bg-[#bebebe] p-2 rounded-sm'} to={'/best-seller'} style={({ isActive }) => ({
                                backgroundColor : isActive ? "#aaa" : "#fff",
                                // borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                // color: isActive ? "rgb(24, 174, 19)" : "#646464",
                                })}>Best Sellers</NavLink>

                    <NavLink className={'hover:bg-[#bebebe] p-2 rounded-sm'} to={'/veg'} style={({ isActive }) => ({
                                backgroundColor : isActive ? "#aaa" : "#fff",
                                // borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                // color: isActive ? "rgb(24, 174, 19)" : "#646464",
                                })}>Veg Pizza</NavLink>

                    <NavLink className={'hover:bg-[#bebebe] p-2 rounded-sm'} to={'/non-veg'} style={({ isActive }) => ({
                                backgroundColor : isActive ? "#aaa" : "#fff",
                                // borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                // color: isActive ? "rgb(24, 174, 19)" : "#646464",
                                })}>Non-Veg Pizza</NavLink>

                    {/* <NavLink className={'hover:bg-[#bebebe] p-2 rounded-sm'} to={'/party-combo'} style={({ isActive }) => ({
                                backgroundColor : isActive ? "#aaa" : "#fff",
                                // borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                // color: isActive ? "rgb(24, 174, 19)" : "#646464",
                                })}>Party-Combo</NavLink>

                    <NavLink className={'hover:bg-[#bebebe] p-2 rounded-sm'} to={'/love-loaded'} style={({ isActive }) => ({
                                backgroundColor : isActive ? "#aaa" : "#fff",
                                // borderBottom: isActive ? "2px solid rgb(24, 174, 19)" : "none",
                                // color: isActive ? "rgb(24, 174, 19)" : "#646464",
                                })}>Love-Loaded menu</NavLink> */}
                </div>
                <div className='p-2 md:w-[75%] flex flex-col gap-5'>
                    <Outlet/>
                </div>
            </div>
        </div>
    </>
    );
}

export default Home;
