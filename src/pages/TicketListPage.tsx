import React, { useState, useEffect } from "react";
import { getTickets } from "../mocks/tickets";
import TicketItem from "../components/TicketItem";
import VirtualList from "../components/VirtualList";

const TicketListPage: React.FC = () => {
    const pageSize = 100; // Number of tickets per page
    const [visibleTickets, setVisibleTickets] = useState<any[]>([]); // Initially load an empty list of tickets
    const [currentPage, setCurrentPage] = useState(0); // Keep track of the current page
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Load initial tickets
    useEffect(() => {
        const loadInitialTickets = async () => {
            const initialTickets = await getTickets(0, pageSize);
            setVisibleTickets(initialTickets);
        };
        loadInitialTickets();
    }, []);

    const loadMoreTickets = async () => {
        if (!isLoading) {
            setIsLoading(true);
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            console.log({ nextPage, pageSize });
            const newTickets = await getTickets(nextPage, pageSize);
            setVisibleTickets((prev) => [...prev, ...newTickets]);
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: "16px" }}>
            <h1>Ticket List</h1>
            <VirtualList
                data={visibleTickets}
                rowHeight={100}
                containerHeight={500}
                renderRow={(ticket) => <TicketItem ticket={ticket} />}
                loadMore={loadMoreTickets} // load more tickets when reach scroll end
            />
            {isLoading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
};

export default TicketListPage;
