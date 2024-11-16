import React from 'react';
import { Route } from "react-router-dom";
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { Container, Row, Col } from 'react-bootstrap';

function DashboardLayout({ children }) {
    return (
        <div>
            <div className="dashboard_layout_wrapper">
                <Header url={"/dashboard"} />
                <Container fluid>
                    <Row>
                        <aside className={"col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-2 d-none d-lg-block sidebar-nav"}>
                            <SideBar />
                        </aside>
                        <main className={"col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 col-xxl-10"}>
                            <div className={"main_content_wrapper"}>
                                {children}
                            </div>
                        </main>
                    </Row>
                </Container>
            </div>
        </div>
    );
}


export default DashboardLayout;

