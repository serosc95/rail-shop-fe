import paymentReducer, { setCardData, updateCantidadYCuotas, resetPayment, setStatus, setError } from './paymentSlice';
import type { CardData, PaymentState } from './paymentSlice';

describe('paymentSlice reducer', () => {
    const initialState: PaymentState = {
        cardData: null,
        status: 'idle',
        error: null,
        lastUpdated: null,
      };

    const validCardData: CardData = {
        cardNumber: '1234567890123456',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'John Doe',
        email: 'john@example.com',
        productId: 'prod123',
        cantidad: 1000,
        cuotas: 3,
    };

    it('should return the initial state when passed an empty action', () => {
        expect(paymentReducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('setCardData', () => {
        it('should set cardData and reset error/status when data is complete', () => {
            const action = setCardData(validCardData);
            const state = paymentReducer(initialState, action);

            expect(state.cardData).toEqual(validCardData);
            expect(state.error).toBeNull();
            expect(state.status).toBe('idle');
            expect(typeof state.lastUpdated).toBe('number');
        });

        it('should set error and status to error when data is incomplete', () => {
            const incompleteData = { ...validCardData, cardNumber: '' };
            const action = setCardData(incompleteData);
            const state = paymentReducer(initialState, action);

            expect(state.cardData).toBeNull();
            expect(state.error).toBe('Todos los campos de la tarjeta y datos son obligatorios.');
            expect(state.status).toBe('error');
            expect(state.lastUpdated).toBeNull();
        });
    });

    describe('updateCantidadYCuotas', () => {
        it('should update cantidad and cuotas if cardData exists', () => {
            const preState = { ...initialState, cardData: validCardData, lastUpdated: 1 };
            const payload = { cantidad: 2000, cuotas: 5 };
            const action = updateCantidadYCuotas(payload);
            const state = paymentReducer(preState, action);

            expect(state.cardData?.cantidad).toBe(2000);
            expect(state.cardData?.cuotas).toBe(5);
            expect(state.lastUpdated).toBeGreaterThan(preState.lastUpdated!);
        });

        it('should do nothing if cardData is null', () => {
            const action = updateCantidadYCuotas({ cantidad: 500, cuotas: 2 });
            const state = paymentReducer(initialState, action);
            expect(state).toEqual(initialState);
        });
    });

    describe('resetPayment', () => {
        it('should reset state to initial values', () => {
            const preState: PaymentState = { ...initialState, cardData: validCardData, status: 'success', error: 'error', lastUpdated: 123 };
            const action = resetPayment();
            const state = paymentReducer(preState, action);

            expect(state).toEqual(initialState);
        });
    });

    describe('setStatus', () => {
        it('should set the status', () => {
            const action = setStatus('loading');
            const state = paymentReducer(initialState, action);
            expect(state.status).toBe('loading');
        });
    });

    describe('setError', () => {
        it('should set the error and status to error when error message is provided', () => {
            const action = setError('Error occurred');
            const state = paymentReducer(initialState, action);
            expect(state.error).toBe('Error occurred');
            expect(state.status).toBe('error');
        });

        it('should clear the error without changing status if error is null', () => {
            const preState: PaymentState = { ...initialState, error: 'Some error', status: 'error' };
            const action = setError(null);
            const state = paymentReducer(preState, action);
            expect(state.error).toBeNull();
            expect(state.status).toBe('error'); // status remains unchanged in your reducer code
        });
    });
});
