import style from './oneCard.module.css'
import checkmark from '../../../../public/checkmark.svg'

const RenderOneCard = ({nameTariff, colorClass, forWhat, price, oldPrice, installment, whatInside}) => {
    let colorOfTariff = "";
    switch (colorClass) {
        case 'beginner__color':
            colorOfTariff = style.beginner__color
            break;
        case 'pro__color':
            colorOfTariff = style.pro__color
            break;
        case 'business__color':
            colorOfTariff = style.business__color
            break;
        default:
            break;
    }

    return (
        <div className={colorOfTariff}>
            <div className={style.block}></div>
            <div className={style.main__info}>
                <div className={style.info}>
                    <span><h2>{nameTariff}</h2></span>
                    <span>{forWhat}</span>
                </div>
                <div className={style.prices}>
                    <span><h1>{price}</h1></span>
                    <span><del>{oldPrice}</del></span>
                </div>
                <span className={style.installment}>{installment}</span>
                <span>В тариф входит:</span>
                <ul>
                    {whatInside.map((elem, index) => (
                        <li key={index}><img src={checkmark} alt={'checkmark'}/>{elem}</li>
                    ))}
                </ul>
                <button className={style.more}>Подробнее</button>
            </div>
        </div>
    )
}

export {RenderOneCard}