// Simulated delay for backend response
const simulateNetworkDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate tickets in the backend
export const generateTickets = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        subject: `Ticket ${index + 1}`,
        priority: ["Low", "Medium", "High"][index % 3],
        status: ["Open", "In Progress", "Closed"][index % 3],
        description: `This is a description for Ticket ${index + 1}.`,
    }));
};

// Mock backend data
const allTickets = generateTickets(10000);

// Mock API function
export const fetchTickets = async (offset: number, limit: number) => {
    await simulateNetworkDelay(300); // Simulate 500ms network delay
    const data = allTickets.slice(offset, offset + limit); // Return only the requested slice
    return { data, hasMore: offset + limit < allTickets.length }; // Return data and whether more tickets are available
};
