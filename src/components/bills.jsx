import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import { deleteBill, getBillsById } from "../services/billService";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import BillsTable from "./billsTable";
import Pagination from "./common/pagination";

class Bills extends Component {
    state = {
        bills: [],
        genres: [],
        currentPage: 1,
        pageSize: 5,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: "genre.name", order: "asc" },
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: "", name: "所有类型" }, ...data];

        const { data: bills } = await getBillsById(this.props.user._id);
        this.setState({ genres, bills });
    }

    handleDelete = async bill => {
        const originalBills = this.state.bills;
        const bills = originalBills.filter(b => b._id !== bill._id);
        this.setState({ bills });

        try {
            await deleteBill(bill._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                console.log("未找到该账单，可能已经删除。");

            this.setState({ bills: originalBills });
        }
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            searchQuery,
            bills: allBills,
        } = this.state;

        let filtered = allBills;
        if (searchQuery) filtered = allBills.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allBills.filter(b => b.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const bills = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: bills };
    };

    render() {
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        const { totalCount, data: bills } = this.getPagedData();

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link to="/bills/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
                        新建账单
                    </Link>
                    <p>共找到{totalCount}条数据。</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <BillsTable
                        bills={bills}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        pageSize={pageSize}
                        currentPage={currentPage}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Bills;
