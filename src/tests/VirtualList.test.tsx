import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VirtualList from "../components/VirtualList";

const mockData = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

describe("VirtualList", () => {
    it("renders only the visible rows", () => {
        const rowHeight = 50;
        const containerHeight = 200;

        render(<VirtualList data={mockData} rowHeight={rowHeight} containerHeight={containerHeight} renderRow={(item) => <div>{item}</div>} loadMore={() => {}} />);

        // Verify initial visible items
        const visibleItems = screen.getAllByText(/Item/);
        expect(visibleItems.length).toBe(4); // 200px / 50px = 4 visible items
    });

    it("updates visible rows on scroll", () => {
        const rowHeight = 50;
        const containerHeight = 200;

        const { container } = render(<VirtualList data={mockData} rowHeight={rowHeight} containerHeight={containerHeight} renderRow={(item) => <div>{item}</div>} loadMore={() => {}} />);

        const scrollable = container.querySelector(".virtual-list-container");
        fireEvent.scroll(scrollable!, { target: { scrollTop: 200 } });

        // Verify updated visible items
        const visibleItems = screen.getAllByText(/Item/);
        expect(visibleItems[0].textContent).toBe("Item 5");
    });
});
