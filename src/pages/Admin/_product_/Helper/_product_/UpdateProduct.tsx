import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link, useParams } from 'react-router-dom';
import { nameValidator, variationsValidator } from '~/validation/Products/validators';
import WrapperCard from './_component/WrapperCard';
import { ADMIN_ROUTES } from '~/constants/router';
import WrapperPageAdmin from '~/pages/Admin/_common/WrapperPageAdmin';
import VariationItem from '~/pages/Admin/_product_/_component/VariationItem';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import useGetTags from '~/hooks/Tags/Queries/useGetTags';
import useGetColors from '~/hooks/Colors/Queries/useGetColors';
import useGetSizes from '~/hooks/Sizes/Queries/useGetSizes';
import { useEffect, useState } from 'react';
import { FormProps } from 'antd/lib';
import convertApiResponseToFileList from '~/pages/Admin/_product_/Helper/convertImageUrlToFileList';
import useUpdateProduct from '~/hooks/Products/Mutations/useUpdateProduct';
import { handleEditProduct } from '~/pages/Admin/_product_/Helper/handleEditProduct';
import showMessage from '~/utils/ShowMessage';
import { useGetDetailProductForAdmin } from '~/hooks/Products/Queries/useGetDetailProductForAdmin';

const UpdateProduct = () => {
    const [form] = Form.useForm<any>();
    const { id } = useParams();
    const [variantFile, setVariantFile] = useState<UploadFile[][]>([]);
    // @Query
    const { data: categories } = useGetCategories({ limit: '100000' });
    const { data: tags } = useGetTags({ limit: '100000' });
    const { data: sizes } = useGetSizes({ limit: '100000' });
    const { data: colors } = useGetColors({ limit: '100000' });
    const { mutate: updateProduct, isPending } = useUpdateProduct();
    const { data: targetProduct } = useGetDetailProductForAdmin(id as string);
    const onFinish: FormProps<any>['onFinish'] = (values) => {
        console.log(values, 'values');
        handleEditProduct(values, id as string, updateProduct);
    };
    const handleChangeAttributeThumbnail = (index: number): UploadProps['onChange'] => {
        return ({ fileList: newFileList }) => {
            const newAttributesFile = [...variantFile];
            newAttributesFile[index] = newFileList;
            setVariantFile(newAttributesFile);
        };
    };
    const handleRemoveAttributeThumbnail = (index: number) => {
        const newAttributesFile = [...variantFile];
        newAttributesFile.splice(index, 1);
        setVariantFile(newAttributesFile);
    };
    useEffect(() => {
        if (targetProduct && colors?.data.colors && sizes?.data.sizes) {
            console.log('hello');
            const { variants, ...rest } = targetProduct;
            let newVariantFile: UploadFile<any>[][] = [];
            const variaConverts = variants.map((varia, i) => {
                const image = convertApiResponseToFileList({
                    url: varia?.image!,
                    urlRef: varia?.imageUrlRef,
                    isArr: true,
                }) as UploadFile<any>[];
                newVariantFile = [...newVariantFile];
                newVariantFile[i] = image;

                const newVaria: any = {
                    ...varia,
                    size: varia?.size._id,
                    color: varia?.color._id,
                    thumbnail: image,
                };
                return newVaria;
            });
            setVariantFile(newVariantFile);
            const initial: any = {
                variants: variaConverts,
                ...rest,
            };
            console.log(initial);
            form.setFieldsValue(initial as any);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetProduct, id, colors, sizes]);
    return (
        <WrapperPageAdmin
            title='Cập nhật mới sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS} className='underline'>
                    Quay lại
                </Link>
            }
        >
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <div className='grid grid-cols-1 gap-4'>
                    <WrapperCard title='Thông tin cơ bản'>
                        <Form.Item<any>
                            label='Tên sản phẩm'
                            name='name'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm!',
                                },
                                {
                                    min: 3,
                                    message: 'Tên sản phẩm phải có ít nhất 3 ký tự!',
                                },
                                {
                                    max: 50,
                                    message: 'Tên sản phẩm không được vượt quá 50 ký tự!',
                                },
                            ]}
                        >
                            <Input placeholder='Nhập tên sản phẩm...' size='large' />
                        </Form.Item>
                        <Form.Item<any>
                            className='flex font-medium text-[#08090F] capitalize'
                            name={'price'}
                            required
                            label='giá tiền (VNĐ)'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá của sản phẩm!',
                                },
                            ]}
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
                            hidden
                            className='flex font-medium text-[#08090F] capitalize'
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn danh mục cho sản phẩm',
                                },
                            ]}
                        >
                            <Select
                                size='large'
                                placeholder='Chọn danh mục cho sản phẩm...'
                                className='w-full'
                                options={categories?.data?.categories?.map((item: any) => ({
                                    label: item.name,
                                    value: item._id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label='Thẻ phân loại'
                            name='tags'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn thẻ phân loại cho sản phẩm',
                                },
                            ]}
                        >
                            <Select
                                size='large'
                                mode='multiple'
                                allowClear
                                className='w-full normal-case'
                                placeholder='Chọn các thẻ phân loại cho sản phẩm...'
                                options={tags?.data?.tags?.map((tag: any) => ({
                                    label: tag.name,
                                    value: tag._id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label='Mô tả'
                            name='description'
                            className='font-medium text-[#08090F]'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng viết mô tả cho sản phẩm',
                                },
                            ]}
                        >
                            <TextArea placeholder='Nhập mô tả sản phẩm...' rows={4} className='w-full' />
                        </Form.Item>
                    </WrapperCard>
                    <WrapperCard
                        // isLoading={isAttributeLoading}
                        title='Thông tin bán hàng'
                    >
                        <Form.List
                            name='variants'
                            rules={[
                                {
                                    validator: variationsValidator,
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }, index) => {
                                        return (
                                            <VariationItem
                                                key={key}
                                                colors={colors?.data.colors || []}
                                                variantFile={variantFile}
                                                handleChangeThumbnail={handleChangeAttributeThumbnail}
                                                handleRemoveThumbnail={handleRemoveAttributeThumbnail}
                                                sizes={sizes?.data.sizes || []}
                                                index={index}
                                                fieldName={name}
                                                restField={restField}
                                                removeVariation={remove}
                                            />
                                        );
                                    })}
                                    <Form.Item>
                                        <Button
                                            type='dashed'
                                            htmlType='button'
                                            onClick={() => {
                                                if (fields.length >= 15) {
                                                    showMessage('Bạn chỉ có thể thêm tối đa 15 biến thể !', 'warning');
                                                } else {
                                                    add();
                                                }
                                            }}
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
                            loading={isPending}
                            disabled={isPending}
                            size='large'
                        >
                            Cập nhật
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </WrapperPageAdmin>
    );
};
export default UpdateProduct;
