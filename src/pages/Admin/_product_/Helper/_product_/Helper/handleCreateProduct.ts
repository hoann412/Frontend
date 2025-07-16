import { IProductForm } from '~/types/Product';
import { v4 as uuidv4 } from 'uuid';

const renameFile = (file: File, uuidString: string, newName: string): File => {
    return new File([file], `${uuidString}_____${newName}_____.${newName.split('.').pop()}`, {
        type: file.type,
        lastModified: file.lastModified,
    });
};
export const handleCreateProduct = (data: IProductForm, createProduct: (product: FormData) => void) => {
    const formData = new FormData();
    const { name, description, variants, price, discount, tags, category, isActive } = data;
    const firstElement = 0;
    const newVariants = [];

    if (variants) {
        for (const [, value] of Object.entries(variants)) {
            if (value?.thumbnail?.fileList?.[firstElement]?.originFileObj) {
                const uuidString = uuidv4();
                formData.append(
                    'variantImages',
                    renameFile(
                        value.thumbnail?.fileList?.[firstElement].originFileObj as File,
                        uuidString,
                        value.thumbnail?.fileList[firstElement].name
                    )
                );
                Object.assign(value, {
                    imageUrlRef: `${uuidString}_____${value.thumbnail?.fileList[firstElement].name}_____.${value.thumbnail?.fileList[firstElement].name.split('.').pop()}`,
                });
                console.log(
                    renameFile(
                        value.thumbnail?.fileList?.[firstElement].originFileObj as File,
                        uuidString,
                        value.thumbnail?.fileList[firstElement].name
                    ),
                    'new'
                );
                console.log(value.thumbnail?.fileList?.[firstElement].originFileObj as File, 'old');
                // Delete thumbnail
                const { thumbnail, ...rest } = value;
                const { imageUrlRef, size, color, stock } = rest;
                const variantFinal = {
                    imageUrlRef,
                    size,
                    color,
                    stock,
                };
                newVariants.push(variantFinal);
            }
        }
    }

    formData.append('name', name);
    formData.append('isActive', isActive ? 'true' : 'false');
    formData.append('category', category);
    formData.append('price', `${price}`);
    formData.append('discount', discount ? `${discount}` : '0');
    formData.append('tags', tags?.join(',') || '');
    formData.append('variantString', JSON.stringify(newVariants));
    formData.append('description', description || '');
    console.log(formData);
    // Mutation to create product
    createProduct(formData);
};
