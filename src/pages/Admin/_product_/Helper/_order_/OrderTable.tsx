import type { TableColumnsType } from 'antd';
import { Button, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ORDER_STATUS } from '~/constants/order';
import { OrderStatus } from '~/constants/enum';
import useTable from '~/components/_common/useTable';
import TableDisplay from '~/components/_common/TableDisplay';

interface Props {
    ordersList: {
        _id: string;
        totalPrice: number;
        paymentMethod: string;
        isPaid: boolean;
        createdAt: string;
        customerInfo?: { name: string };
        orderStatus: string;
    }[];
    totalDocs: number;
}

interface DataType {
    key: number;
    code: string;
    total: number;
    customerName: string;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
}

const OrderTable = ({ ordersList, totalDocs }: Props) => {
    const { getColumnSearchProps, query, onSelectPaginateChange, onFilter, getSortedInfo, getFilteredValue } =
        useTable<any>();
    const currentPage = Number(query.page || 1);

    const dataSource =
        ordersList && ordersList.length
            ? ordersList.map((order: any, index) => ({
                  key: index,
                  code: order._id,
                  customerName: order?.customerInfo?.name || 'Khách vãng lai',
                  total: order.totalPrice,
                  paymentMethod: order.paymentMethod,
                  paymentStatus: order.isPaid ? 'Paid' : 'Unpaid',
                  orderStatus: order.orderStatus,
                  createdAt: order.createdAt,
              }))
            : [];

    const columns: TableColumnsType<DataType> = [
        {
            key: 'search',
            dataIndex: 'code',
            title: 'Mã Đơn Hàng',
            ...getColumnSearchProps('code'),
            render: (text: string) => (
                <Tooltip title={text}>
                    <span className='font-medium text-blue-600 hover:underline'>#{text.substring(0, 8)}...</span>
                </Tooltip>
            ),
            width: '15%',
        },
        {
            key: 'rawsearch',
            dataIndex: 'customerName',
            title: 'Tên Khách Hàng',
            ...getColumnSearchProps('customerName'),
            ellipsis: true,
            render: (text: string) => <span className='text-gray-800'>{text}</span>,
            width: '15%',
        },
        {
            key: 'totalPrice',
            dataIndex: 'total',
            title: 'Tổng Tiền',
            render: (text: number) => <span className='font-medium text-gray-800'>{text.toLocaleString()} đ</span>,
            sortOrder: getSortedInfo('totalPrice'),
            sorter: (a: any, b: any) => a.total - b.total,
            width: '12%',
        },
        {
            key: 'paymentMethod',
            dataIndex: 'paymentMethod',
            title: 'Hình Thức Thanh Toán',
            render: (text: string) => {
                switch (text.toLowerCase()) {
                    case 'cod':
                        return <span className='text-gray-600'>Thanh toán khi nhận hàng (COD)</span>;
                    case 'bank_transfer':
                        return <span className='text-gray-600'>Chuyển khoản ngân hàng</span>;
                    case 'credit_card':
                        return <span className='text-gray-600'>Thẻ tín dụng</span>;
                    default:
                        return <span className='text-gray-600'>{text}</span>;
                }
            },
            width: '15%',
        },
        {
            key: 'isPaid',
            dataIndex: 'paymentStatus',
            title: 'Trạng Thái Thanh Toán',
            filteredValue: getFilteredValue('isPaid'),
            render: (text: string) =>
                text === 'Paid' ? <Tag color='green'>Đã thanh toán</Tag> : <Tag color='red'>Chưa thanh toán</Tag>,
            filters: [
                { text: 'Đã thanh toán', value: true },
                { text: 'Chưa thanh toán', value: false },
            ],
            width: '15%',
        },
        {
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            title: 'Trạng Thái Đơn Hàng',
            filteredValue: getFilteredValue('orderStatus'),
            render: (text: string) => {
                switch (text) {
                    case ORDER_STATUS.CANCELLED:
                        return <Tag color='red'>Đã hủy</Tag>;
                    case ORDER_STATUS.CONFIRMED:
                        return <Tag color='blue'>Đã xác nhận</Tag>;
                    case ORDER_STATUS.SHIPPING:
                        return <Tag color='green'>Đang giao</Tag>;
                    case ORDER_STATUS.DELIVERED:
                        return <Tag color='green'>Đã giao</Tag>;
                    case ORDER_STATUS.DONE:
                        return <Tag color='green'>Hoàn thành</Tag>;
                    default:
                        return <Tag color='yellow'>Chờ xác nhận</Tag>;
                }
            },
            filters: [
                { text: 'Chờ Xác nhận', value: OrderStatus.pending },
                { text: 'Đã xác nhận', value: OrderStatus.confirmed },
                { text: 'Đang giao', value: OrderStatus.shipping },
                { text: 'Đã giao', value: OrderStatus.delivered },
                { text: 'Hoàn thành', value: OrderStatus.done },
                { text: 'Đã hủy', value: OrderStatus.cancelled },
            ],
            width: '15%',
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày Đặt Hàng',
            render: (text: string) => (
                <span className='text-gray-600'>{moment(text).format('DD/MM/YYYY HH:mm:ss')}</span>
            ),
            sortOrder: getSortedInfo('createdAt'),
            sorter: (a: any, b: any) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
            width: '15%',
        },
        {
            key: 'action',
            title: 'Thao Tác',
            render: (text, record) => (
                <Link to={`/admin/orders/${record.code}/detail`}>
                    <Button type='primary' size='small' className='rounded-md bg-blue-600 text-white hover:bg-blue-700'>
                        Xem chi tiết
                    </Button>
                </Link>
            ),
            width: '10%',
        },
    ];

    return (
        <div className='mx-auto mt-8 max-w-6xl'>
            <TableDisplay<DataType>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={dataSource}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </div>
    );
};

export default OrderTable;
