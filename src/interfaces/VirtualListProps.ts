/**
 * Props for the VirtualList component.
 * @template T - The type of data items to be displayed.
 */
export interface VirtualListProps<T> {
    data: T[]; // The data array to be rendered virtually.
    rowHeight: number; // Height of each row in pixels.
    containerHeight: number; // Height of the scrollable container in pixels.
    renderRow: (item: T, index: number) => React.ReactNode; // Function to render each row.
    loadMore: () => void; // Function to load more data when scrolling to the bottom.
}
