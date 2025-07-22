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
