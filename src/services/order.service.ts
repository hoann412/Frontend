import { CHECKOUT_ENDPOINT, ORDER_ENDPOINT } from '~/constants/endPoint';
import { OrderStatus } from '~/constants/enum';
import { Params } from '~/types/Api';
import { IOrderDetails, IOrderResponse } from '~/types/Order';
import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';

const orderService = {
    myOrder(params: Params) {
        return instance.get<IAxiosResponse<IOrderResponse>>(`${ORDER_ENDPOINT.MY_ORDERS}`, { params });
    },

    getAllOrders(params?: any) {
        return instance.get<IAxiosResponse<IOrderResponse>>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}`, {
            params,
        });
    },

    cancelOrderByUser(body: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId: string; reason?: string }>(`${ORDER_ENDPOINT.CANCEL_ORDER}`, body);
    },
    cancelOrderByAdmin(body: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId: string; reason?: string }>(`${ORDER_ENDPOINT.CANCEL_ORDER}`, body);
    },
    confirmOrder({ orderId, reason }: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId?: string; reason?: string }>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}/confirm`, {
            orderId,
            reason,
        });
    },
    shippingOrder({ orderId, reason }: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId: string; reason: string }>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}/ship`, {
            orderId,
            reason,
        });
    },
    deliveredOrder({ orderId, reason }: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId: string; reason: string }>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}/delivered`, {
            orderId,
            reason,
        });
    },

    finishOrder(id: string) {
        return instance.patch<void, { orderId: string }>(`${ORDER_ENDPOINT.FINISH_ORDER}`, {
            orderId: id,
        });
    },

    finishOrderClient(id: string) {
        return instance.patch<void, string>(`${ORDER_ENDPOINT.FINISH_ORDER}`, {
            orderId: id,
        });
    },

    orderDetails(id: string) {
        return instance.get<IAxiosResponse<IOrderDetails>>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}/${id}`);
    },

    orderStatus() {
        return instance.get<IAxiosResponse<OrderStatus[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
    async checkOutVnPay(body: any) {
        const res = await instance.post(`/checkout${CHECKOUT_ENDPOINT.VNPAY}`, body);
        return res.data;
    },
    vnpayReturnStatusOrder(params: URLSearchParams) {
        return instance.get<{ code: string; message: string; data?: any }>(
            `/checkout${ORDER_ENDPOINT.VNPAY_RETURN}?${params}`
        );
    },

    // vnpayReturnStatusOrder(params: URLSearchParams) {
    //     return instance.get<{ code: string; message: string; data?: any }>(`${ORDER_ENDPOINT.VNPAY_RETURN}?${params}`);
    // },
};

export default orderService;
