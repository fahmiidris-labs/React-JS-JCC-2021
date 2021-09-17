import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import "./Styles/App.css"

import Tugas9 from "./Tugas-9/tugas-9"
import Tugas10 from "./Tugas-10/tugas-10"
import Tugas11 from "./Tugas-11/tugas-11"
import Tugas12 from "./Tugas-12/tugas-12"
import Tugas13 from "./Tugas-13/tugas-13"
import Tugas14 from "./Tugas-14/tugas-14"
import Form from "./Tugas-14/form";

import { ThemeProvider } from "./Tugas-15/themeProvider";
import Nav from "./Tugas-15/nav";
import Tugas15 from "./Tugas-15/tugas-15";
import Form5 from "./Tugas-15/form";

const App = () => {

    return (
        <Router>
            <div className="box-app">
                <ThemeProvider>
                    <Nav />
                </ThemeProvider>

                <Switch>
                    <Route path="/" exact>
                        <Tugas9 />
                    </Route>
                    <Route path="/tugas-10">
                        <Tugas10 />
                    </Route>
                    <Route path="/tugas-11">
                        <Tugas11 />
                    </Route>
                    <Route path="/tugas-12">
                        <Tugas12 />
                    </Route>
                    <Route path="/tugas-13">
                        <Tugas13 />
                    </Route>
                    <Route path="/tugas-14" exact>
                        <Tugas14 />
                    </Route>
                    <Route path="/tugas-14/create">
                        <Form />
                    </Route>
                    <Route path="/tugas-14/edit/:id">
                        <Form />
                    </Route>
                    <Route path="/tugas-15" exact>
                        <Tugas15 />
                    </Route>
                    <Route path="/tugas-15/create">
                        <Form5 />
                    </Route>
                    <Route path="/tugas-15/edit/:id">
                        <Form5 />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
