import { Link } from 'react-router-dom'

import style from './header.module.scss'

const Header = () => {
    return (
        <div className={style.header}>
            <Link className="link" to="/"><img src="https://firebasestorage.googleapis.com/v0/b/sale-react.appspot.com/o/images%2FCapture.PNG?alt=media&token=750118b3-9bf5-4376-8d2d-38feda6c6d86" alt="" /></Link>
            <div className={style.user}>
                <Link className="link" to="/user"><i className="fa-solid fa-user"></i></Link>    
            </div>
        </div>
    );
}

export default Header;
