import style from './main__page.module.css'
import {RenderHeader} from "../../../littleComponents/header/header.tsx";
import {RenderFooter} from "../../../littleComponents/footer/footer.tsx";
import service from '/service.jpg'
import bigPicture from '/bigpicture.png'
import {RenderOneCard} from "../oneCard/oneCard.tsx";
import {RenderSlider} from "../slider/slider.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../store/store.ts";
import {Link} from "react-router-dom";

const RenderMainPage = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const isLoggedIn = !!authState.accessToken;
    const currentTariff = useSelector((state: RootState) => state.auth.currentTariff);

    const tariffs = [
        {
            nameTariff: "Beginner",
            colorClass: "Beginner",
            forWhat: "Для небольшого исследования",
            price: "799",
            oldPrice: "1200",
            installment: "или 150 р/месяц при рассрочке на 24 мес.",
            whatInside: ["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"],
            isCurrent: false
        },
        {
            nameTariff: "Pro",
            colorClass: "Pro",
            forWhat: "Для HR и фрилансеров",
            price: "1299",
            oldPrice: "2600",
            installment: "или 279 р/месяц при рассрочке на 24 мес.",
            whatInside: ["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"],
            isCurrent: false
        },
        {
            nameTariff: "Business",
            colorClass: "Business",
            forWhat: "Для корпоративных клиентов",
            price: "2379",
            oldPrice: "3700",
            whatInside: ["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"],
            isCurrent: false
        },
    ]
    if (currentTariff != null) {
        for (let i in tariffs) {
            if (tariffs[i].nameTariff === currentTariff)
                tariffs[i].isCurrent = true
        }
    }


    return (
        <>
            <RenderHeader/>
            <main className={style.main__page__main}>
                <div className={style.service}>
                    <div className={style.text}>
                        <span className={style.service__text}>СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕГО ИНН</span>
                        <span>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</span>
                        {
                            isLoggedIn ? (
                                <button className={style.take__data}><Link to={'/search'}>Запросить данные</Link>
                                </button>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                    <div className={style.picture}>
                        <img src={service} alt={'service'}/>
                    </div>
                </div>
                <div className={style.slider__reasons}>
                    <span>ПОЧЕМУ ИМЕННО МЫ</span>
                    <RenderSlider/>
                    <div className={style.just__picture}>
                        <img src={bigPicture} alt={'bigPicture'}/>
                    </div>
                </div>
                <div className={style.our__tariffs}>
                    <span className={style.our__tariffs__text}>НАШИ ТАРИФЫ</span>
                    <div className={style.tariffs}>
                        {tariffs.map((elem) => (
                            <RenderOneCard
                                nameTariff={elem.nameTariff}
                                colorClass={elem.colorClass}
                                forWhat={elem.forWhat}
                                price={elem.price}
                                oldPrice={elem.oldPrice}
                                installment={elem.installment}
                                whatInside={elem.whatInside}
                                isCurrent={elem.isCurrent}
                            />
                        ))
                        }
                    </div>
                </div>
            </main>
            <RenderFooter/>
        </>
    )
}

export {RenderMainPage}