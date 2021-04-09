import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data, pageSize, currentPage }) => {
    return (
        <table className="table">
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
            <TableBody
                columns={columns}
                data={data}
                pageSize={pageSize}
                currentPage={currentPage}
            />
        </table>
    );
};

export default Table;
