import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router";
import Homepage from "./Homepage.tsx";

describe('Homepage', () => {
  it('should render', () => {
    render(<Homepage />, {wrapper: BrowserRouter})
  });
})
