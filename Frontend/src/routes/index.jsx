import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Forgotpassword from "../pages/Forgot-password";
import AdminPanel from "../pages/AdminPanel";
import AllProducts from "../pages/allProducts";
import AllUsers from "../pages/allUsers";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "Login",
                element: <Login />
            },
            {
                path: "Signup",
                element: <SignUp />
            },
            {
                path: "Forgotpassword",
                element: <Forgotpassword />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path: "upload-products",
                        element: <AllProducts/>
                    },
                ]
            },


        ]
    }
])
export default router