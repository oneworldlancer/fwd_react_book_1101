export class iDebugManager {

  

  /* iDebug_Message */
  static iDebug_Message(strMessage ) {
    try {
      console.log("MSG:::  " + strMessage);

      if (strMessage === null) {
        return true;
      } else if (strMessage === "") {
        return true;
      } else {
        return false;
      }
    } catch (error ) {
      console.log(error);
      return false;
    }
  }

  /* iObject_Message */
  static iObject_Message(objMessage ) {
    try {
      console.log(objMessage);

      if (objMessage === null) {
        return true;
      } else if (objMessage === "") {
        return true;
      } else {
        return false;
      }
    } catch (error ) {
      console.log(error);
      return false;
    }
  }
}

export default iDebugManager;
