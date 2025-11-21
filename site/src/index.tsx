import { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MapPanel from './components/map-panel/map-panel';
import { useSearchParams } from "react-router";
import PageWrapper from './components/page-wrapper/page-wrapper';
import InfoPanel from './components/info-panel/info-panel';

import './global.css';

// Check if the Buffer global is defined, if not, attach the polyfill
import { Buffer } from 'buffer';
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}

// Main page
const MainPage: FC = () => {
    let [params] = useSearchParams();
    const infoParam = params.get("info");

    console.log("INFO IS " + infoParam);
    if(infoParam) {
        return (
            <PageWrapper>
                <InfoPanel filename={infoParam}/>
            </PageWrapper>
        )
    } 
    
    return (
        <PageWrapper/>
    )
}

/**
 * 
 * @returns 
 */
const CustomRoutes: FC = () => (
    <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/map' element={<MapPanel/>}/>
    </Routes>
);

const container = document.querySelector('#root');

if(container != null) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <BrowserRouter>
            <CustomRoutes/>
        </BrowserRouter>
    );
}
