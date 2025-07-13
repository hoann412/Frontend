import { ICategory, ICategoryFormData } from './Category';

export interface ISize extends ICategory {}

export type ISizeResponse = {
    sizes: ISize[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export interface ISizeFormData extends ICategoryFormData {}
