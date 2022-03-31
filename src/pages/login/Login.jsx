import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux' 

import Header from '../../components/header/Header'
import style from './login.module.scss'
import userSlice from '../../features/users/userSlice'


const Login = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState()

    const statusRef = useRef()

    const handleLogin = async () => {
        if(!username || !password) {
            statusRef.current.innerHTML = 'Vui lòng điền đầy đủ thông tin'
        }
        else {
            const res = await axios.post('https://shortlink123.herokuapp.com/api/auth/login', {
                username: username,
                password: password
            })

            setStatus(res.data.enumError)
            
            if(res.data.success) {
                dispatch(userSlice.actions.login(res.data))
                localStorage.setItem('user', JSON.stringify(res.data.info))
                localStorage.setItem('token', JSON.stringify(res.data.accessToken))
                navigate('/')
            }
        }
    }

    useEffect(() => {
        if(status === 1) {
            statusRef.current.innerHTML = 'Vui lòng điền đầy đủ thông tin'
        }
        else if(status === 2) {
            statusRef.current.innerHTML = 'Mật khẩu tối thiểu 6 ký tự'
        }
        else if(status === 3) {
            statusRef.current.innerHTML = 'Thông tin tài khoản không chính xác'
        }
        else if(status === 4) {
            statusRef.current.innerHTML = 'Mật khẩu không chính xác'
        }

        return () => {}
    }, [status])

    return (
        <>
            <Header />
            <div className={style.login}>
                <div className={style.title}>
                    TÀI KHOẢN
                </div>
                <div className={style.wrapper}>
                    <div className={style.account}>
                        <span className={style.custom}>Khách hàng đã đăng kí tài khoản</span>
                        <span>Bạn đã có tài khoản, xin mời đăng nhập bằng địa chỉ email đăng ký.</span>

                        <div className={style.inputButton}>
                            <span>Tên đăng nhập</span>
                            <input 
                                type="text" 
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className={style.inputButton}>
                            <span>Mật khẩu</span>
                            <input 
                                type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleLogin()}
                            />
                        </div>
                        <div className={style.status} ref={statusRef}></div>
                        <div className={style.loginButton}>
                            <span onClick={handleLogin}>Đăng nhập</span>
                            <span>Quên mật khẩu</span>
                        </div>
                    </div>
                    <div className={style.register}>
                        <span>Khách hàng mới</span>
                        <div className={style.registerButton}>
                            <Link className="link" to="/register">Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
