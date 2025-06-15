import style from './search.module.css'
import {RenderHeader} from "../../../littleComponents/header/header.tsx";
import {RenderFooter} from "../../../littleComponents/footer/footer.tsx";
import forSearch from '/forSearch.png'
import {type ChangeEvent, type MouseEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@reduxjs/toolkit/query";
import {useNavigate} from "react-router";
import type {AppDispatch} from "../../../../store/store.ts";
import {
    docslimitReducer, endDateReducer,
    innReducer, resetFormReducer,
    setCheckbox,
    startDateReducer,
    tonalityReducer
} from "../../../../store/Slices/histogramReducer.ts";
import * as React from "react";
import {PostObjectSearch} from "../../../../store/objectsearch.tsx";
import {PostHistograms} from "../../../../store/histogram.tsx";

const RenderSearch = () => {
    /*ошибковые переменные*/
    const [innError, setInnError] = useState('');
    const [limitError, setLimitError] = useState('');
    const [dateError, setDateError] = useState('');
    const [isSearchDisabled, setSearchDisabled] = useState(false);

    /*всякие нужные переменные*/
    const navigate = useNavigate()
    const checkboxes = [
        'Признак максимальной полноты',
        'Упоминания в бизнес-контексте',
        'Главная роль в публикации',
        'Публикации только с риск-факторами',
        'Включать технические новости рынков',
        'Включать анонсы и календари',
        'Включать сводки новостей']
    const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);
    const dispatch: AppDispatch = useDispatch();
    const endDate = useSelector((state: RootState) => state.histograms.histogramsParams.endDate);
    const startDate = useSelector((state: RootState) => state.histograms.histogramsParams.startDate);
    const SearchParams = useSelector((state: RootState) => state.histograms.histogramsParams);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate])

    /*проверяем инн на вменяемость*/
    /*не знала, что инн формируется так*/
    const checkINN = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(innReducer(e.target.value));
        let result = false;
        const INN = e.target.value;
        const numbersForCheckINN = [2, 4, 10, 3, 5, 9, 4, 6, 8]

        if (!INN) {
            setInnError('Обязательное поле')
        } else if (/[^0-9]/.test(INN)) {
            setInnError('ИНН не должен содержать букв')
        } else if (INN.length != 10) {
            setInnError('ИНН состоит из 10 цифр')
        } else {
            setInnError('')
        }

        let sumForCheck = 0;
        for (const i in numbersForCheckINN) {
            sumForCheck += Number(INN[i]) * numbersForCheckINN[i]
        }
        if (sumForCheck % 11 % 10 == Number(INN[9])) {
            result = true
        } else {
            setInnError('Неправильный ИНН: неверное контрольное число')
        }

        return result;
    }

    /*проверяем тональность, что бы это ни было*/
    const handleSelect = (e: React.MouseEvent<HTMLSelectElement>) => {
        const selectElement = e.target as HTMLSelectElement;
        dispatch(tonalityReducer(selectElement.value));
    }

    /*проверяем количество запросов*/
    const checkLimit = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(docslimitReducer(e.target.value));
        if (!e.target.value)
            setLimitError('Обязательное поле')
        else if (/[^0-9]/.test(e.target.value))
            setLimitError('Введите корректное число')
        else if (Number(e.target.value) < 1 || Number(e.target.value) > 1000)
            setLimitError('Количество документов может быть от 1 до 1000')
        else
            setLimitError('')
    }

    /*проверяем какие чекбоксы протыкали*/
    const checkCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.target.dataset.index || '0', 10);
        const checked = e.target.checked;
        dispatch(setCheckbox({index, checked}));
    }

    const checkDatas = (e: ChangeEvent<HTMLInputElement>, field: 'startDate' | 'endDate') => {
        const value = e.target.value;
        const isStartDate = field === 'startDate';
        let setStartDate, setEndDate;
        const newDate = new Date()

        if (isStartDate)
            setStartDate = new Date(value + 'T00:00:00')
        else
            setStartDate = new Date(startDate + 'T00:00:00')
        if (!isStartDate)
            setEndDate = new Date(value + 'T00:00:00')
        else
            setEndDate = new Date(endDate + 'T00:00:00')

        if (isStartDate)
            dispatch(startDateReducer(value))
        else
            dispatch(endDateReducer(value))

        if(newDate >= setStartDate && setEndDate >= setStartDate)
            setDateError('')
        else
            setDateError('Диапазон дат указан неверно')
    }

    const takeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
        checkDatas(e, "startDate")
    }

    const takeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
        checkDatas(e, "endDate")
    }

    /*вываливаемся на страницу результатов*/
    const takeResults = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validINN = checkINN({target: {value: SearchParams.innField} as HTMLInputElement} as ChangeEvent<HTMLInputElement>)
        const validLimit = !limitError
        const validDates = !dateError

        if (validINN && validLimit && validDates) {
            dispatch(PostObjectSearch(SearchParams))
            dispatch(PostHistograms(SearchParams));
            dispatch(resetFormReducer());
            navigate('/results')
        }
    }

    return (
        <>
            <RenderHeader/>
            <div className={style.search__page}>
                <div className={style.about__search}>
                    <span className={style.big__text}>НАЙДИТЕ НЕОБХОДИМЫЕ ДАННЫЕ В ПАРУ КЛИКОВ</span>
                    <span>Задайте параметры поиска. <p>Чем больше заполните, тем точнее поиск</p></span>
                    <form className={style.search__block} onSubmit={takeResults}>
                        <div className={style.main__properties}>
                            <label>ИНН компании *</label>
                            <input
                                className={style.text__inside}
                                placeholder="10 цифр"
                                maxLength={10}
                                onChange={checkINN}
                            />

                            <label className={style.tonality}>Тональность</label>
                            <select name='tonality' onClick={(e) => handleSelect(e)}>
                                <option value="any">Любая</option>
                                <option value="positive">Позитивная</option>
                                <option value="negative">Негативная</option>
                            </select>
                            <label>Количество документов в выдаче *</label>
                            <input
                                className={style.text__inside}
                                placeholder="от 1 до 1000"
                                onChange={checkLimit}
                            />
                            <label>Диапазон поиска *</label>
                            <div className={style.range}>
                                <input type="date" onChange={(e) => takeStartDate(e)}></input>
                                <input type="date" onChange={(e) => takeEndDate(e)}></input>
                            </div>
                        </div>
                        <div className={style.additional__properties}>
                            <div className={style.checkbox__block}>
                                {
                                    checkboxes.map((label, index) => (
                                        <label>
                                            <input
                                                type="checkbox"
                                                onChange={checkCheckbox}
                                                data-index={index.toString()}
                                            />
                                            {label}
                                        </label>
                                    ))
                                }
                            </div>
                            <div className={style.check__search}>
                                <button>Поиск</button>
                                <label>* Обязательные к заполнению поля</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={style.picture__forSearch}><img src={forSearch} alt={'forSearch'}/></div>
            </div>
            <RenderFooter/>
        </>
    )
}

export {RenderSearch}