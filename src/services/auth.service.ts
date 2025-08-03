
import { AUTH_ENDPOINT } from '~/constants/endPoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ILoginResponse } from '~/types/user';
import instance from '~/utils/api/axiosIntance';
import { LoginFormData, RegisterFormData } from '~/validation/Auth/Auth';
import { AxiosResponse } from 'axios';

const AuthServices = {
    async login(body: LoginFormData) {
        const data = await instance.post(`${AUTH_ENDPOINT.LOGIN}`, body);
        return data.data;
    },
    sendVerify(body: { email: string }) {
        return instance.post<IAxiosResponse<null>>(`${AUTH_ENDPOINT.SENDMAIL}`, body);
    },
    async sendMailResetPassword(body: { email: string }) {
        return instance.post(`${AUTH_ENDPOINT.RESETPASSWORD}`, body);
    },
    verify(body: { token: string }) {
        return instance.post<IAxiosResponse<null>>(`${AUTH_ENDPOINT.VERIFY}`, body);
    },
    async register(body: Omit<RegisterFormData, 'confirmPassword'>) {
        const data = await instance.post<RegisterFormData, AxiosResponse<ILoginResponse>>(
            `${AUTH_ENDPOINT.REGISTER}`,
            body
        );
        return data.data;
    },
    async doLogout() {
        return instance.post(`/logout`);
    },
};

export default AuthServices;
