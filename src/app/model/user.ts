export interface User{
    email:string;
    password:string;
    profileImage:string;
    age:number;
    firstName:string;
    lastName:string;
    address:string;
    phoneNumber:number;
    weight:number;
    height:number;
    createdAt:number;
    startDate:string;
    endDate:string;
    bio:string;
    subscription:subscription;
    gender:gender;
    role:role
}

export enum gender{
    Male ='male',
    Female ='female'
}
export enum subscription{

    premium = 'premium',
    standard =  'standard',
    basic = 'basic'
}
export enum role{
    admin = 'admin',
    trainer = 'trainer',
    client = 'client'

}


