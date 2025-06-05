// src/store/__tests__/transactionSlice.test.ts
import reducer, { createTransaction, resetStatus } from './transactionSlice';
import type { TransactionState, TransactionPayload } from './transactionSlice';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

const initialState: TransactionState = {
    status: 'idle',
    error: null,
    successMessage: null,
};

describe('transactionSlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should reset the status', () => {
        const state: TransactionState = {
            status: 'success',
            error: 'Algo salió mal',
            successMessage: 'Pago exitoso',
        };

        const newState = reducer(state, resetStatus());
        expect(newState).toEqual(initialState);
    });

    it('should handle createTransaction.pending', () => {
        const action = { type: createTransaction.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            status: 'loading',
            error: null,
            successMessage: null,
        });
    });

    it('should handle createTransaction.fulfilled', () => {
        const action = {
            type: createTransaction.fulfilled.type,
            payload: { message: 'Pago exitoso' },
        };

        const state = reducer(initialState, action);
        expect(state).toEqual({
            status: 'success',
            error: null,
            successMessage: 'Pago exitoso',
        });
    });

    it('should handle createTransaction.rejected with payload', () => {
        const action = {
            type: createTransaction.rejected.type,
            payload: 'Error de validación',
            error: {},
        };

        const state = reducer(initialState, action);
        expect(state).toEqual({
            status: 'failed',
            error: 'Error de validación',
            successMessage: null,
        });
    });

    it('should handle createTransaction.rejected without payload', () => {
        const action = {
            type: createTransaction.rejected.type,
            payload: undefined,
            error: { message: 'Fallo del servidor' },
        };

        const state = reducer(initialState, action);
        expect(state).toEqual({
            status: 'failed',
            error: 'Fallo del servidor',
            successMessage: null,
        });
    });

    it('should dispatch createTransaction and succeed', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Pago exitoso' }), { status: 200 });

        const store = configureStore({
            reducer: (state = {}, action) => ({ transaction: reducer(undefined, action) }),
            middleware: [thunk],
        });

        const payload: TransactionPayload = {
            productId: '123',
            cantidad: 1,
            cuotas: 1,
            customerEmail: 'test@example.com',
            cardData: {
                cardNumber: '4111111111111111',
                cvc: '123',
                expMonth: '12',
                expYear: '25',
                cardHolder: 'Juan Perez',
            },
        };

        await store.dispatch(createTransaction(payload) as any);

        const state = store.getState().transaction;
        expect(state.status).toBe('success');
        expect(state.successMessage).toBe('Pago exitoso');
    });

    it('should dispatch createTransaction and handle API error', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Error de API' }), { status: 400 });

        const store = configureStore({
            reducer: (state = {}, action) => ({ transaction: reducer(undefined, action) }),
            middleware: [thunk],
        });

        const payload: TransactionPayload = {
            productId: '123',
            cantidad: 1,
            cuotas: 1,
            customerEmail: 'test@example.com',
            cardData: {
                cardNumber: '4111111111111111',
                cvc: '123',
                expMonth: '12',
                expYear: '25',
                cardHolder: 'Juan Perez',
            },
        };

        await store.dispatch(createTransaction(payload) as any);

        const state = store.getState().transaction;
        expect(state.status).toBe('failed');
        expect(state.error).toBe('Error de API');
    });

    it('should dispatch createTransaction and handle network error', async () => {
        fetchMock.mockRejectOnce(new Error('Network Error'));

        const store = configureStore({
            reducer: (state = {}, action) => ({ transaction: reducer(undefined, action) }),
            middleware: [thunk],
        });

        const payload: TransactionPayload = {
            productId: '123',
            cantidad: 1,
            cuotas: 1,
            customerEmail: 'test@example.com',
            cardData: {
                cardNumber: '4111111111111111',
                cvc: '123',
                expMonth: '12',
                expYear: '25',
                cardHolder: 'Juan Perez',
            },
        };

        await store.dispatch(createTransaction(payload) as any);

        const state = store.getState().transaction;
        expect(state.status).toBe('failed');
        expect(state.error).toBe('Error de red o servidor al procesar el pago');
    });
});
