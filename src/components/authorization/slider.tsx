import style from './slider.module.css'
import arrowLeft from '../../../public/aleft.svg'
import arrowRight from '../../../public/aright.svg'
import time from '../../../public/time.png'
import search from '../../../public/search.png'
import shield from '../../../public/shield.png'

const RenderSlider = () => {
    const goLeft = () => {

    }

    const goRight = () => {

    }

    return (
        <div className={style.block__for__slider}>
            <button onClick={goLeft}><img src={arrowLeft} alt={'arrowLeft'}/></button>
            <div className={style.slider}>
                <div className={style.slider__block}>
                    <div><img src={time} alt={'time'}/></div>
                    <span>Высокая и оперативная скорость обработки заявки</span>
                </div>
                <div className={style.slider__block}>
                    <div><img src={search} alt={'search'}/></div>
                    <span>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</span>
                </div>
                <div className={style.slider__block}>
                    <div><img src={shield} alt={'shield'}/></div>
                    <span>Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству</span>
                </div>
                <div className={style.slider__block}>
                    <div><img src={time} alt={'time'}/></div>
                    <span>Высокая и оперативная скорость обработки заявки</span>
                </div>
                <div className={style.slider__block}>
                    <div><img src={search} alt={'search'}/></div>
                    <span>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</span>
                </div>
                <div className={style.slider__block}>
                    <div><img src={shield} alt={'shield'}/></div>
                    <span>Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству</span>
                </div>
            </div>
            <button onClick={goRight}><img src={arrowRight} alt={'arrowRight'}/></button>
        </div>
    )
}

export {RenderSlider}