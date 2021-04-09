import React, { Component } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import Userstable from "./usersTable";

class Users extends Component {
    state = {
        users: [],
        currentPage: 1,
        pageSize: 5,
        sortColumn: { path: "name", order: "asc" },
    };

    async componentDidMount() {
        const { data: users } = await getUsers();

        this.setState({ users });
    }

    handleDelete = async user => {
        const originalUsers = this.state.users;
        const users = originalUsers.filter(u => u._id !== user._id);
        this.setState({ users });

        try {
            await deleteUser(user._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) console.log("该用户已经被删除了！");
            if (ex.response && ex.response.status === 400) console.log("你的权限不足！");

            this.setState({ users: originalUsers });
        }
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    getPageData = () => {
        const { pageSize, currentPage, users: allUsers } = this.state;

        const users = paginate(allUsers, currentPage, pageSize);

        return { totalCount: allUsers.length, data: users };
    };

    render() {
        const { user } = this.props;
        const { pageSize, currentPage, sortColumn } = this.state;
        const { totalCount, data: users } = this.getPageData();

        return (
            <div className="row">
                <div className="col">
                    {user && user.isAdmin && (
                        <React.Fragment>
                            <p>共找到{totalCount}条数据</p>
                            <Userstable
                                users={users}
                                onDelete={this.handleDelete}
                                sortColumn={sortColumn}
                                pageSize={pageSize}
                                currentPage={currentPage}
                            />
                            <Pagination
                                itemsCount={totalCount}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}
                            />
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

export default Users;
