import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetch',
  async () => {
    const res = await fetch('http://localhost:3000/products');
    console.log("RESULTADO", res);
    return await res.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [] as Product[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
