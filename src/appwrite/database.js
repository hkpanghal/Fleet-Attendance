import { Client, Databases, Query , ID} from "appwrite";
import { v4 as uuidv4 } from "uuid";
import conf from "../conf/conf";
import { useId } from "react";

const client = new Client()
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);

const databases = new Databases(client);

async function createClass({ id,name,students, dateCreated,userid}) {

  try {
    const result = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteClassesCollectionId,
      id,
      {
        name,
        dateCreated,
        userid
      }
    );
    
    return true;
  } catch (error) {
    console.log(error)
    return false
  }
 
}
function createStudent( {
    id,
    classes,
    RoLLNumber,
    Name,
    IsPresent,
    Date
}) {
  const promise = databases.createDocument(
    conf.appwriteDatabaseId,
    conf.appwriteClassesCollectionId,
    id,
    {
        classes,
        RoLLNumber,
        Name,
        IsPresent,
        Date
    }
  );

  promise.then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
}

 async function getClasses(userid){
  try {
      let res = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteClassesCollectionId,
     [
      Query.equal("userid",userid)
     ]
  
  );
  return res;
  } catch (error) {
    console.log(error);
    return error
  }
}

function getStudents(classid){
    let promise = databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteStudentsCollectionId,
        [
          Query.equal("classes",classid)
        ]
    );
    
    promise.then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}

export {createStudent,createClass,getClasses,getStudents}


