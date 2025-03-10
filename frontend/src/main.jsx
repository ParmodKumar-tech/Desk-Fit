
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './authContent'
import PageRoutes from './Routers'
import Navbar from './components/Navbar';

createRoot(document.getElementById('root')).render(
 <>
  <AuthProvider>
  <div className='toaster'><Toaster  position="top-center"/></div>
    <BrowserRouter>
      <Navbar/>
      <PageRoutes/>
    </BrowserRouter>
  </AuthProvider>
    </>
  
)
