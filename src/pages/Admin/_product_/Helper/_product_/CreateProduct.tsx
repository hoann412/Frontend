import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormProps } from 'antd/lib';

import { ADMIN_ROUTES } from '~/constants/router';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import useGetColors from '~/hooks/Colors/Queries/useGetColors';
import useCreateProduct from '~/hooks/Products/Mutations/useCreateProduct';
import useGetSizes from '~/hooks/Sizes/Queries/useGetSizes';
import useGetTags from '~/hooks/Tags/Queries/useGetTags';
import WrapperPageAdmin from '~/pages/Admin/_common/WrapperPageAdmin';
import { handleCreateProduct } from '~/pages/Admin/_product_/Helper/handleCreateProduct';
import VariationItem from '~/pages/Admin/_product_/_component/VariationItem';
import WrapperCard from './_component/WrapperCard';
import { IProductForm } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';
import { variationsValidator } from '~/validation/Products/validators';

interface CreateProductHandler {
    (values: IProductForm): void;
}
const CreateProduct = () => {
    const [form] = Form.useForm<IProductForm>();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [attributesFile, setAttributesFile] = useState<UploadFile[][]>([]);

    const { data: categories } = useGetCategories({ limit: '100000' });
    const { data: tags } = useGetTags({ limit: '100000' });
    const { data: sizes } = useGetSizes({ limit: '100000' });
    const { data: colors } = useGetColors({ limit: '100000' });
    const { mutate: createPro, isPending } = useCreateProduct();

    const categoryOptions = useMemo(
        () =>
            categories?.data?.categories?.map((item: any) => ({
                label: item.name,
                value: item._id,
            })) || [],
        [categories]
    );

    const tagOptions = useMemo(
        () =>
            tags?.data?.tags?.map((tag: any) => ({
                label: tag.name,
                value: tag._id,
            })) || [],
        [tags]
    );

    const handleChangeAttributeThumbnail = useCallback((index: number): UploadProps['onChange'] => {
        return ({ fileList: newFileList }) => {
            setAttributesFile((prev) => {
                const newAttributesFile = [...prev];
                newAttributesFile[index] = newFileList;
                return newAttributesFile;
            });
        };
    }, []);

    const handleRemoveAttributeThumbnail = useCallback((index: number) => {
        setAttributesFile((prev) => {
            const newAttributesFile = [...prev];
            newAttributesFile.splice(index, 1);
            return newAttributesFile;
        });
    }, []);

    const onFinish: FormProps<IProductForm>['onFinish'] = useCallback(
        (values: IProductForm): void => {
            handleCreateProduct(values, createPro);
        },
        [createPro]
    );

    const handleSaveAndShow = useCallback(() => {
        setIsActive(true);
        form.setFieldsValue({ isActive: true });
    }, [form]);

    const handleSaveAndHide = useCallback(() => {
        setIsActive(false);
        form.setFieldsValue({ isActive: false });
    }, [form]);

    const handleAddVariant = useCallback((add: () => void, fieldsLength: number) => {
        if (fieldsLength >= 15) {
            showMessage('Bạn chỉ có thể thêm tối đa 15 biến thể !', 'warning');
        } else {
            add();
        }
    }, []);

    return (
        <WrapperPageAdmin
            title='Thêm mới sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS} className='underline'>
                    Quay lại
                </Link>
            }
        >
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <div className='grid grid-cols-1 gap-4'>
                    <WrapperCard title='Thông tin cơ bản'>
                        <Form.Item name='isActive' className='hidden' hidden>
                            <Input type='hidden' />
                        </Form.Item>
                        <Form.Item<any>
                            label='Tên sản phẩm'
                            name='name'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                { min: 3, message: 'Tên sản phẩm phải có ít nhất 3 ký tự!' },
                                { max: 50, message: 'Tên sản phẩm không được vượt quá 50 ký tự!' },
                            ]}
                        >
                            <Input placeholder='Nhập tên sản phẩm...' size='large' />
                        </Form.Item>
                        <Form.Item<any>
                            className='flex font-medium text-[#08090F] capitalize'
                            name='price'
                            required
                            label='giá tiền (VNĐ)'
                            rules={[{ required: true, message: 'Vui lòng nhập giá của sản phẩm!' }]}
                        >
                            <InputNumber<number>
                                min={10000}
                                placeholder='Nhập giá tiền của sản phẩm...'
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/VNĐ\s?|(,*)/g, '') as unknown as number}
                                size='large'
                                className='w-full'
                            />
                        </Form.Item>
                        <Form.Item<any>
                            className='flex font-medium text-[#08090F] capitalize'
                            hidden
                            name='discount'
                            label='Giảm giá (%)'
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                    message: 'Giảm giá phải lớn hơn 0 và nhỏ hơn 99!',
                                },
                            ]}
                        >
                            <InputNumber<number>
                                min={0}
                                defaultValue={0}
                                placeholder='Nhập giá phần trăm giảm giá...'
                                size='large'
                                className='w-full'
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label='Danh mục'
                            name='category'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục cho sản phẩm' }]}
                        >
                            <Select
                                size='large'
                                placeholder='Chọn danh mục cho sản phẩm...'
                                className='w-full'
                                options={categoryOptions}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label='Thẻ phân loại'
                            name='tags'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[{ required: true, message: 'Vui lòng chọn thẻ phân loại cho sản phẩm' }]}
                        >
                            <Select
                                size='large'
                                mode='multiple'
                                allowClear
                                className='w-full normal-case'
                                placeholder='Chọn các thẻ phân loại cho sản phẩm...'
                                options={tagOptions}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label='Mô tả'
                            name='description'
                            className='font-medium text-[#08090F]'
                            rules={[{ required: true, message: 'Vui lòng viết mô tả cho sản phẩm' }]}
                        >
                            <TextArea placeholder='Nhập mô tả sản phẩm...' rows={4} className='w-full' />
                        </Form.Item>
                    </WrapperCard>
                    <WrapperCard title='Thông tin bán hàng'>
                        <Form.List name='variants' rules={[{ validator: variationsValidator }]}>
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }, index) => (
                                        <VariationItem
                                            key={key}
                                            colors={colors?.data.colors || []}
                                            handleChangeThumbnail={handleChangeAttributeThumbnail}
                                            variantFile={attributesFile}
                                            handleRemoveThumbnail={handleRemoveAttributeThumbnail}
                                            sizes={sizes?.data.sizes || []}
                                            index={index}
                                            fieldName={name}
                                            restField={restField}
                                            removeVariation={remove}
                                        />
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type='dashed'
                                            htmlType='button'
                                            onClick={() => handleAddVariant(add, fields.length)}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Thêm biến thể
                                        </Button>
                                    </Form.Item>
                                    {errors && <Form.ErrorList errors={errors} className='text-red-600' />}
                                </>
                            )}
                        </Form.List>
                    </WrapperCard>
                </div>
                <Form.Item>
                    <div className='border-opacity-5 sticky right-0 bottom-0 my-2 flex justify-end rounded-md border-t-2 border-black bg-white p-4'>
                        <Button
                            type='default'
                            htmlType='submit'
                            className='mr-3 px-5'
                            loading={isPending && !isActive}
                            disabled={isPending}
                            onClick={handleSaveAndHide}
                            size='large'
                        >
                            Lưu và ẩn
                        </Button>
                        <Button
                            type='primary'
                            htmlType='submit'
                            icon={<PlusSquareOutlined />}
                            className='mr-3 px-5'
                            loading={isPending && isActive}
                            disabled={isPending}
                            size='large'
                            onClick={handleSaveAndShow}
                        >
                            Lưu
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </WrapperPageAdmin>
    );
};

export default CreateProduct;
