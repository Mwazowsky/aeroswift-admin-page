import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ProductsTable from "../../../../src/content/applications/Products/ProductsTable";
import useProducts from "../../../../src/hooks/products.hooks";
import { MockedFunction } from "vitest";
import { productsHooksMockedData } from "../../__data__/mockData";

import ThemeProviderWrapper from "../../../../src/theme/ThemeProvider";
import React from "react";

vi.mock("../../../../src/hooks/products.hooks");

const useProductsMock = useProducts as MockedFunction<typeof useProducts>;

describe("Testing productsTable component", () => {
  it("product table rows must be more than zero", async () => {
    

    useProductsMock.mockReturnValue(productsHooksMockedData);

    const {
      cars,
      filters,
      handleStatusChange,
      handleEdit,
      handleRemove,
      handleRemoveMultiple,
      handleSearch,
    } = useProductsMock();

    const result = render(
      <BrowserRouter>
        <ThemeProviderWrapper>
          <ProductsTable
            cars={cars}
            filters={filters}
            handleStatusChange={handleStatusChange}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            handleSearch={handleSearch}
            handleRemoveMultiple={handleRemoveMultiple}
          />
        </ThemeProviderWrapper>
      </BrowserRouter>
    );
    const tableRows = await result.queryAllByTestId("table-rows");
    expect(tableRows.length > 0).toBeTruthy();
  });
});
