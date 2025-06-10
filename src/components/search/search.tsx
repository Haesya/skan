import style from './search.module.css'
import {RenderHeader} from "../header/header.tsx";
import {RenderFooter} from "../footer/footer.tsx";

const RenderSearch = () => {
    return (
        <>
            <RenderHeader/>
            <div className={style.search__page}>
                <div>
                    <span>НАЙДИТЕ НЕОБХОДИМЫЕ ДАННЫЕ В ПАРУ КЛИКОВ</span>
                    <span>Задайте параметры поиска.</span>
                    <span>Чем больше заполните, тем точнее поиск</span>
                    <div className={style.search__block}></div>
                </div>
                <div>Сюда картинки</div>
            </div>
            <RenderFooter/>
        </>
    )
}

export {RenderSearch}