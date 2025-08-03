import { PRODUCT_ENDPOINT } from '~/constants/endPoint';
import { Params } from '~/types/Api';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IProduct, IProductResponse } from '~/types/ProductNew';
import instance from '~/utils/api/axiosIntance';

export type IAllProductResponseNew = {
    products: IProduct[];
    page: number;
    totalDocs: number;
    totalPages: number;
};
export const ProductServices = {
    async getProductBestSelling() {
        const data = await instance.get<IAxiosResponse<IProduct[]>>('/products/best-selling');
        return data.data;
    },
    async getAllProducts(params: Params) {
        const res = await instance.get<IAxiosResponse<IProductResponse>>('/products/all', {
            params,
        });
        return res.data;
    },
    async getDetailProduct(id: string) {
        const data = await instance.get<IAxiosResponse<IProduct>>(`/products/${id}`);
        return data.data;
    },
    async getDetailProductForAdmin(id: string) {
        const data = await instance.get<IAxiosResponse<IProduct>>(`/products/admin/${id}`);
        return data.data;
    },
    async getRelatedProduct(id: string) {
        const data = await instance.get<IAxiosResponse<IProduct[]>>(`/products/related/${id}`);
        return data.data;
    },
    async createProduct(data: FormData) {
        const res = await instance.post<IAxiosResponse<null>>(`/products/create`, data);
        return res.data;
    },
    async updateProduct(data: FormData, id: string) {
        const res = await instance.put<IAxiosResponse<null>>(`/products/update/${id}`, data);
        return res.data;
    },
    async getAll(params: any) {
        const res = await instance.get<IAxiosResponse<IAllProductResponseNew>>(`/products/all`, {
            params: { ...params, isActive: true },
        });
        return res.data;
    },
    async getAllForAdmin(params: any) {
        const res = await instance.get<IAxiosResponse<IAllProductResponseNew>>(`/products/all`, { params });
        return res.data;
    },
    async hideProduct(id: string) {
        const res = await instance.patch<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.HIDE}/${id}`);
        return res.data;
    },
    async showProduct(id: string) {
        const res = await instance.patch<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.SHOW}/${id}`);
        return res.data;
    },
    async getDiscount() {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`/products/discount`);
        return res.data;
    },
};
