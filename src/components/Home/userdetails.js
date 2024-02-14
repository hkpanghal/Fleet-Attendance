
import { getCurrentUser } from "../../appwrite/auth";

const userDetails = {
    id:null,
    name:null,
    email:null,
    status:null
}
// getCurrentUser().then((res) => {
//     if (res) {
//       if (res.status) {
//           userDetails.id = res.$id;
//           userDetails.name = res.name;
//           userDetails.email = res.email;
//           userDetails.status = res.status;
//       }
//     } else {
//       navigate("/SignUp");
//     }
//   });

export { userDetails };
