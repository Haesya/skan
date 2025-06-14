import style from './slider.module.css'
import arrowLeft from '/aleft.svg'
import arrowRight from '/aright.svg'
import time from '/time.png'
import search from '/search.png'
import shield from '/shield.png'
import {useState} from "react";

const RenderSlider = () => {
    const [activeSlides, setActiveSlides] = useState(0)
    const cardsArray = [
        {
            image: time,
            text: 'Высокая и оперативная скорость обработки заявки'
        },
        {
            image: search,
            text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
        },
        {
            image: shield,
            text: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству'
        },
        {
            image: time,
            text: 'Текстовый текст'
        },
        {
            image: search,
            text: 'Буквенные буквы'
        },
        {
            image: shield,
            text: 'Словесные слова'
        }
    ]

    const getCardIndex = (index: number) => {
        return (activeSlides + index) % cardsArray.length;
    }

    const goLeft = () => {
        setActiveSlides((prev) => (prev-1 + cardsArray.length) % cardsArray.length)
    }

    const goRight = () => {
        setActiveSlides((prev) => (prev+1) % cardsArray.length)
    }

    const cardsToShow = () => {
        if (window.innerWidth < 414) {
            return 1
        } else {
            return 3
        }
    }

    return (
        <div className={style.block__for__slider}>
            <button onClick={goLeft}><img src={arrowLeft} alt={'arrowLeft'}/></button>
            <div className={style.slider}>
                {
                    [...Array(cardsToShow())].map((_, index) =>
                        (
                            <div key={index} className={style.slider__block}>
                                <img src={cardsArray[getCardIndex(index)].image} alt={`${index}`} width={64} height={64}/>
                                <p>{cardsArray[getCardIndex(index)].text}</p>
                            </div>
                        )
                    )
                }
            </div>
            <button onClick={goRight}><img src={arrowRight} alt={'arrowRight'}/></button>
        </div>
    )
}

export {RenderSlider}