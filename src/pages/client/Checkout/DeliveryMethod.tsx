import { QUERY_KEY } from '~/constants/queryKey';
import { useGetService } from '~/hooks/shipping/useGetService';
import { setShippingAddress } from '~/store/slice/orderSlice';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Radio, Space, Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { useDispatch } from 'react-redux';

interface Props {
    districtId: number;
}

const DeliveryMethod = ({ districtId }: Props) => {
    const form = Form.useFormInstance();
    const { data: services } = useGetService(districtId);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const handleSelectChange = (e: any) => {
        console.log(e.target.value);
        dispatch(setShippingAddress({ serviceId: 2 }));
    };

    useEffect(() => {
        if (services && services.length > 0) {
            form.setFieldValue('serviceId', services[0].service_id);
            dispatch(
                setShippingAddress({
                    serviceId: services[0].service_id,
                })
            );
        }

        if (districtId) {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SHIPPING_SERVICES],
            });
        }
    }, [districtId, services]);
    return (
        <Space direction='vertical' className='border-gray mb-5 w-full rounded-lg border-2 p-5'>
            <Typography.Text className='text-[1.2rem] font-semibold'>Phương thức vận chuyển</Typography.Text>
            <Form.Item
                name='serviceId'
                rules={[
                    {
                        required: true,
                        message: <>Vui lòng chọn phương thức vận chuyển</>,
                    },
                ]}
            >
                {services && (
                    <Radio.Group className='flex flex-col gap-3'>
                        <Fragment>
                            <Radio
                                onChange={(e) => handleSelectChange(e)}
                                value={services[0].service_id}
                                className='border-gray w-full rounded-lg border-2 p-3'
                            >
                                <Space className='w-full p-3'>
                                    <MdOutlineLocalShipping size={'1.5rem'} />
                                    <Typography.Text className='text-[1rem] font-semibold'>
                                        Vận chuyển tiêu chuẩn
                                    </Typography.Text>
                                </Space>
                            </Radio>
                        </Fragment>
                    </Radio.Group>
                )}
            </Form.Item>
            <Typography.Text className='flex justify-center text-[0.8rem] font-semibold'>
                Cước phí vận chuyển sẽ được tính sau khi điền xong thông tin thanh toán
            </Typography.Text>
        </Space>
    );
};

export default DeliveryMethod;
