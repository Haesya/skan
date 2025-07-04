import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@reduxjs/toolkit/query";

import style from './results.module.css'
import {RenderHeader} from "../../../littleComponents/header/header.tsx";
import {RenderFooter} from "../../../littleComponents/footer/footer.tsx";
import {RenderOnePublication} from "../one__publication/onePublication.tsx";
import {RenderSummarySlider} from "../summary__slider/summarySlider.tsx";
import type {AppDispatch} from '../../../../store/store.ts'
import {PostDocuments} from '../../../../store/fetches/document.tsx'

import {setInitialShownDocs, showDocs} from "../../../../store/Slices/documentsReducer";
import tryToFind from '/tryToFind.png'

const RenderResults = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const sliderData = useSelector((state: RootState) => state.histograms.data);
    const documents = useSelector((state: RootState) => state.docs.data);
    const shownDocs = useSelector((state: RootState) => state.docs.shownDocs);
    const encodedIds = useSelector((state: RootState) => state.objectsearch.dataObjectsearch);

    const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);
    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        dispatch(setInitialShownDocs(10));
    }, [dispatch]);

    const allDocsDisplayed = shownDocs >= documents.length;

    useEffect(() => {
        if (encodedIds.length > 0) {
            dispatch(PostDocuments({ listEncodedId: encodedIds }));
        }
    }, [encodedIds, dispatch]);

    const LoadMore = () => {
        dispatch(showDocs(10));
    };

    return (
        <>
            <RenderHeader/>
            <div className={style.results__page}>
                <div className={style.try__to__find}>
                    <div className={style.spans}>
                        <span className={style.big__text}>ИЩЕМ, СКОРО БУДУТ РЕЗУЛЬТАТЫ</span>
                        <span>Поиск может занять некоторое время, <p>просим сохранять терпение.</p></span>
                    </div>
                    <div><img src={tryToFind} alt={'tryToFind'}/></div>
                </div>
                <div className={style.summary}>
                    <span className={style.big__text}>Общая сводка</span>
                    <span>Найдено вариантов</span>
                    <RenderSummarySlider sliderData={sliderData}/>
                </div>
                <span className={style.big__text}>СПИСОК ДОКУМЕНТОВ</span>
                <div className={style.list__of__documents}>
                    <div className={style.articles}>
                        <RenderOnePublication
                            documents={documents}
                            shownDocs={shownDocs}
                        />
                    </div>
                    {!allDocsDisplayed && <button
                        className={style.load__more}
                        onClick={LoadMore}
                    >Показать больше</button>}
                </div>
            </div>
            <RenderFooter/>
        </>
    )
}

export {RenderResults}