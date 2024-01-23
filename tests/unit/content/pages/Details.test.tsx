import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Details from "../../../../src/content/pages/Details";

import ThemeProviderWrapper from "../../../../src/theme/ThemeProvider";

vi.mock('react-helmet-async', () => {
  return {
    Helmet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe("Testing Details Page component", () => {
  it("should have manufacturer", async () => {
    const result = render(
      <BrowserRouter>
        <ThemeProviderWrapper>
          <Details />
        </ThemeProviderWrapper>
      </BrowserRouter>
    );

    const manufacturerTypography = await result.getByText("Manufacturer:", {
      exact: false,
    });

    // Assert whether the Typography component with the specified text exists in the rendered component
    expect(manufacturerTypography != undefined).toBeTruthy;
  });
});
