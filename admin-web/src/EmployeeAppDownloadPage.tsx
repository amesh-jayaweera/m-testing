import logo_light from "./resources/images/logo_light.png";
import web_facebook from "./resources/images/web-facebook.svg";
import bcert1 from "./resources/images/bcert1.png";
import bcert2 from "./resources/images/bcert2.png";
import bcert3 from "./resources/images/bcert3.png";
import iicrc from "./resources/images/iicrc.png";
import jas from "./resources/images/jas.png";
import qrCode from "./resources/qr/QR Code for Download & Install Employee App.png";
import React, {useState} from "react";

export function EmployeeAppDownloadPage() {

    const [btnText, setBtnText] = useState<string>("Download & Install MultiFlex Employee App");

    return (
        <>
            <div className="bg-light multiflex-employee-app-download">
                <div className="container">
                    <div className="jumbotrone text-dark pt-2">
                        <h2>Multiflex Facility Service</h2>
                        <br/>
                        <div>
                            <div className="row">
                                <div className="d-lg-none mx-auto">
                                    <img width="100%" src={logo_light} alt="MultiFlex Logo"/>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <p>
                                        To reflect this, the services we provide are created on an individual basis, to meet these demands and help steer businesses towards their goals with pin-point accuracy. By using our experience with commercial cleaning services and by adhering to our own values, we are able to act as a true partner to our customers and meet high demands while providing important cultural support which is so important for business in the City.
                                    </p>

                                        <br/>
                                    <p>
                                        With a primary focus on businesses within Melbourne, Multiflex Facility Services provide professional business services for the financial and legal sectors, including blue chip companies, hospitality services for hotels and the leisure sector, retail services for shopping centres and retailers, public services for government departments and council offices, and services for individual professionals such as managing agents.
                                    </p>
                                </div>
                                <div className="col-12 col-lg-4 d-none d-lg-block">
                                    <img width="100%" src={logo_light} alt="MultiFLex Logo"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="text-dark">
                        <h2>Employee Mobile App</h2>
                        <img src={qrCode} alt="QR Code for Download & Install Employee App.png" className="center"/>
                        <a href="itms-services://?action=download-manifest&url=https://multiflex-employee-app-server.herokuapp.com/manifest/manifest.plist"
                           className="btn-app-download center" onClick={()=> {setBtnText("Installing ...")}}>
                            {btnText}</a>

                        <div className="mt-5">
                            <h2>Steps to follow</h2>
                            <ul>
                                <li>Step 1</li>
                                <li>Step 2</li>
                                <li>Step 3</li>
                            </ul>
                        </div>
                    </section>

                    <footer>
                        <hr className="text-dark"/>
                            <div className="d-flex justify-content-between align-item-center flex-column flex-md-row">
                                <div className="d-flex flex-column">
                                    <h4>MFS</h4>
                                    <a className="text-decoration-none"
                                       href="https://www.multiflexcleaning.com.au/company/">Company</a>
                                    <a className="text-decoration-none"
                                       href="https://www.multiflexcleaning.com.au/services/">Service</a>
                                    <a className="text-decoration-none"
                                       href="https://www.multiflexcleaning.com.au/our-people/">Our People</a>
                                    <a className="text-decoration-none"
                                       href="https://www.multiflexcleaning.com.au/sustainability/">Sustainability</a>
                                    <a className="text-decoration-none"
                                       href="https://www.multiflexcleaning.com.au/careers/">Careers</a>
                                    <a className="text-decoration-none" href="https://www.multiflexcleaning.com.au/blog/">Blog</a>
                                    <a className="text-decoration-none" href="https://www.multiflexcleaning.com.au/contact-us/">Contact</a>
                                </div>

                                <hr className="d-md-none"/>

                                    <div>
                                        <div className="mt-1">
                                            <p className="fw-bold p-0 m-0 font-weight-bold">Phone</p>
                                            <p className="p-0 m-0">1300 211 277</p>
                                        </div>

                                        <div className="mt-1">
                                            <p className="fw-bold p-0 m-0 font-weight-bold">Email</p>
                                            <p className="p-0 m-0">info@multiflexcleaning.com.au</p>
                                        </div>

                                        <div className="mt-1">
                                            <p className="fw-bold p-0 m-0 font-weight-bold">Postal Address</p>
                                            <p className="p-0 m-0">11 Hercules Dr, Truganina </p>
                                            <p className="p-0 m-0">VIC</p>
                                            <p className="p-0 m-0">3029, Australia</p>
                                        </div>
                                    </div>

                                    <hr className="d-md-none"/>
                                        <div>
                                            <p className="fw-bold font-weight-bold">Follow Us</p>
                                            <a href="https://www.facebook.com/Multiflexcleaning">
                                                <img src={web_facebook} width="50px" alt="Web Facebook Logo"/>
                                            </a>
                                        </div>

                                        <hr className="d-md-none"/>
                                            <div
                                                className="d-flex justify-content-between align-items-center flex-column align-self-center">
                                                <img width="200px" className="mt-2" src={logo_light} alt=""/>
                                                    <div className="d-flex my-3">
                                                        <img src={bcert1} width="50px" alt="bcert 1"/>
                                                        <img src={bcert2} width="50px" alt="bcert 2"/>
                                                        <img src={bcert3} width="50px" alt="bcert 3"/>
                                                        <img src={iicrc} width="38px" alt="iicrc"/>
                                                        <img src={jas} width="50px" alt="jas"/>
                                                    </div>
                                                    <div className="d-flex m-2">
                                                        <a className="mx-1 text-uppercase text-decoration-none"
                                                           href="https://www.multiflexcleaning.com.au/privacy/">Privacy</a>
                                                        <a className="mx-1 text-uppercase text-decoration-none"
                                                           href="https://www.multiflexcleaning.com.au/copyright/">Copyright</a>
                                                        <a className="mx-1 text-uppercase text-decoration-none"
                                                           href="https://www.multiflexcleaning.com.au/disclaimer/">DISCLAIMER</a>
                                                    </div>
                                            </div>
                            </div>
                    </footer>
                </div>
            </div>
        </>
    )
}