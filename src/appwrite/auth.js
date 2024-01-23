import { useNavigate } from 'react-router-dom'
import { account } from '../appwrite/appwriteConfig'
import { v4 as uuidv4 } from "uuid";

const signUp  = async (user) => {

    try {
        const newUser =  await account.create(
          uuidv4(),
          user.email,
          user.password,
          user.name
        );
        await account.createEmailSession(user.email,user.password)
        await account.createVerification("http://localhost:5173/AccountVerification")
        console.log("check your mail")
        
      } catch (error) {
        console.log(error)
      }
}

const signIn = async (user) => {
  
    try {
        const res = await account.createEmailSession(user.email,user.password);
        return true;
        
      } catch (error) {
        console.log(error)
        return false;
      }

}

export {signIn,signUp}