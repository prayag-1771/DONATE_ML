
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Donation from './components/ui/Donation';

import './App.css'
import CardDemo from './components/ui/login_form'

function App() {

const router = createBrowserRouter([
  {path:"/" , element: <CardDemo/>},
  {path:"/Donation" , element: <Donation/>},
])

  return (
    <>
    <RouterProvider router = {router}/>
    </>
  )
}

export default App
