
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CurrentOrder from './router/CurrentOrder';
import Home from './router/Home';
import PastOrder from './router/PastOrder';

function App() {
  return (
    <>
      <div className="App h-[100vh] w-full">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/past-order' element={<PastOrder />} />
            <Route path='/current-order' element={<CurrentOrder />} />
            </Routes>
        </BrowserRouter>
      </div>


      <ToastContainer
        position="top-right"
        // autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
