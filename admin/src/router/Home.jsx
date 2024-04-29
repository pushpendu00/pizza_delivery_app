import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home h-full w-full px-2 py-5 flex flex-col items-center justify-center'>
            <div className='text-[40px] font-semibold'>Admin Home Page</div> <br /> <br /> <br /> <br /> <br />
            <Link to={'/current-order'}>
                <button className='py-2 px-3 border-2 border-[#434343] rounded-lg text-[25px] font-semibold'>Current Order</button>
            </Link>  <br />
            <Link to={'/past-order'}>
                <button className='py-2 px-3 border-2 border-[#434343] rounded-lg text-[25px] font-semibold'>Past Order</button>
            </Link>
        </div>
    );
}

export default Home;
