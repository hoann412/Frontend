/* eslint-disable no-nested-ternary */
import useTable from '~/hooks/_common/useTable';
import type { TableProps } from 'antd';
import { Image, Spin, Tag } from 'antd';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { IUser } from '~/types/user';
import useGetAllUsers from '~/hooks/users/Queries/useGetAllUsers';

const ManageUser = () => {
    const { query, onSelectPaginateChange, onFilter, getColumnSearchProps } = useTable<IUser>();
    const { data, isLoading } = useGetAllUsers(query);
    const users = data?.data?.users;
    const totalDocs = data?.data?.totalDocs;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<IUser>['columns'] = [
        {
            title: <span className='font-semibold text-gray-700'>Ảnh đại diện</span>,
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <div className='flex items-center justify-center'>
                    {avatar ? (
                        <Image
                            src={avatar}
                            width={48}
                            height={48}
                            className='rounded-full border-2 border-gray-200 object-cover shadow-sm'
                            preview={false}
                        />
                    ) : (
                        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-500'>
                            N/A
                        </div>
                    )}
                </div>
            ),
            responsive: ['lg'],
            width: '10%',
        },
        {
            title: <span className='font-semibold text-gray-700'>Tên người dùng</span>,
            dataIndex: 'name',
            key: 'search',
            render: (text) => (
                <span className='font-medium text-gray-800 transition-colors hover:text-blue-600'>{text}</span>
            ),
            ...getColumnSearchProps('name'),
            width: '25%',
        },
        {
            title: <span className='font-semibold text-gray-700'>Số điện thoại</span>,
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => (
                <span className='text-gray-600'>{text || <span className='text-gray-400'>Chưa có</span>}</span>
            ),
            width: '20%',
        },
        {
            title: <span className='font-semibold text-gray-700'>Email</span>,
            dataIndex: 'email',
            key: 'email',
            render: (text) => <span className='text-gray-600 transition-colors hover:text-blue-600'>{text}</span>,
            width: '30%',
        },
        {
            title: <span className='font-semibold text-gray-700'>Trạng thái xác thực</span>,
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => (
                <Tag color={isActive ? 'green' : 'red'} className='rounded-full px-3 py-1 font-medium shadow-sm'>
                    {isActive ? 'Đã xác thực' : 'Chưa xác thực'}
                </Tag>
            ),
            width: '15%',
        },
    ];

    return (
        <WrapperPageAdmin title='Danh sách người dùng'>
            <div className='rounded-lg bg-white p-6 shadow-lg'>
                {isLoading ? (
                    <div className='flex h-64 items-center justify-center'>
                        <Spin size='large' tip='Đang tải dữ liệu...' />
                    </div>
                ) : (
                    <>
                        <TableDisplay<IUser>
                            onFilter={onFilter}
                            columns={columns}
                            currentPage={currentPage}
                            dataSource={users}
                            onSelectPaginateChange={onSelectPaginateChange}
                            totalDocs={totalDocs}
                        />
                    </>
                )}
            </div>
        </WrapperPageAdmin>
    );
};

export default ManageUser;
