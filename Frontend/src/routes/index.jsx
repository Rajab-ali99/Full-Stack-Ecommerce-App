import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Forgotpassword from "../pages/Forgot-password";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
         children:[
                {
                    path:"",
                    element: <Home/>
                },
                {
                    path:"Login",
                    element: <Login/>
                },
                {
                    path:"Signup",
                    element: <SignUp/>
                },
                {
                    path:"Forgotpassword",
                    element: <Forgotpassword/>
                }

            ]
    }
])
export default router