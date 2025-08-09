import { IProductFiles, IProductVariation } from '~/types/Product';
import { errorMessage } from './Product';
import {
    ACCEPT_FILE_TYPE,
    MAX_SIZE,
} from '~/pages/Admin/_product_/Helper/_helper_';

/* eslint-disable */
export const imagesValidator = async (_: any, images: IProductFiles) => {
    if (images?.fileList?.length < 1 || !images) {
        return errorMessage('Hãy chọn ảnh cho sản phẩm!');
    }
    /* eslint-disable */
    if (images && images.fileList && images.fileList.length > 0) {
        for (const file of images?.fileList) {
            console.log(file, 'file');
            if (file?.size >= MAX_SIZE) {
                return errorMessage('Kích cỡ ảnh cần nhỏ hơn 5MB!');
            } else if (file?.type && !ACCEPT_FILE_TYPE.includes(file.type)) {
                return errorMessage(
                    'Chỉ nhận những ảnh có đuôi png, jpg và jpeg!',
                );
            }
        }
    }
    return Promise.resolve();
};

export const thumbnailValidator = async (_: any, thumbnail: IProductFiles) => {
    //  (thumbnail.fileList[0] as any).originFileObj
    if (thumbnail?.fileList?.length < 1 || !thumbnail) {
        return errorMessage('Hãy chọn ảnh cho sản phẩm!');
    }
    if (thumbnail && thumbnail.fileList && thumbnail.fileList.length > 0) {
        if (
            thumbnail &&
            thumbnail.file.size &&
            thumbnail?.file.size >= MAX_SIZE
        ) {
            return errorMessage('Kích cỡ ảnh cần nhỏ hơn 5MB!');
        }
        if (
            thumbnail?.file.type &&
            !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)
        ) {
            return errorMessage('Chỉ nhận những ảnh có đuôi png, jpg và jpeg!');
        }
    }
    return Promise.resolve();
};

export const nameValidator = async (_: any, name: string) => {
    if (!name) {
        return errorMessage('Hãy nhập tên sản phẩm!');
    }
    if (name.length < 3) {
        return errorMessage('Tên sản phẩm phải lớn hơn 3 ký tự!');
    }
    return Promise.resolve();
};
export const categoryValidator = () => {
    return { required: true, message: 'Hãy chọn danh mục!' };
};
export const brandValidator = () => {
    return { required: true, message: 'Hãy chọn thương hiệu!' };
};

export const variationsValidator = async (
    _: any,
    variants: any[],
) => {
    console.log(variants,'22')
    if (!variants) {
        return await errorMessage('Hãy thêm ít nhất 1 biến thể cho sản phẩm!');
    }
    if (!variants || variants.length < 1) {
        return await errorMessage('Hãy thêm ít nhất 1 biến thể cho sản phẩm!');
    }


    const variationEmpty = variants.some(
        (variation) => variation === undefined,
    );
    if (variationEmpty) {
        return await errorMessage('Hãy thêm ít nhất 1 biến thể cho sản phẩm!');
    }
    return Promise.resolve();
};
export const variationsThumbnailValidator = async (_: any, thumbnail: any) => {
    if (thumbnail?.fileList?.length < 1 || !thumbnail) {
        return errorMessage('Vui lòng chọn ảnh!');
    }
    if (
        thumbnail &&
        thumbnail.fileList &&
        thumbnail.fileList.length > 0 &&
        (thumbnail.fileList[0] as any).originFileObj
    ) {
        if (
            thumbnail &&
            thumbnail.file.size &&
            thumbnail.file.size >= MAX_SIZE
        ) {
            return errorMessage('File tải lên phải nhỏ hơn 5MB!');
        }
        if (
            thumbnail?.file.type &&
            !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)
        ) {
            return errorMessage('png, jpg and jpeg!');
        }
    }
    return Promise.resolve();
};
export const variationsColorValidator = () => {
    return { required: true, message: 'Hãy nhập màu!' };
};
export const variationsStorageValidator = () => {
    return { required: true, message: 'Hãy nhập dung lượng bộ nhớ!' };
};
export const variationsPriceValidator = () => {
    return { required: true, message: 'Hãy nhập giá sản phẩm!' };
};
export const variationsStockValidator = () => {
    return { required: true, message: 'Hãy nhập số lượng!' };
};
/* eslint-enable */
