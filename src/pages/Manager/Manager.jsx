import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { tokenSelector } from '../../features/selector'
import Header from '../../components/header/Header';
import style from './manager.module.scss'

const Manager = () => {

    const token = useSelector(tokenSelector)

    const [links, setLinks] = useState()

    const dispatch = useDispatch()

    const [reload, setReload] = useState()

    const handleDelete = async (id) => {
        await axios.delete(`https://shortlink123.herokuapp.com/${id}`, {
            headers: {
                token: token
              }
           })
        setReload(id)
    }

    useEffect(() => {
        const fetchList = async () => {
            const res = await axios.get('https://shortlink123.herokuapp.com/list', {
                headers: {
                    token: token
                }
            })
            setLinks(res.data)
        }
        fetchList()
    }, [dispatch, reload, token])

    return (
        <>
            <Header />
            <div className={style.manager}>
                <div className={style.title}>Danh sách link rút gọn</div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sort Link</th>
                        <th scope="col">Link</th>
                        <th scope="col">Click</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {links && links.map((list, index) => {
                            return (
                                <tr id={list._id} key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td><a href={`https://shortlink123.herokuapp.com/${list.shortLink}`}>{`https://shortlink123.herokuapp.com/${list.shortLink}`}</a></td>
                                    <td>{list.oldLink}</td>
                                    <td>{list.click}</td>
                                    <td className={style.del} onClick={() => handleDelete(list._id)} >Delete</td>
                                </tr>
                            )
                                
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Manager;
