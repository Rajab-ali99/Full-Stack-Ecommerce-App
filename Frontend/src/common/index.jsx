const backendDomain = "http://localhost:3000"
const SummaryApi ={
    SignUp : {
        url: `${backendDomain}/api/signup`,
        method: 'post'
    },
     SignIn : {
        url: `${backendDomain}/api/signin`,
        method: 'post'
    }
}
export default SummaryApi