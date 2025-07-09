import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router";
import LoginPage from "./Login.tsx";

describe('Login page', () => {
  it('should render', () => {
    render(<LoginPage />, {wrapper: BrowserRouter})
  });
})
