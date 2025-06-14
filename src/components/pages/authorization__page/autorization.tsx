import style from './authorization.module.css';
import Characters from '../../../../public/Characters.png'
import google from '../../../../public/Google.png'
import facebook from '../../../../public/facebook.png'
import yandex from '../../../../public/yandex.png'
import {RenderHeader} from "../../littleComponents/header/header.tsx";
import {RenderFooter} from "../../littleComponents/footer/footer.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from '../../../store/store.ts';
import {useEffect, useState} from "react";
import {loginUser} from "../../../store/auth.tsx";
import {useNavigate} from "react-router";


const RenderAuthorization = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const authState = useSelector((state: RootState) => state.auth); // Получаем состояние auth из хранилища Redux

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authState.error) {
            setErrors({username: 'Введите корректные данные', password: 'Неправильный пароль'})
        }
    }, [authState.error]);

    useEffect(() => {
        const isUsernameValid = username.trim().length > 0;
        const isPasswordValid = password.trim().length > 0;
        setIsButtonDisabled(!isUsernameValid || !isPasswordValid);
    }, [username, password]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});
        setLoading(true);

        const loginData = {
            login: username,
            password: password
        };

        try {
            const result = await dispatch(loginUser(loginData));

            if (loginUser.fulfilled.match(result)) {
                localStorage.setItem('accessToken', result.payload.accessToken);
                localStorage.setItem('expire', result.payload.expire);
                navigate("/");
            }
        } catch (e) {
            setErrors({username: 'Введите корректные данные', password: 'Неправильный пароль'});
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <RenderHeader/>
            <main className={style.authorization__main}>
                <div className={style.picture}>
                    <span className={style.big__text}>ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ НА ТАРИФ НЕОБХОДИМО АВТОРИЗОВАТЬСЯ</span>
                    <img src={Characters} alt={'Characters'}/>
                </div>
                <div className={style.login}>
                    <form className={style.login__content} onSubmit={handleSubmit}>
                        <div className={style.buttons}>
                            <div>
                                <div className={style.choose}>Войти</div>
                                <div className={style.stick}></div>
                            </div>
                            <div>
                                <div className={style.choose}>Зарегистрироваться</div>
                                <div className={style.stick}></div>
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <label htmlFor="username">Логин или номер телефона:</label>
                            <input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className={style.check__login} type="submit">Войти</button>
                        <div className={style.recover}>Восстановить пароль</div>
                        <div className={style.additional__input}>
                            <label>Войти через:</label>
                            <div className={style.methods}>
                                <button><img src={google} alt={'google'}/></button>
                                <button><img src={facebook} alt={'facebook'}/></button>
                                <button><img src={yandex} alt={'yandex'}/></button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <RenderFooter/>
        </>
    )
}

export {RenderAuthorization}