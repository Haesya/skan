import style from './loader.module.css'
import spinner from '/public/spinner.png'

const RenderLoader = () => {

    return (
        <div className={style.loader}>
            <img src={spinner} alt={'spinner'}/>
        </div>
    )
}

export {RenderLoader}