import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { userSelector, urlSelector, shortUrlSelector } from '../../features/selector'
import Header from '../../components/header/Header';
import style from './home.module.scss';
import linkSlice from '../../features/links/linkSlice'

const Home = () => {
    const user = useSelector(userSelector)

    const link = useSelector(urlSelector)
    const shortLink = useSelector(shortUrlSelector)

    const dispatch = useDispatch()

    const [url, setUrl] = useState('')
    const [tailUrl, setTailUrl] = useState('')
    const [status, setStatus] = useState()

    const shortURL = useRef()
    const URL = useRef()
    const buttonShortURL = useRef()
    const buttonURL = useRef()
    const statusRef = useRef()

    const handleClickCopyShortUrl = (e) => {
        e.preventDefault()
        const copyText = shortURL.current
        copyText.select()
        document.execCommand('copy')
        buttonShortURL.current.style.display = 'flex'
        setTimeout(() => buttonShortURL.current.style.display = 'none', 500)

    }

    const handleClickCopyUrl = (e) => {
        e.preventDefault()
        const copyText = URL.current
        copyText.select()
        document.execCommand('copy')
        buttonURL.current.style.display = 'flex'
        setTimeout(() => buttonURL.current.style.display = 'none', 500)
    }

    const handleShort = () => {
        const fetchShort = async () => {
            if (user) {
                console.log(user._id);
                // const res = await axios.post("https://shortlink123.herokuapp.com/short", {
                //     url: url,
                //     tailUrl: tailUrl,
                //     userId: user._id
                // })
                  const res = await axios.post("http://shortlink123.herokuapp.com/short", {
                    url: url,
                    tailUrl: tailUrl,
                    userId: user._id
                })
                console.log("res.data",res.data);
                dispatch(linkSlice.actions.short(res.data))
                localStorage.setItem('url', JSON.stringify(res.data.url))
                localStorage.setItem('shortUrl', JSON.stringify(res.data.shortUrl))
                setStatus(res.status)
            }
            else {
                const res = await axios.post("https://shortlink123.herokuapp.com/short", {
                    url: url,
                    tailUrl: tailUrl,
                })
                dispatch(linkSlice.actions.short(res.data))
                localStorage.setItem('url', JSON.stringify(res.data.url))
                localStorage.setItem('shortUrl', JSON.stringify(res.data.url))
                setStatus(res.status)
            }
        }
        fetchShort()
    }

    useEffect(() => {
        setUrl('')
        setTailUrl('')
        if (status === 201) {
            statusRef.current.innerHTML = 'Phần thay thế đã bị sử dụng'
            statusRef.current.style.color = 'red'
        }
        else if (status === 200) {
            statusRef.current.innerHTML = 'Rút gọn thành công'
            statusRef.current.style.color = '#28a745'
        }
        else if (status === 202) {
            statusRef.current.innerHTML = 'Vui lòng điền đủ link'
            statusRef.current.style.color = 'red'
        }
    }, [status])

    return (
        <>
            <Header />
            <div className={style.home}>
                <div className={style.oldLink}>
                    <input
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        type="text"
                        placeholder="Link cần rút gọn"
                    />
                </div>
                <div className={style.tailLink}>
                    <input
                        value={tailUrl}
                        onChange={e => setTailUrl(e.target.value)}
                        type="text"
                        placeholder="Phần thay thế"
                    />
                    <div 
                        onClick={handleShort}
                        className={style.short}
                    >
                        Short
                    </div>
                </div>
                <div className={style.shorted}>
                    <span
                        ref={statusRef}
                        className={style.status}
                    >
                        Nhập link cần rút gọn
                    </span>
                    <div className={style.shortURL}>
                        <span>Short URL</span>
                        <div className={style.copy}>
                            <input
                                ref={shortURL}
                                type="text"
                                readOnly="readonly"
                                value={shortLink}
                            />
                            <button
                                onClick={handleClickCopyShortUrl}
                            >
                                Copy
                            </button>
                            <div
                                ref={buttonShortURL}
                                className={style.copied}
                            >
                                copied
                            </div>
                        </div>
                    </div>
                    <div className={style.shortURL}>
                        <span>URL</span>
                        <div className={style.copy}>
                            <input
                                ref={URL}
                                type="text"
                                readOnly="readonly" 
                                value={link}
                            />
                            <button
                                onClick={handleClickCopyUrl}
                            >
                                Copy
                            </button>
                            <div
                                ref={buttonURL}
                                className={style.copied}
                            >
                                copied
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
