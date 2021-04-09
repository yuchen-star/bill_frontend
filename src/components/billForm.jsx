import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getBillsById, saveBill } from "../services/billService";
import auth from '../services/authService';

class BillForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            price: "",
            remarks: ""
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("标题"),
        genreId: Joi.string().required().label("类型"),
        price: Joi.number().required().min(0).label("金额"),
        remarks: Joi.string().max(100).label("备注"),
    };

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateBill() {
        try {
            const billId = this.props.match.params.id;
            if (billId === "new") return;

            const { data: bill } = await getBillsById(billId);
            this.setState({ data: this.mapToViewBill(bill) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) this.props.history.replace('/users');
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        console.log(this.state.genres)
        await this.populateBill();
    }

    mapToViewBill(bill) {
        return {
            _id: bill._id,
            title: bill.title,
            genreId: bill.genre._id,
            price: bill.price,
            remarks: bill.remarks
        };
    }

    doSubmit = async () => {
        const bill = { ...this.state.data };
        const user = await auth.getCurrentUser();

        bill.userId = user._id;

        await saveBill(bill);

        this.props.history.push('/bills');
    }

    render() {
        return (
            <div>
                <h1>Bill Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "标题")}
                    {this.renderSelect("genreId", "类型", this.state.genres)}
                    {this.renderInput("price", "金额", "number")}
                    {this.renderInput("remarks", "备注")}
                    {this.renderButton("保存")}
                </form>
            </div>
        )
    }
}

export default BillForm;
