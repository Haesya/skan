import style from './authorization.module.css';
import Characters from '../../../public/Characters.png'
import google from '../../../public/Google.png'
import facebook from '../../../public/facebook.png'
import yandex from '../../../public/yandex.png'
import {RenderHeader} from "../header/header.tsx";
import {RenderFooter} from "../footer/footer.tsx";

const RenderAuthorization = () => {
    return (
        <>
            <RenderHeader/>
            <main className={style.authorization__main}>
                <div className={style.picture}>
                    <span className={style.big__text}>ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ НА ТАРИФ НЕОБХОДИМО АВТОРИЗОВАТЬСЯ</span>
                    <img src={Characters} alt={'Characters'}/>
                </div>
                <div className={style.login}>
                    <div className={style.login__content}>
                        <div className={style.buttons}>
                            <div>
                                <button className={style.choose}>Войти</button>
                                <div className={style.stick}></div>
                            </div>
                            <div>
                                <button className={style.choose}>Зарегистрироваться</button>
                                <div className={style.stick}></div>
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <label>Логин или номер телефона:</label>
                            <input></input>
                            <label>Пароль:</label>
                            <input></input>
                        </div>
                        <button className={style.check__login}>Войти</button>
                        <button className={style.recover}>Восстановить пароль</button>
                        <div className={style.additional__input}>
                            <label>Войти через:</label>
                            <div className={style.methods}>
                                <button><img src={google} alt={'google'}/></button>
                                <button><img src={facebook} alt={'facebook'}/></button>
                                <button><img src={yandex} alt={'yandex'}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <RenderFooter/>
        </>
    )
}

export {RenderAuthorization}