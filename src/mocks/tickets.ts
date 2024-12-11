// Simulate a "fake" API request to fetch tickets
export const getTickets = (page: number, pageSize: number) => {
    return new Promise<any[]>((resolve) => {
        // Simulate a delay to mock an API call
        setTimeout(
            () => {
                const tickets = Array.from({ length: pageSize }, (_, index) => ({
                    id: page * pageSize + index + 1,
                    subject: `Ticket ${page * pageSize + index + 1}`,
                    priority: ["Low", "Medium", "High"][index % 3],
                    status: ["Open", "In Progress", "Closed"][index % 3],
                    description: `This is a description for Ticket ${page * pageSize + index + 1}.`,
                }));
                resolve(tickets);
            },
            page === 0 ? 0 : 500
        ); // Simulated delay
    });
};
