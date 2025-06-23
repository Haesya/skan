import style from './header.module.css'
import skan from '/public/skan.png'
import burger from '/public/burger.svg'
import burgerwhite from '/public/burgerwhite.svg'
import avatar from '/public/avatar.svg'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {logout} from "../../../store/Slices/authReducer.ts";
import {getAccountInfo} from '../../../store/fetches/login.tsx'
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {RenderLoader} from "../loader/loader.tsx";
import skanwhite from "/public/skanwhite.png";


const RenderHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const isLoggedIn = !!authState.accessToken;
    const navigate = useNavigate()
    const accountInfo = authState.accountInfo;
    const loadingAccountInfo = authState.loadingAccountInfo;

    useEffect(() => {
        if (isLoggedIn && authState.accessToken) dispatch(getAccountInfo(authState.accessToken))
    }, [isLoggedIn, authState.accessToken, dispatch])

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expire')
        navigate('/')
    }

    const [burgerMenu, setBurgerMenu] = useState(false)

    const toggleBurgerMenu = () => {
        setBurgerMenu(!burgerMenu)
    }

    return (
        <header>
            <div className={`${style.header__content} ${burgerMenu ? style.active : ''}`}>
                <div className={style.logo}>
                    {burgerMenu ? (
                        <img src={skanwhite} alt={'skanwhite'}/>
                    ) : (
                        <img src={skan} alt={'skan'}/>
                    )}
                </div>
                <div className={`${style.header__info} ${burgerMenu ? style.active : ''}`}>
                    <div className={style.sections}>
                        <ul className={`${burgerMenu ? style.active : ''}`}>
                            <li><Link to='/'>Главная</Link></li>
                            <li><Link to='/'>Тарифы</Link></li>
                            <li><Link to='/'>О нас</Link></li>
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
                </div>
                <button
                    className={style.burger__menu}
                    onClick={toggleBurgerMenu}
                >
                    {burgerMenu ?
                        (
                        <img src={burgerwhite} alt={'burgerwhite'}/>
                        ) : (
                            <img src={burger} alt={'burgerMenu'}/>
                        )
                    }
                </button>
            </div>
        </header>
    )
}

export {RenderHeader}