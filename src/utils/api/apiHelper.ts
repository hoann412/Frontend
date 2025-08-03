export type IUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const setUserInfo = (data: IUser) => {
    return localStorage.setItem('user', JSON.stringify(data));
};
export const setAccessToken = (token: string) => {
    return localStorage.setItem('accessToken', token);
};
