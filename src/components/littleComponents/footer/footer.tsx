import style from './footer.module.css'
import skanwhite from '/public/skanwhite.png'

const RenderFooter = () => {


    return (
        <footer>
            <div className={style.footer__content}>
                <div className={style.logo}><img src={skanwhite} alt={'skanwhite'}/></div>
                <div className={style.info}>
                    <div className={style.contacts}>
                        <span>г. Москва, Цветной б-р, 40</span>
                        <span>+7 495 771 21 11</span>
                        <span>info@skan.ru</span>
                    </div>
                    <span>Copyright, 2022</span>
                </div>
            </div>
        </footer>
    )
}

export {RenderFooter}