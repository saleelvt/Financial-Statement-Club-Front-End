

export interface IAdminLogin{
    email:string|null;
    password?:string|null;
    role?:string;
}

export interface adminOtpinterface{
    otp:string,
    email:string,
    role:string
    password:string
}