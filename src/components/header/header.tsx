import style from './header.module.css'
import skan from '../../../public/skan.png'

const RenderHeader = () => {

    return (
        <header>
            <div className={style.header__content}>
                <div className={style.logo}><img src={skan} alt={'logoskan'}/></div>
                <div>
                    <ul>
                        <li>Главная</li>
                        <li>Тарифы</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div className={style.using__companies}>
                    <div>Использовано компаний:</div>
                    <div>Лимит по компаниям:</div>
                </div>
                <div className={style.authorization}>
                    <div>Зарегистрироваться</div>
                    <div className={style.stick}>Палка</div>
                    <button className={style.login}>Войти</button>
                </div>
                <div className={style.user}>
                    <div>
                        <div>Имя юзера</div>
                        <div>Выйти</div>
                    </div>
                    <div>Аватар</div>
                </div>
            </div>
        </header>
    )
}

export {RenderHeader}