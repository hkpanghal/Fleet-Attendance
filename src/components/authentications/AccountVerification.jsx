import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite/appwriteConfig";


function AccountVerification() {

  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");

  const promise = account.updateVerification(userId, secret);
  const navigate = useNavigate();
  promise.then(
    function (response) {
      console.log(response);
      navigate(`/Home/:${"Classes"}`)
    },
    function (error) {
        console.log(error);
    }
  );
 
}

export default AccountVerification
