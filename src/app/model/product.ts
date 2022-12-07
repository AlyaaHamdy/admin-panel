export interface Product {
    id: number;
    title: string;
    discription: string;
    Category: string;
    quantity: number;
    brand: string;
    image: File[] | null;
    price: number;
    categoryId: number
}
export interface EditableProduct {

    title: string;
    discription: string;
    Category: string;
    quantity: number;
    brand: string;
    price: number;
}