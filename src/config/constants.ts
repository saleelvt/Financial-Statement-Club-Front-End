

export const URL="https://api.finstatements.club";
// export const URL="http://localhost:5555";

export const createAxiosConfig = (isFileUpload = false) => ({
    headers: {
        "Content-Type": isFileUpload ? "multipart/form-data" : "application/json",
        
    },
    withCredentials: true,
});
export const config ={  
    headers :{  
        "Content-Type": "application/json", 
       
    },
    withCredentials:true
}
export const configWithToken = () => {
    let token = localStorage.getItem("accessTokenFins");
    token = token ? token.replace(/^"|"$/g, "").trim() : null;
    console.log("MY TOKEN IS:", token);
    return {
      headers: {
        "Content-Type": "application/json",
        
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true
    };
  };
          

export const configWithTokenMultiPart = () => {
    let token = localStorage.getItem("accessTokenFins");
    token = token ? token.replace(/^"|"$/g, "").trim() : null; 
      console.log("MY User Token for the mulipart ", token);
      return {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "", // Explicitly handle undefined
        },
        withCredentials: true,
      };
    };
