import React, { useRef, useState, useEffect } from "react";
import "../styles/VirtualList.css";
import { VirtualListProps } from "../interfaces/VirtualListProps";

/**
 * A virtualized list component to efficiently render large datasets.
 *
 * @param data - The data array.
 * @param rowHeight - The height of each row.
 * @param containerHeight - The height of the container.
 * @param renderRow - Function to render each row.
 * @param loadMore - Function to load more data when the user scrolls to the end.
 */
const VirtualList = <T,>({ data, rowHeight, containerHeight, renderRow, loadMore }: VirtualListProps<T>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);

    const totalHeight = data.length * rowHeight;

    useEffect(() => {
        const visibleRows = Math.ceil(containerHeight / rowHeight);
        setEndIndex(visibleRows);
    }, [containerHeight, rowHeight]);

    const onScroll = () => {
        if (!containerRef.current) return;

        const scrollTop = containerRef.current.scrollTop;
        const scrollHeight = containerRef.current.scrollHeight;
        const clientHeight = containerRef.current.clientHeight;

        const newStartIndex = Math.floor(scrollTop / rowHeight);
        const visibleRows = Math.ceil(containerHeight / rowHeight);

        setStartIndex(newStartIndex);
        setEndIndex(newStartIndex + visibleRows);

        // If the user is near the bottom of the list, load more data
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            loadMore();
        }
    };

    return (
        <div ref={containerRef} className="virtual-list-container" onScroll={onScroll} style={{ height: containerHeight, overflowY: "auto" }}>
            <div
                className="virtual-list-rows"
                style={{
                    height: totalHeight,
                }}
            >
                {data.slice(startIndex, endIndex).map((item, index) => (
                    <div
                        key={startIndex + index}
                        className="virtual-list-row"
                        style={{
                            top: (startIndex + index) * rowHeight,
                            height: rowHeight,
                        }}
                    >
                        {renderRow(item, startIndex + index)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VirtualList;
