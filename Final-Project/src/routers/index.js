import Cookies from "js-cookie"
import { useContext, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Main from "../components/Main"
import { UserContext } from "../contexts/UserProvider"
import ChangePassword from "../views/auth/ChangePassword"
import Login from "../views/auth/Login"
import Register from "../views/auth/Register"
import GameDetail from "../views/games/GameDetail"
import GameForm from "../views/games/GameForm"
import GamesList from "../views/games/GameList"
import Games from "../views/games/Games"

import Home from "../views/Home"
import MovieDetail from "../views/movies/MovieDetail"
import MovieForm from "../views/movies/MovieForm"
import Movies from "../views/movies/Movies"
import MoviesList from "../views/movies/MoviesList"

const Routers = () => {

    const { setLoginStatus } = useContext(UserContext);

    useEffect(() => {
        if (Cookies.get("token") !== undefined) {
            setLoginStatus(true)
        } else {
            setLoginStatus(false)
        }
    }, [setLoginStatus])

    return (
        <Router>
            <Main>
                <Switch>
                    <Route path="/" exact component={Home} />

                    <PrivateRoute path="/movies-list" exact component={MoviesList} />
                    <PrivateRoute path="/movies-list/create" component={MovieForm} />
                    <PrivateRoute path="/movies-list/edit/:id" component={MovieForm} />

                    <Route path="/movies" exact component={Movies} />
                    <Route path="/movies/:id" component={MovieDetail} />
                    <Route path="/games" exact component={Games} />
                    <Route path="/games/:id" component={GameDetail} />
                    
                    <PrivateRoute path="/games-list" exact component={GamesList} />
                    <PrivateRoute path="/games-list/create" component={GameForm} />
                    <PrivateRoute path="/games-list/edit/:id" component={GameForm} />

                    <AuthRoute path="/login" component={Login} />
                    <AuthRoute path="/register" component={Register} />
                    <PrivateRoute path="/change-password" component={ChangePassword} />
                </Switch>
            </Main>
        </Router>
    )
}

const AuthRoute = ({...props}) => {
    const { loginStatus } = useContext(UserContext);
    if (loginStatus && Cookies.get("token") !== undefined) {
        return <Redirect to="/" />
    } else {
        return <Route {...props} />
    }
}

const PrivateRoute = ({...props}) => {
    const { loginStatus } = useContext(UserContext);
    if (!loginStatus && Cookies.get("token") === undefined) {
        return <Redirect to="/login" />
    } else {
        return <Route {...props} />
    }
}

export default Routers
