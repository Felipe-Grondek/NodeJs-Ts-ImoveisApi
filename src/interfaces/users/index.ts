export interface IUserRequest {
    name: string
    email: string
    password: string
    isAdm: boolean
}

export interface IUser {
    id: string
    name: string
    email: string
    isAdm: boolean
    createdAt: Date
    updatedAt: Date
}


export interface IUserPass extends IUser {
    password: string;
    isActive: boolean;
}


export interface IUserLogin {
    email: string
    password: string
}

export interface IUserLoginReturn {
    token: string
    user: IUser
}


export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
}