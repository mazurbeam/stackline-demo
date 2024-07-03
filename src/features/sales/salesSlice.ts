import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../../store/store.ts";

export type SaleType = {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
}

export type ProductType = {
    id: string;
    title: string;
    image: string;
    subtitle: string
    brand: string;
    reviews: {
        customer: string;
        review: string;
        score: number;
    }[],
    retailer: string;
    details: string[]
    sales: SaleType[]
    tags: string[]
}
// Define a type for the slice state
export interface SalesState {
    product?: ProductType,
    sales: SaleType[],
    tags: string[]
}

// Define the initial state using that type
const initialState: SalesState = {
    product: undefined,
    sales: [],
    tags: []
}

export const salesSlice = createSlice({
    name: 'sales',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setProduct: (state: SalesState, action: PayloadAction<ProductType>) => {
            state.product = action.payload
        },
    }
})

export const { setProduct } = salesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => state.sales.product
export const selectSales = (state: RootState) => state.sales.product?.sales
export const selectTags = (state: RootState) => state.sales.product?.tags

export default salesSlice.reducer