import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Forgotpassword from "../pages/Forgot-password";
import AdminPanel from "../pages/AdminPanel";
import AllProducts from "../pages/AllProducts";
import AllUsers from "../pages/AllUsers";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProducts from "../pages/SearchProducts";


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
                path: "productCategory",
                element: <CategoryProducts />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "search",
                element: <SearchProducts />
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