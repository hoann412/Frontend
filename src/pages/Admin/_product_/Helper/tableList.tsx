import React from 'react';
import { Table, Space, Popconfirm } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { TableProps, ColumnType } from 'antd/es/table';
import { Link } from 'react-router-dom';

// Types for product and filters
interface IFilter {
  text: string;
  value: string;
}

interface Variant {
  image: string;
  size: { name: string };
  color: { name: string };
  stock: number;
}

export interface IProduct {
  _id: string;
  name: string;
  variants: Variant[];
  sold: number;
  price: number;
  tags: { name: string }[];
  category: string | { name: string };
  isActive: boolean;
}

export interface ProductsListColumnsProps {
  categoriesFilter: IFilter[];
  tagsFilter?: IFilter[];
  query?: Record<string, any>;
  getColumnSearchProps: (dataIndex: string) => ColumnType<IProduct>;
  getFilteredValue: (key: string) => string[] | undefined;
  mutateHideProduct: (id: string) => void;
  mutateShowProduct: (id: string) => void;
}

export function ProductsListColumns({
  categoriesFilter,
  tagsFilter,
  getColumnSearchProps,
  getFilteredValue,
  mutateHideProduct,
  mutateShowProduct,
}: ProductsListColumnsProps): TableProps<IProduct>['columns'] {
  return [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
      render: (text: string, record: IProduct) => (
        <>
          <div className="flex items-center gap-2">
            <div>
              <h4 className="max-w-[300px] truncate text-[16px] font-semibold">{text}</h4>
              <p className="text-[10px]">ID: {record._id}</p>
            </div>
          </div>
          <div className="ms-7 mt-1 p-5">
            {record.variants.map((v, i) => (
              <div key={i} className="my-4 flex items-center gap-2">
                <img src={v.image} alt={`${record.name}-${i}`} className="h-8 w-8 object-cover" />
                <div>
                  <p className="text-[10px]">Kích thước: {v.size.name}</p>
                  <p className="text-[10px]">Màu sắc: {v.color.name}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Đã bán',
      key: 'sold',
      render: (_, record) => <p className="text-center">{record.sold}</p>,
      responsive: ['md'],
    },
    {
      title: 'Giá tiền (VNĐ)',
      key: 'price',
      render: (_, record) => <>{record.price.toLocaleString()}</>,
    },
    {
      title: 'Kho hàng',
      key: 'stock',
      render: (_, record) => {
        const total = record.variants.reduce((sum, v) => sum + v.stock, 0);
        return (
          <>
            <p className="h-14 whitespace-nowrap">
              Tổng: {total > 0 ? total : <span className="text-red-500">Hết hàng</span>}
            </p>
            <div>
              {record.variants.map((v, i) => (
                <p key={i} className="my-4 h-8">
                  {v.stock > 0 ? v.stock : <span className="text-red-500">Hết hàng</span>}
                </p>
              ))}
            </div>
          </>
        );
      },
    },
    {
      title: 'Thẻ hàng',
      key: 'tags',
      filters: tagsFilter,
      filteredValue: getFilteredValue('tags'),
      render: (_, record) => <h4>{record.tags.map(t => t.name).join(', ')}</h4>,
    },
    {
      title: 'Danh mục',
      key: 'category',
      filters: categoriesFilter,
      filteredValue: getFilteredValue('category'),
      render: (_, record) => (
        <h4>
          {typeof record.category === 'object' ? record.category.name : record.category}
        </h4>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'isActive',
      filters: [
        { text: 'Ẩn', value: 'false' },
        { text: 'Hiện', value: 'true' },
      ],
      filteredValue: getFilteredValue('isActive'),
      render: (_, record) => (
        <>
          {!record.isActive && <p className="text-red-500">Đã ẩn</p>}
          {record.isActive && <p className="text-green-400">Đang hiển thị</p>}
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Link to={`/admin/reviews/products/${record._id}`}>Xem đánh giá</Link>
          <Link to={`/admin/products/${record._id}/edit`}>Cập nhật</Link>
          {record.isActive ? (
            <Popconfirm
              title="Ẩn sản phẩm khỏi người dùng?"
              onConfirm={() => mutateHideProduct(record._id)}
            >
              <a>Ẩn đi</a>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Hiển thị sản phẩm này?"
              onConfirm={() => mutateShowProduct(record._id)}
            >
              <a>Hiển thị</a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
}

// Component to render table with columns
interface ProductsListProps extends ProductsListColumnsProps {
  dataSource: IProduct[];
  loading?: boolean;
}

export const ProductsList: React.FC<ProductsListProps> = (props) => {
  const { dataSource, loading, ...colsProps } = props;
  const columns = ProductsListColumns(colsProps);
  return (
    <Table<IProduct>
      columns={columns}
      dataSource={dataSource}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};
