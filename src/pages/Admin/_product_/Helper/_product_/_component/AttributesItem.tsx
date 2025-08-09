import { Form, Input, Select } from 'antd';
import { IAttributesValue } from '~/types/Attributes';

const AttributesItem = ({
    attribute,
    defaultValue,
}: {
    attribute: IAttributesValue;
    defaultValue?: {
        key: string;
        name: string;
        value: string;
        _id: string;
    }[];
}) => {
    return (
        <Form.Item
            className='capitalize'
            name={['attributes', attribute.attributeKey]}
            label={attribute.name}
            required={attribute.isRequired}
            // initialValue={initialValue} // Set default value
            rules={[
                {
                    required: attribute.isRequired,
                    message: `Thuộc tính bắt buộc, vui lòng nhập giá trị của ${attribute.name}!`,
                },
            ]}
        >
            {attribute.type === 'options' && (
                <Select placeholder='Please select'>
                    {attribute.values.map((value, index) => (
                        <Select.Option value={value} key={index}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            )}
            {attribute.type === 'manual' && <Input placeholder={`Hãy nhập ${attribute.name}`} />}
        </Form.Item>
    );
};

export default AttributesItem;
