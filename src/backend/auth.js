import axios from "axios";



const ipAddress = "192.168.153.5"
// const ipAddress = "192.168.253.5"
export const signin = async (email,password) =>{
    try {
        const res = await axios.post(`http://${ipAddress}:9000/api/user/signin`,{
            email:email,
            password:password
        })

        return res
    } catch (error) {
        throw error
    }

    return false
}

export const signup = async (first_name,last_name,email,password,confirm_password) => {
    try {
        const res = await axios.post(`http://${ipAddress}:9000/api/user/signup`,{
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:password,
            confirm_password,confirm_password
        })

        return res
    } catch (error) {
        throw error
    }

}


export const forgotPassword = async (email) => {
    // console.log(email)
    try {
        const res = await axios.post(`http://${ipAddress}:9000/api/user/forgotpassword`,{
            email
        })
        return res
    } catch (error) {
        throw error
        
    }
}
export const resetPassword = async (token,new_password,confirm_new_password) => {
   
    try {
        const res = await axios.post(`http://${ipAddress}:9000/api/user/resetpassword`,{
            token,
            new_password,
            confirm_new_password
        })
        return res
    } catch (error) {
       
        throw error
        
    }
}