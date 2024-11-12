class TokenValidator {
    getToken() {
      return localStorage.getItem("token");
    }
  
    isTokenValid() {
      return !!this.getToken();
    }
  
    redirectIfInvalid(navigate) {
      if (!this.isTokenValid()) {
        // console.log("Token is not valid");
        navigate("/login");
      } else {
        // console.log("Token is valid");
      }
    }
  }
  
  export default TokenValidator;
  