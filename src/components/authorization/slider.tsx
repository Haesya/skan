import style from './slider.module.css'
import arrowLeft from '../../../public/aleft.svg'
import arrowRight from '../../../public/aright.svg'

const RenderSlider = () => {
    return (
        <div className={style.block__for__slider}>
            <button><img src={arrowLeft} alt={'arrowLeft'}/></button>
            <div className={style.slider}>
                <div>Первый блок</div>
                <div>Второй блок</div>
                <div>Третий блок</div>
                <div>Четвертый блок</div>
                <div>Пятый блок</div>
            </div>
            <button><img src={arrowRight} alt={'arrowRight'}/></button>
        </div>
    )
}

export {RenderSlider}