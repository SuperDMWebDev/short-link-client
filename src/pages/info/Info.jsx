import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import Header from '../../components/header/Header'
import style from './info.module.scss'
import userSlice from '../../features/users/userSlice'
import { userSelector } from '../../features/selector'

const InfoMe = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(userSelector)
    
    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch(userSlice.actions.logout())
        navigate('/')
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className={style.infoMe}>
                <div className={style.options}>
                    <span className={style.account}>
                        Tài khoản của tôi
                    </span>
                    <span className={style.invoice}>
                        <Link className="link" to="/links">Danh sách link</Link>
                    </span>
                    <span 
                        className={style.logout}
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </span>
                </div>

                <div className={style.info}>
                    <div className={style.title}>
                        TÀI KHOẢN CỦA TÔI
                    </div>
                    <span className={style.acc}>Thông tin tài khoản</span>
                    <div className={style.infoAccount}>
                        <span>Thông tin liên lạc</span>
                        <span>{user.username}</span>
                        <span><Link clasName="link" to="/password">Thay đổi mật khẩu</Link></span>                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoMe;
