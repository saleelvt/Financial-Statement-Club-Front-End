

// export const URL="https://api.finstatements.club";
export const URL="http://localhost:2002";


export const createAxiosConfig = (isFileUpload = false) => ({
    headers: {
        "Content-Type": isFileUpload ? "multipart/form-data" : "application/json",
         "X-Requested-With": "XMLHttpRequest"
    },
    withCredentials: true,
});


export const config ={
    headers :{
        "Content-Type": "application/json", 
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials:true
}