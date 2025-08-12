const backendDomain = import.meta.BACKEND_URL ;
const SummaryApi ={
    SignUp : {
        url: `${backendDomain}/api/signup`,
        method: 'post'
    },
     SignIn : {
        url: `${backendDomain}/api/signin`,
        method: 'post'
    },
     currentUser : {
        url: `${backendDomain}/api/user-details`,
        method: 'get'
    },
     Logout : {
        url: `${backendDomain}/api/userLogout`,
        method: 'get'
    },
     allUsers : {
        url: `${backendDomain}/api/all-users`,
        method: 'get'
    },
    updateUser : {
        url: `${backendDomain}/api/update-user`,
        method: 'post'
    },
     uploadProduct : {
        url: `${backendDomain}/api/upload-product`,
        method: 'post'
    },
     getProducts : {
        url: `${backendDomain}/api/get-products`,
        method: 'get'
    },
     updateProduct : {
        url: `${backendDomain}/api/update-product`,
        method: 'post'
    },
     getProductCategory : {
        url: `${backendDomain}/api/get-productCategory`,
        method: 'get'
    },
     categoryWiseProduct : {
        url: `${backendDomain}/api/categoryWiseProducts`,
        method: 'post'
    },
    ProductDetails: {
         url: `${backendDomain}/api/product`,
         method: 'post'
    },
    addToCart: {
         url: `${backendDomain}/api/addToCart`,
         method: 'post'
    },
    addToCartCount: {
         url: `${backendDomain}/api/countProducts`,
         method: 'get'
    },
    cartProducts: {
         url: `${backendDomain}/api/all-cart-products`,
         method: 'get'
    },
    IncreaseQuantity: {
         url: `${backendDomain}/api/increaseQuantity`,
         method: 'post'
    },
    deleteCartProduct: {
         url: `${backendDomain}/api/deleteProduct`,
         method: 'post'
    },
    searchProducts: {
         url: `${backendDomain}/api/search`,
         method: 'get'
    },
    filterProducts: {
         url: `${backendDomain}/api/filter-products`,
         method: 'post'
    }

}
export default SummaryApi