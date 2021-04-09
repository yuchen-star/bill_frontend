import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("用户名"),
        password: Joi.string().required().label("密码"),
    };

    doSubmit = async () => {
        try {
            const { username, password } = this.state.data;
            await auth.login(username, password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return (
            <div>
                <h1>登录</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "用户名")}
                    {this.renderInput("password", "密码", "password")}
                    {this.renderButton("登录")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
