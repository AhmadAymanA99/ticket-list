import React from "react";
import { render, screen } from "@testing-library/react";
import TicketItem from "../components/TicketItem";
import { Ticket } from "../interfaces/Ticket";

const mockTicket: Ticket = {
    id: 1,
    subject: "Test Ticket",
    priority: "High",
    status: "Open",
    description: "This is a test description.",
};

describe("TicketItem", () => {
    it("renders ticket details correctly", () => {
        render(<TicketItem ticket={mockTicket} />);

        expect(screen.getByText("Test Ticket")).toBeInTheDocument();
        expect(screen.getByText("Priority: High")).toBeInTheDocument();
        expect(screen.getByText("Status: Open")).toBeInTheDocument();
        expect(screen.getByText("This is a test description.")).toBeInTheDocument();
    });
});
