import './App.css'
import {RenderResults} from "./components/pages/results__page/full__results__page/results.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RenderMainPage} from "./components/pages/_main__page/full__main__page/main__page.tsx";
import {RenderSearch} from "./components/pages/search__page/search.tsx";
import {RenderAuthorization} from "./components/pages/authorization__page/autorization.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";

function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RenderMainPage/>}/>
                    <Route path='/authorization' element={<RenderAuthorization/>}/>
                    <Route path='/search' element={<RenderSearch/>}/>
                    <Route path='/results' element={<RenderResults/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>

    )
}

export default App