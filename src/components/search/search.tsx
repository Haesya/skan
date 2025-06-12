import style from './search.module.css'
import {RenderHeader} from "../header/header.tsx";
import {RenderFooter} from "../footer/footer.tsx";
import forSearch from '../../../public/forSearch.png'

const RenderSearch = () => {
    return (
        <>
            <RenderHeader/>
            <div className={style.search__page}>
                <div className={style.about__search}>
                    <span className={style.big__text}>НАЙДИТЕ НЕОБХОДИМЫЕ ДАННЫЕ В ПАРУ КЛИКОВ</span>
                    <span>Задайте параметры поиска. <p>Чем больше заполните, тем точнее поиск</p></span>
                    <div className={style.search__block}>
                        <div className={style.main__properties}>
                            <label>ИНН компании *</label>
                            <input className={style.text__inside}></input>
                            <label>Тональность</label>
                            <input className={style.text__inside}></input>
                            <label>Количество документов в выдаче *</label>
                            <input className={style.text__inside}></input>
                            <label>Диапазон поиска *</label>
                            <div className={style.range}>
                                <input></input>
                                <input></input>
                            </div>
                        </div>
                        <div className={style.additional__properties}>
                            <div className={style.checkbox__block}>
                                <label>
                                    <input type={'checkbox'}></input>
                                    <span>Признак максимальной полноты</span>
                                </label>
                                <label>
                                    <input type={'checkbox'}></input>
                                    <span>Упоминания в бизнес-контексте</span>
                                </label>
                                <label>
                                    <input type={'checkbox'}></input>
                                    <span>Главная роль в публикации</span>
                                </label>
                                <label>
                                    <input type={'checkbox'}></input>
                                    <span>Публикации только с риск-факторами</span>
                                </label>
                                <label>
                                    <input type={'checkbox'}></input>
                                    <span>Включать технические новости рынков</span>
                                </label>
                                <label>
                                    <input type={'checkbox'}></input>
                                    <span>Включать анонсы и календари</span>
                                </label>
                                <label>
                                    <input type={'checkbox'}></input>
                                    <span>Включать сводки новостей</span>
                                </label>
                            </div>
                            <div className={style.check__search}>
                                <button>Поиск</button>
                                <label>* Обязательные к заполнению поля</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.picture__forSearch}><img src={forSearch} alt={'forSearch'}/></div>
            </div>
            <RenderFooter/>
        </>
    )
}

export {RenderSearch}