import { describe, expect, it, vi } from 'vitest';
import useDetails from '../../../src/hooks/details.hooks';
import { MockedFunction } from 'vitest';

import { detailsHooksMockedData } from '../__data__/mockData';

vi.mock('../../../src/hooks/details.hooks');

const useDetailsMock = useDetails as MockedFunction<typeof useDetails>;


describe('Testing useDetails hook', () => {
  it('should fetch car', async () => {
    useDetailsMock.mockReturnValue(detailsHooksMockedData);
    
    const result = useDetailsMock();

    expect(result.car).toEqual(detailsHooksMockedData.car);
    expect(result.optionsInputFields).toEqual(detailsHooksMockedData.optionsInputFields);
    expect(result.specsInputFields).toEqual(detailsHooksMockedData.specsInputFields);
  });
  
});