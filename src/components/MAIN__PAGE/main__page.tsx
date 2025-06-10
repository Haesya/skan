import style from './main__page.module.css'
import {RenderHeader} from "../header/header.tsx";
import {RenderFooter} from "../footer/footer.tsx";
import service from '../../../public/service.jpg'
import bigPicture from '../../../public/bigpicture.png'
import {RenderOneCard} from "../authorization/oneCard.tsx";
import {RenderSlider} from "../authorization/slider.tsx";

const RenderMainPage = () => {
    return (
        <>
            <RenderHeader/>
            <main className={style.main__page__main}>
                <div className={style.service}>
                    <div className={style.text}>
                        <span className={style.service__text}>СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕГО ИНН</span>
                        <span>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</span>
                        <button className={style.take__data}>Запросить данные</button>
                    </div>
                    <div className={style.picture}>
                        <img src={service} alt={'service'}/>
                    </div>
                </div>
                <div className={style.slider__reasons}>
                    <span>ПОЧЕМУ ИМЕННО МЫ</span>
                    <RenderSlider />
                </div>
                <div className={style.just__picture}>
                    <img src={bigPicture} alt={'bigPicture'}/>
                </div>
                <div className={style.our__tariffs}>
                    <span className={style.our__tariffs__text}>НАШИ ТАРИФЫ</span>
                    <div className={style.tariffs}>
                        <RenderOneCard
                            nameTariff="Beginner"
                            colorClass="beginner__color"
                            forWhat="Для небольшого исследования"
                            price="799"
                            oldPrice="1200"
                            installment="или 150 р/месяц при рассрочке на 24 мес."
                            whatInside={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]}

                        />
                        <RenderOneCard
                            nameTariff="Pro"
                            colorClass="pro__color"
                            forWhat="Для HR и фрилансеров"
                            price="1299"
                            oldPrice="2600"
                            installment="или 279 р/месяц при рассрочке на 24 мес."
                            whatInside={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]}
                        />
                        <RenderOneCard
                            nameTariff="Business"
                            colorClass="business__color"
                            forWhat="Для корпоративных клиентов"
                            price="2379"
                            oldPrice="3700"
                            installment=""
                            whatInside={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]}
                        />
                    </div>
                </div>
            </main>
            <RenderFooter/>
        </>
    )
}

export {RenderMainPage}