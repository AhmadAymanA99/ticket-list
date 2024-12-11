import React from "react";
import { Ticket } from "../interfaces/Ticket";

/**
 * Displays individual ticket details.
 *
 * @param ticket - The ticket object containing details to display.
 */
const TicketItem: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
    return (
        <div className="ticket-item">
            <h4>{ticket.subject}</h4>
            <p>Priority: {ticket.priority}</p>
            <p>Status: {ticket.status}</p>
            <p>{ticket.description}</p>
        </div>
    );
};

export default TicketItem;
