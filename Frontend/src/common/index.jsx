const backendDomain = "http://localhost:3000"
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
    }
}
export default SummaryApi