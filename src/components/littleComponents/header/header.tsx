import style from './header.module.css'
import skan from '/public/skan.png'
import burgerMenu from '/public/burger.svg'
import avatar from '/public/avatar.svg'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {logout} from "../../../store/Slices/authReducer.ts";
import {getAccountInfo} from '../../../store/fetches/login.tsx'
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {RenderLoader} from "../loader/loader.tsx";


const RenderHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const isLoggedIn = !!authState.accessToken;
    const navigate = useNavigate()
    const accountInfo = authState.accountInfo;
    const loadingAccountInfo = authState.loadingAccountInfo;
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (isLoggedIn && authState.accessToken) dispatch(getAccountInfo(authState.accessToken))
    }, [isLoggedIn, authState.accessToken, dispatch])

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expire')
        navigate('/')
    }

    return (
        <header>
            <div className={style.header__content}>
                <div className={style.logo}><img src={skan} alt={'logoskan'}/></div>
                <div className={style.sections}>
                    <ul>
                        <li><Link to={'/'}>Главная</Link></li>
                        <li><Link to={'/'}>Тарифы</Link></li>
                        <li><Link to={'/'}>FAQ</Link></li>
                    </ul>
                </div>
                {isLoggedIn ? (
                        <>
                            {loadingAccountInfo ? (
                                <RenderLoader />
                                )
                                    : (
                                <div className={style.companies}>
                                    <div>
                                        <span>Использовано компаний:</span>
                                        <span className={style.using}>{accountInfo?.eventFiltersInfo.usedCompanyCount || 0}</span>
                                    </div>
                                    <div>
                                        <span>Лимит по компаниям:</span>
                                        <span className={style.limit}>{accountInfo?.eventFiltersInfo.companyLimit || 0}</span>
                                    </div>
                                </div>
                                )
                            }
                            <div className={style.user}>
                                <div>
                                    <div>Муханова А.</div>
                                    <button onClick={handleLogout}>Выйти</button>
                                </div>
                                <div className={style.avatar}><img src={avatar} alt={'avatar'}/></div>
                            </div>
                        </>
                    )
                    : (
                        <div className={style.authorization}>
                            <div className={style.register}>Зарегистрироваться</div>
                            <div className={style.stick}></div>
                            <button className={style.login}><Link to={'/authorization'}>Войти</Link></button>
                        </div>
                    )
                }
                <button
                    className={style.burger__menu}
                    onClick={()=> setVisible(!visible)}
                >
                    <img src={burgerMenu} alt={'burgerMenu'}/>
                </button>
            </div>
        </header>
    )
}

export {RenderHeader}