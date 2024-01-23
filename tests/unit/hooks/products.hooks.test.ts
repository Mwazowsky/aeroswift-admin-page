import { describe, expect, it, vi } from 'vitest';
import useProducts from '../../../src/hooks/products.hooks';
import { MockedFunction } from 'vitest';

import { productsHooksMockedData } from '../__data__/mockData';

vi.mock('../../../src/hooks/products.hooks');

const useProductsMock = useProducts as MockedFunction<typeof useProducts>;


describe('Testing useProducts hook', () => {
  it('should fetch cars', async () => {
    useProductsMock.mockReturnValue(productsHooksMockedData);
    
    const result = useProductsMock();

    expect(result.cars).toEqual(productsHooksMockedData.cars);
    expect(result.filters).toEqual(productsHooksMockedData.filters);
    expect(result.params).toEqual(productsHooksMockedData.params);
    expect(result.loading).toBe(productsHooksMockedData.loading);
    expect(result.meta).toEqual(productsHooksMockedData.meta);
  });
  
});