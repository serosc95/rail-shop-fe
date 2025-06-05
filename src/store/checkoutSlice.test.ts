import checkoutReducer, { goToNextStep, resetSteps, setSelectedProductId } from './checkoutSlice';

describe('checkoutSlice', () => {
    const initialState = {
        currentStep: 1,
        selectedProductId: null,
    };

    it('debería retornar el estado inicial', () => {
        expect(checkoutReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('debería incrementar currentStep con goToNextStep', () => {
        const nextState = checkoutReducer(initialState, goToNextStep());
        expect(nextState.currentStep).toBe(2);
        expect(nextState.selectedProductId).toBeNull();
    });

    it('debería resetear el estado con resetSteps', () => {
        const modifiedState = {
            currentStep: 3,
            selectedProductId: 'abc123',
        };
        const nextState = checkoutReducer(modifiedState, resetSteps());
        expect(nextState).toEqual(initialState);
    });

    it('debería establecer el ID del producto con setSelectedProductId', () => {
        const nextState = checkoutReducer(initialState, setSelectedProductId('prod-1'));
        expect(nextState.selectedProductId).toBe('prod-1');
        expect(nextState.currentStep).toBe(1);
    });

    it('debería aceptar null como valor en setSelectedProductId', () => {
        const modifiedState = {
            currentStep: 2,
            selectedProductId: 'old-id',
        };
        const nextState = checkoutReducer(modifiedState, setSelectedProductId(null));
        expect(nextState.selectedProductId).toBeNull();
        expect(nextState.currentStep).toBe(2);
    });
});
