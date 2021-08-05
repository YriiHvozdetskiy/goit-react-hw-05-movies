import {NavLink} from "react-router-dom";

export default function Navigation() {
    return (<>
            <nav>
                <ul>
                    <li>
                        <NavLink exact to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/movie">
                            Movie
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}




