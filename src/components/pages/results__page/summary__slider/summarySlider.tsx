import style from './summarySlider.module.css'
import arrowLeft from '/aleft.svg'
import arrowRight from '/aright.svg'
import {useState} from "react";

interface SliderData {
    data: {
        data: {
            date: string;
            value: number;
        }[];
        histogramType: string;
    }[];
}
interface SliderProps {
    sliderData: SliderData;
}

const RenderSummarySlider = ({sliderData}: SliderProps) => {
    const [firstIndex, setFirstIndex] = useState(0)
    const totalDocumentsData = sliderData.data.find(item => item.histogramType === 'totalDocuments')?.data || [];

    const riskFactorsData = sliderData.data.find(
        item => item.histogramType === 'riskFactors')?.data || [];

    const CardsToShow = 8;
    const visibleDocumentsData = totalDocumentsData.slice(firstIndex, firstIndex + CardsToShow)
    console.log(visibleDocumentsData, 'visible')

    const goLeft = () => {
        setFirstIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }

    const goRight = () => {
        if (firstIndex + CardsToShow < totalDocumentsData.length) {
            setFirstIndex(prevIndex => prevIndex + 1);
        }
    }

    return (
        <>
            <div className={style.summary__slider}>
                <button onClick={goLeft}><img src={arrowLeft} alt={'arrowLeft'}/></button>
                <div className={style.slider}>
                    <div className={style.slider__header}>
                        <div>Период</div>
                        <div>Всего</div>
                        <div>Риски</div>
                    </div>
                    <div className={style.slider__line}>
                        {
                            visibleDocumentsData.map((item, index) => (
                                <>
                                    <div className={style.slider__block}>
                                        <div>{new Date(item.date).toLocaleDateString()}</div>
                                        <div>{item.value.toLocaleString()}</div>
                                        <div>{riskFactorsData.toLocaleString() ? riskFactorsData[index].value.toLocaleString() : 0}</div>
                                    </div>
                                    <div className={style.slider__stick}></div>
                                </>
                            ))
                        }
                    </div>
                </div>
                <button onClick={goRight}><img src={arrowRight} alt={'arrowRight'}/></button>
            </div>
        </>
    )
}

export {RenderSummarySlider}