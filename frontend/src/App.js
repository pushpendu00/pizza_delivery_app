import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './component/footer/Footer';
import Navbar from './component/navbar/Navbar';
import LoginContext from './context/login/loginContext';
import History from './order/History';
import Item from './order/Item';
import Cart from './router/Cart';
import Contact from './router/Contact';
import Help from './router/Help';
import Home from './router/Home';
import Order from './router/Order';
import Payment from './router/Payment';
import Type from './router/Type';

function App() {
  const loginContext = useContext(LoginContext);
  return (
      <>
        <div className="App h-[100vh] w-full">
            <BrowserRouter>
              <Navbar />
              <div className='h-[90vh] w-full overflow-y-scroll'>
                <Routes>
                  {loginContext.isAuthenticate?(
                    <>
                      <Route path='/' element={<Home />} >
                        <Route path=''element={<Type />} />
                        <Route path=':item'element={<Type />} />
                      </Route>
                      <Route path='order' element={<Order />}>
                        <Route path='item' element={<Item />} />
                        <Route path='history' element={<History />} />
                      </Route>
                      <Route path='payment' element={<Payment />}/>
                      <Route path='cart' element={<Cart />} />
                      <Route path='contact' element={<Contact />}/>
                      <Route path='help' element={<Help />}/>
                    </>
                  ):(
                    <>
                      <Route path='/' element={<Home />} >
                        <Route path=''element={<Type />} />
                        <Route path=':item'element={<Type />} />
                      </Route>
                      <Route path='contact' element={<Contact />}/>
                      <Route path='help' element={<Help />}/>
                    </>
                  )}
                </Routes>
                <Footer />
              </div>
            </BrowserRouter>
          </div>


        <ToastContainer
        // position="top-right"
        position='bottom-center'
        autoClose={1000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
