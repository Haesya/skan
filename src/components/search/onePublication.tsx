import style from './onePublication.module.css'

const RenderOnePublication = () => {
    return (
        <div className={style.one__publication}>
            <div className={style.little__text}>
                <span>Дата</span>
                <span>Сайт, с которого статью взяли</span>
            </div>
            <span className={style.article__name}>Название статьи</span>
            <div className={style.article__category}>Технические новости</div>
            <div className={style.article__picture}>Картинка статьи</div>
            <span>Кусок статьи</span>
            <div className={style.footer__publication}>
                <button>Читать в источнике</button>
                <span>Сколько слов в статье</span>
            </div>
        </div>
    )
}

export {RenderOnePublication}