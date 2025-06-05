import { renderHook, act } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';
import { useCheckoutSteps } from '../hooks/useCheckoutSteps';
import { goToNextStep, resetSteps, setSelectedProductId } from '../store/checkoutSlice';

jest.mock('react-redux');

describe('useCheckoutSteps hook', () => {
  const useDispatchMock = reactRedux.useDispatch as jest.Mock;
  const useSelectorMock = reactRedux.useSelector as jest.Mock;

  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatchMock.mockReturnValue(dispatchMock);
  });

  it('should return currentStep and selectedProductId from state', () => {
    useSelectorMock.mockImplementation((selector) =>
      selector({
        checkout: { currentStep: 2, selectedProductId: '123' },
      })
    );

    const { result } = renderHook(() => useCheckoutSteps());

    expect(result.current.currentStep).toBe(2);
    expect(result.current.selectedProductId).toBe('123');
  });

  it('should dispatch goToNextStep action', () => {
    useSelectorMock.mockImplementation((selector) =>
      selector({
        checkout: { currentStep: 1, selectedProductId: null },
      })
    );

    const { result } = renderHook(() => useCheckoutSteps());

    act(() => {
      result.current.goToNextStep();
    });

    expect(dispatchMock).toHaveBeenCalledWith(goToNextStep());
  });

  it('should dispatch resetSteps action', () => {
    useSelectorMock.mockImplementation((selector) =>
      selector({
        checkout: { currentStep: 3, selectedProductId: 'abc' },
      })
    );

    const { result } = renderHook(() => useCheckoutSteps());

    act(() => {
      result.current.resetSteps();
    });

    expect(dispatchMock).toHaveBeenCalledWith(resetSteps());
  });

  it('should dispatch setSelectedProductId action with id', () => {
    useSelectorMock.mockImplementation((selector) =>
      selector({
        checkout: { currentStep: 1, selectedProductId: null },
      })
    );

    const { result } = renderHook(() => useCheckoutSteps());

    act(() => {
      result.current.setSelectedProductId('xyz');
    });

    expect(dispatchMock).toHaveBeenCalledWith(setSelectedProductId('xyz'));
  });

  it('should dispatch setSelectedProductId action with null', () => {
    useSelectorMock.mockImplementation((selector) =>
      selector({
        checkout: { currentStep: 1, selectedProductId: 'xyz' },
      })
    );

    const { result } = renderHook(() => useCheckoutSteps());

    act(() => {
      result.current.setSelectedProductId(null);
    });

    expect(dispatchMock).toHaveBeenCalledWith(setSelectedProductId(null));
  });
});
