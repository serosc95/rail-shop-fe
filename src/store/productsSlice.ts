import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface RawProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};


const fetchProductsAPI = async (): Promise<Product[]> => {
  const res = await fetch('http://localhost:3000/api/products');

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Error al obtener los productos');
  }

  const rawData: RawProduct[] = await res.json();

  return rawData.map((product) => ({
    ...product,
    price: parseFloat(product.price),
  }));
};


export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetch',
  async (_, thunkAPI) => {
    try {
      return await fetchProductsAPI();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Error desconocido');
    }
  }
);


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Error al cargar productos';
      });
  },
});


export default productsSlice.reducer;
