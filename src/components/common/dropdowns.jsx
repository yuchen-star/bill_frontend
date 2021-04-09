import React, { Component } from "react";

class Dropdowns extends Component {
    raiseSort = item => {
        const sortColumn = { ...this.props.sortColumn };
        if (item.path === sortColumn.path && item.order === sortColumn.order) return null;

        sortColumn.path = item.path;
        sortColumn.order = item.order;
        this.props.onSort(sortColumn);
    };

    render() {
        const item = { path: "", order: "" };

        return (
            <React.Fragment>
                <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"></link>
                <script type="text/javascript" src="js/jquery.min.js"></script>
                <script type="text/javascript" src="js/bootstrap.min.js"></script>
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-info dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        排序方式
                    </button>
                    <div className="dropdown-menu">
                        {this.props.items.map(item => (
                            <a
                                className="dropdown-item"
                                onClick={() => this.raiseSort(item)}
                                href="#"
                                key={item.path + item.order}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="dropdown-divider"></div>
                        <a
                            className="dropdown-item"
                            onClick={() => this.raiseSort(item)}
                            href="#"
                            key={item.path + item.order}
                        >
                            默认排序
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Dropdowns;
