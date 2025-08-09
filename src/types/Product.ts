export interface IVariant {
    _id: string;
    color: {
        _id: string;
        hex: string;
        name: string;
    };
    size: {
        _id: string;
        name: string;
    };
    stock: number;
    image: string;
    imageUrlRef: string;
}

export type IProduct = {
    _id: string;
    name: string;
    isActive: boolean;
    category: string | { name: string; _id: string };
    discount: number;
    price: number;
    variants: IVariant[];
    description: string;
    sold: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

export type IProductResponse = {
    products: IProduct[];
    totalDocs: number;
    totalPages: number;
    page: number;
};

export type Product = {
    _id: string;
    name: string;
    category: string;
    discount: number;
    price: number;
    variants: {
        color: string;
        size: string;
        stock: number;
        image: string;
        imageUrlRef: string;
        _id: string;
    }[];
    description: string;
    sold: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
};
export interface IThumbnailAntd extends File {
    uid: string;
    originFileObj: File;
}

export type IProductVariation = {
    _id?: string;
    thumbnail?: {
        file: File;
        fileList: IThumbnailAntd[];
    };
    [key: string]: any;
    imageUrlRef: string;
    size: string;
    color: string;
    stock: number;
};

export type IProductFiles = {
    file: IThumbnailAntd;
    fileList: FileList;
};

export type IProductForm = {
    name: string;
    isActive: boolean;
    category: string;
    description: string;
    variants: IProductVariation[];
    price: number;
    discount: number;
    tags: string[];
};
