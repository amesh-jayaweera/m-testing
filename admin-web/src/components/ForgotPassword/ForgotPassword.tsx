import React from "react";
import logo from "../../resources/images/logo_light.svg";

export function ForgotPassword() {

    return (
        <div className="fix-menu">
            <section className="login d-flex">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="login-card card-block auth-body mr-auto ml-auto">
                                <form className="md-float-material needs-validation" noValidate>
                                    <div className="auth-box m-2">
                                        <img className="img-fluid" src={logo} alt="logo"/>
                                            <div className="row p-o m-0">
                                                <div className="col-md-12 text-center">
                                                    <h3 className="text-dark m-0 p">Forgot Password</h3>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="form-group">
                                                <p>Enter your email address to reset your password</p>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control"
                                                       placeholder="Your email address" required/>
                                                    <small className="invalid-feedback text-left">Please enter your
                                                        email address.</small>
                                            </div>


                                            <div className="row mt-2">
                                                <div className="col-md-12">
                                                    <button type="submit" className="btn btn-primary btn-block">Submit
                                                    </button>
                                                </div>
                                            </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
