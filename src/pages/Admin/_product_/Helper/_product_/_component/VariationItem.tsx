/* eslint-disable @typescript-eslint/no-shadow */
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Select, Upload, UploadFile, UploadProps } from 'antd';
import { variationsStockValidator, variationsThumbnailValidator } from '~/validation/Products/validators';
import { ISize } from '~/types/Size';
import { IColor } from '~/types/Color';
import CustomItemRenderVariant from '~/pages/Admin/_product_/_component/CustomItemRenderVariant';
import UploadButtonVariant from '~/pages/Admin/_product_/_component/UploadButtonVariant';

type IVariationsItem = {
    fieldName: number;
    sizes: ISize[];
    colors: IColor[];
    variantFile: UploadFile[][];
    index: number;
    restField: {
        fieldKey?: number;
    };
    id?: string;
    handleChangeThumbnail: (index: number) => UploadProps['onChange'];
    handleRemoveThumbnail: (index: number) => void;
    removeVariation: (name: number) => void;
};

const VariationItem = ({
    fieldName,
    sizes,
    colors,
    index,
    restField,
    variantFile,
    id,
    handleChangeThumbnail,
    handleRemoveThumbnail,
    removeVariation,
}: IVariationsItem) => {
    return (
        <div className='flex items-end gap-3'>
            <Form.Item
                className='capitalize'
                {...restField}
                name={[fieldName, 'thumbnail']}
                dependencies={['thumbnail']}
                rules={[
                    {
                        validator: variationsThumbnailValidator,
                    },
                ]}
            >
                <Upload
                    itemRender={CustomItemRenderVariant}
                    beforeUpload={() => false}
                    listType='picture'
                    fileList={variantFile[index]}
                    onChange={handleChangeThumbnail(index)}
                    maxCount={1}
                >
                    {variantFile[index]?.length >= 1 ? null : <UploadButtonVariant />}
                </Upload>
            </Form.Item>
            <Form.Item
                className='w-full capitalize'
                {...restField}
                name={[fieldName, 'size']}
                label='Kích cỡ'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn kích cỡ!',
                    },
                ]}
            >
                <Select placeholder='Chọn kích cỡ'>
                    {sizes.map((value) => (
                        <Select.Option value={value._id} key={value._id}>
                            {value.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                className='w-full capitalize'
                {...restField}
                name={[fieldName, 'color']}
                label='Màu sắc'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn màu sắc!',
                    },
                ]}
            >
                <Select placeholder='Chọn màu sắc!'>
                    {colors.map((value, index) => (
                        <Select.Option value={value._id} key={index}>
                            <div className='flex items-center justify-between'>
                                <div style={{ background: value.hex }} className='h-2 w-2 border-2 border-black'></div>
                                <p>{value.name}</p>
                            </div>
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                className='w-full capitalize'
                {...restField}
                name={[fieldName, 'stock']}
                label='Kho hàng'
                rules={[variationsStockValidator()]}
            >
                <InputNumber min={1} placeholder='Nhập số lượng sản phẩm...' className='w-full' />
            </Form.Item>
            <div className='h-14 w-14'>
                <MinusCircleOutlined
                    onClick={() => {
                        handleRemoveThumbnail(index);
                        removeVariation(fieldName);
                    }}
                    className='translate-y-[20%] text-lg'
                />
            </div>
        </div>
    );
};

export default VariationItem;
