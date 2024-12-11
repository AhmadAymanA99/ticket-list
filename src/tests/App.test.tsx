import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Ticket List heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Ticket List/i);
    expect(headingElement).toBeInTheDocument();
});
