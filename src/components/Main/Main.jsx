import {Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";

export default function Main() {
    return (<>
        <main>
            <Switch>
                <section>
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>
                    <Route path='/movie'>
                        <MoviesPage/>
                    </Route>
                </section>
            </Switch>
        </main>
    </>)
}

