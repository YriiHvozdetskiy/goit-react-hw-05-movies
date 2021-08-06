import {Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import NotFoundView from "../pages/NotFoundView/NotFoundView";

export default function Main() {
    return (<>
        <main>
            <section>
                <Switch>
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>
                    <Route path='/movies/:movieId'>
                        <MoviesPage/>
                    </Route>
                    <Route>
                        <NotFoundView/>
                    </Route>
                </Switch>
            </section>
        </main>
    </>)
}

