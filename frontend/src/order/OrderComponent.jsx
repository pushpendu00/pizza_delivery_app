import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const OrderComponent = () => {
    return (
        <>
            <div>
                This is order component <br /> <br />
                <Link to={'/order/item'}>items</Link> <br />
                <Link to={'/order/history'}>history</Link>
            </div>

            
            <Outlet />
        </>
    );
}

export default OrderComponent;
