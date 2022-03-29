import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import style from './changePassword.module.scss'
import Header from '../../components/header/Header'
import { tokenSelector } from '../../features/selector'
import userSlice from '../../features/users/userSlice'

export default function ChangePassword() {
    const token = useSelector(tokenSelector)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [status, setStatus] = useState()
    const statusRef = useRef()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const handleChangePassword = async () => {
        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            rePassword: rePassword
        }
        
        const res = await axios.put('https://shortlinkdm.herokuapp.com/api/auth/password', data, {
            headers: {
                token: token
            }
        })

        if(res.data.success) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('cart')
            dispatch(userSlice.actions.logout())
            navigate('/login')
        }

        setStatus(res.data.enumError)
    }

    useEffect(() => {
        if(status === 1) {
            statusRef.current.innerHTML = 'Mật khẩu không chính xác'
        }
        else if(status === 2) {
            statusRef.current.innerHTML = 'Mật khẩu không trùng khớp'
        }
        else if(status === 3) {
            statusRef.current.innerHTML = 'Mật khẩu tối thiểu 6 kí tự'
        }
        else if(status === 4) {
            statusRef.current.innerHTML = 'Vui lòng điền đầy đủ thông tin'
        }

        return () => {}
    }, [status])

    return (
        <>
            <Header />
            <div className={style.changePassword}>
                <div className={style.title}>ĐỔI MẬT KHẨU</div>
                <div className={style.wrapper}>
                    <div className={style.infoLogin}>
                        <div className={style.inputButton}>
                            <span>Mật khẩu hiện tại</span>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className={style.inputButton}>
                            <span>Mật khẩu mới</span>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className={style.inputButton}>
                            <span>Nhập lại mật khẩu</span>
                            <input
                                type="password"
                                value={rePassword}
                                onChange={e => setRePassword(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleChangePassword()}
                            />
                        </div>
                        <div className={style.status} ref={statusRef}></div>
                    </div>
                    <div
                        className={style.changePasswordButton}
                        onClick={handleChangePassword}
                    >
                        Đổi mật khẩu
                    </div>
                </div>
            </div>
        </>
    )
}
