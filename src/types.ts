export interface FormData {
    fname: String,
    lname: String,
    empid: String,
    email: String,
    dept: String
    phone: String,
    role: String,
    joind: Date,
};

export enum FormDataEnum {
    fname = 0,
    lname,
    empid,
    email,
    dept,
    phone,
    role,
    joind
};

export type ChkQry = {
    empid: String,
    email: String
}
 
export type FinalMessage = {
    message: string,
    flag: number
}
