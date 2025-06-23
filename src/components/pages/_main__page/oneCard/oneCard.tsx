import style from './oneCard.module.css'
import checkmark from '/public/checkmark.svg'
import {useSelector} from "react-redux";
import type {RootState} from "../../../../store/store.ts";
import {Link} from "react-router-dom";
import clsx from "clsx";

const RenderOneCard = ({nameTariff, colorClass, forWhat, price, oldPrice, installment, whatInside, isCurrent}) => {
    const authState = useSelector((state: RootState) => state.auth);
    const isLoggedIn = !!authState.accessToken;

    const cardStyle = clsx({
        [style.beginner]: (colorClass === 'Beginner'),
        [style.pro]: (colorClass === 'Pro'),
        [style.business]: (colorClass === 'Business')
    })

    return (
        <div className={style.one__card}>
            <div className={cardStyle}>
                <span><h2>{nameTariff}</h2></span>
                <span>{forWhat}</span>
            </div>
            <div className={style.properties}>
                <div className={style.prices}>
                    {isCurrent ? (
                        <div className={style.current__tariff}>Текущий тариф</div>
                    ) : (
                        <></>
                    )
                    }
                    <span><h1>{price}</h1></span>
                    <span><del>{oldPrice}</del></span>
                </div>
                <div className={style.info__about}>
                    <span className={style.installment}>{installment}</span>
                    <span>В тариф входит:</span>
                    <ul>
                        {whatInside.map((elem, index) => (
                            <li key={index}><img src={checkmark} alt={'checkmark'}/>{elem}</li>
                        ))}
                    </ul>
                    {
                        isLoggedIn ? (
                            isCurrent ? (
                                <button className={style.current}> Текущий тариф </button>
                            ) : (
                                <button className={style.not__current}> Подробнее </button>
                            )
                        ) : (
                            <button className={style.not__current}><Link to={'/authorization'}>Подробнее</Link></button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export {RenderOneCard}