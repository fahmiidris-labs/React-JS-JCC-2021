import React from "react"
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./views/Home";
import About from "./views/About";
import ListApps from "./views/ListApps";
import FormLayout from "./views/FormLayout";
import Search from "./views/Search";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/mobile-list">
                        <ListApps />
                    </Route>
                    <Route path="/mobile-form" exact>
                        <FormLayout />
                    </Route>
                    <Route path="/mobile-form/edit/:id">
                        <FormLayout />
                    </Route>
                    <Route path="/search/:valueOfSearch">
                        <Search />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </>
    );
}

export default App;
