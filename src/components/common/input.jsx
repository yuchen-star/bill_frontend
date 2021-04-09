import React from "react";

const Input = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group row">
            {/* <label htmlFor={name}>{label}</label>
            <input {...rest} name={name} id={name} className="form-control"></input>
            {error && <div className="alert alert-danger">{error}</div>} */}

            <label htmlFor={name} className="col-sm col-form-label">
                {label}
            </label>
            <div className="col-sm-5">
                <input {...rest} name={name} id={name} className="form-control"></input>
                {/* <input type="password" className="form-control" id="inputPassword" /> */}
            </div>
        </div>
    );
};

export default Input;
