import style from './header.module.css'
import skan from '../../../public/skan.png'
import burgerMenu from '../../../public/burger.svg'

const RenderHeader = () => {

    return (
        <header>
            <div className={style.header__content}>
                <div className={style.logo}><img src={skan} alt={'logoskan'}/></div>
                <div className={style.sections}>
                    <ul>
                        <li>Главная</li>
                        <li>Тарифы</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div className={style.companies}>
                    <div>
                        <span>Использовано компаний:</span>
                        <span className={style.using}>34</span>
                    </div>
                    <div>
                        <span>Лимит по компаниям:</span>
                        <span className={style.limit}>100</span>
                    </div>
                </div>
                <div className={style.burger__menu}>
                    <img src={burgerMenu} alt={'burgerMenu'}/>
                </div>
                <div className={style.authorization}>
                    <div className={style.register}>Зарегистрироваться</div>
                    <div className={style.stick}></div>
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