import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", invitationCode: "" },
        errors: {}
    };

    schema = {
        username: Joi.string().min(2).required().label("用户名"),
        password: Joi.string().min(5).required().label("密码"),
        invitationCode: Joi.string().required().label("邀请码")
    };

    doSubmit = async () => {
        try {
            const response = await register(this.state.data);
            auth.loginWithJwt(response.headers["x-auth-token"]);
            window.location = '/';
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
                <h1>注册</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', "用户名")}
                    {this.renderInput('password', "密码", "password")}
                    {this.renderInput('invitationCode', "邀请码")}
                    {this.renderButton("注册")}
                </form>
            </div>
        )
    }
}

export default RegisterForm;
