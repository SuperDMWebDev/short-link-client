import { Link } from 'react-router-dom'

import style from './header.module.scss'

const Header = () => {
    return (
        <div className={style.header}>
            <Link className="link" to="/"><img src="/logo.png" alt="" /></Link>
            <div className={style.user}>
                <Link className="link" to="/user"><i className="fa-solid fa-user"></i></Link>    
            </div>
        </div>
    );
}

export default Header;
