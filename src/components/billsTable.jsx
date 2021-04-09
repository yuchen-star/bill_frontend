import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Dropdowns from './common/dropdowns';
import moment from 'moment';

class BillsTable extends Component {
    columns = [
        // { path: "user.name", label: "创建者" },
        {
            path: "title",
            label: "标题",
            content: bill => <Link to={`/bills/${bill._id}`}>{bill.title}</Link>,
        },
        { path: "price", label: "金额" },
        { path: "genre.name", label: "类型" },
        { path: "remarks", label: "备注" },
        { path: "time", label: "时间" },
    ];

    items = [
        { path: "price", order: "asc", label: "按金额从小到大" },
        { path: "price", order: "desc", label: "按金额从大到小" },
        { path: "time", order: "asc", label: "按时间从晚到近" },
        { path: "time", order: "desc", label: "按时间从近到晚" },
    ];

    deleteColumn = {
        key: "delete",
        content: bill => (
            <button onClick={() => this.props.onDelete(bill)} className="btn btn-danger btn-sm">
                删除
            </button>
        ),
    };

    constructor() {
        super();
        this.columns.push(this.deleteColumn);
    }

    render() {
        const { onSort, sortColumn, pageSize, currentPage } = this.props;
        let { bills } = this.props;
        bills.forEach(bill => bill.time = moment(bill.time).format('YYYY-MM-DD HH:mm:ss'));

        return (
            <React.Fragment>
                <Dropdowns items={this.items} sortColumn={sortColumn} onSort={onSort} />
                <Table columns={this.columns} data={bills} sorColumn={sortColumn} onSort={onSort} pageSize={pageSize} currentPage={currentPage} />
            </React.Fragment>
        );
    }
}

export default BillsTable;
