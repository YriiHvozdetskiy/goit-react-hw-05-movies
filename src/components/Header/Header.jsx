import Navigation from "../Navigation/Navigation";
import s from './Header.module.scss'

export default function Header() {
    return (
        <header className={s.header}>
            <Navigation/>
        </header>
    )
}

