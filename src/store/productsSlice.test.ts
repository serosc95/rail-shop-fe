import productsReducer, { fetchProducts } from './productsSlice';
import type { ProductsState, Product } from './productsSlice';
import type { AnyAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('productsSlice', () => {
  const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return the initial state', () => {
    expect(productsReducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  it('should handle fetchProducts.pending', () => {
    const state = productsReducer(initialState, fetchProducts.pending('', undefined));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchProducts.fulfilled', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Producto A', description: 'Desc A', price: 1000, stock: 5 },
    ];
    const state = productsReducer(initialState, fetchProducts.fulfilled(mockProducts, '', undefined));
    expect(state.items).toEqual(mockProducts);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle fetchProducts.rejected with payload', () => {
    const state = productsReducer(initialState, fetchProducts.rejected(null, '', undefined, 'Error custom'));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error custom');
  });

  it('should handle fetchProducts.rejected with generic error', () => {
    const action = {
      type: fetchProducts.rejected.type,
      payload: undefined,
      error: { message: 'Error general' },
    };
    const state = productsReducer(initialState, action as AnyAction);
    expect(state.error).toBe('Error general');
  });

  it('should fetch products correctly (integration test)', async () => {
    const mockRawProducts = [
      { id: '1', name: 'P1', description: 'Desc1', price: '1234.56', stock: 2 },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockRawProducts));

    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
      middleware: [thunk],
    });

    await store.dispatch(fetchProducts() as any);

    const state = store.getState().products;
    expect(state.items).toEqual([
      { ...mockRawProducts[0], price: 1234.56 },
    ]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle fetch error correctly', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
      middleware: [thunk],
    });

    await store.dispatch(fetchProducts() as any);

    const state = store.getState().products;
    expect(state.items).toEqual([]);
    expect(state.error).toBe('Failed to fetch');
  });
});
