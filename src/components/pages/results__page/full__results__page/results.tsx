import style from './results.module.css'
import {RenderHeader} from "../../../littleComponents/header/header.tsx";
import {RenderFooter} from "../../../littleComponents/footer/footer.tsx";
import tryToFind from '/tryToFind.png'
import {RenderOnePublication} from "../one__publication/onePublication.tsx";

const RenderResults = () => {
    return (
        <>
            <RenderHeader/>
            <div className={style.results__page}>
                <div className={style.try__to__find}>
                    <div className={style.spans}>
                        <span className={style.big__text}>ИЩЕМ, СКОРО БУДУТ РЕЗУЛЬТАТЫ</span>
                        <span>Поиск может занять некоторое время, <p>просим сохранять терпение.</p></span>
                    </div>
                    <div><img src={tryToFind} alt={'tryToFind'}/></div>
                </div>
                <div className={style.summary}>
                    <span className={style.big__text}>Общая сводка</span>
                    <span>Найдено вариантов</span>
                    <div className={style.carousel}>Тут какая-то хрень с периодами и чета там</div>
                </div>
                <span className={style.big__text}>СПИСОК ДОКУМЕНТОВ</span>
                <div className={style.list__of__documents}>
                    <div className={style.articles}>
                        <RenderOnePublication />
                        <RenderOnePublication />
                    </div>
                    <button className={style.load__more}>Показать больше</button>
                </div>
            </div>
            <RenderFooter/>
        </>
    )
}

export {RenderResults}