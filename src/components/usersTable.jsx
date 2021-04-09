import React, { Component } from "react";
import Table from "./common/table";

class Userstable extends Component {
    columns = [{ path: "name", label: "用户名" }];

    deleteColumn = {
        key: "delete",
        content: user => (
            <button onClick={() => this.props.onDelete(user)} className="btn btn-danger btn-sm">
                删除
            </button>
        ),
    };

    constructor() {
        super();
        this.columns.push(this.deleteColumn);
    }

    render() {
        const { users, sortColumn, pageSize, currentPage } = this.props;

        return (
            <Table
                columns={this.columns}
                data={users}
                sortColumn={sortColumn}
                onSort={() => {}}
                pageSize={pageSize}
                currentPage={currentPage}
            />
        );
    }
}

export default Userstable;
