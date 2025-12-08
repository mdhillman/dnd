import { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MapPanel from './components/map-panel/map-panel';
import { useNavigate, useSearchParams } from "react-router";
import PageWrapper from './components/page-wrapper/page-wrapper';
import InfoPanel from './components/info-panel/info-panel';
import { Buffer } from 'buffer';

import './global.css';
import { LandingPage } from './components/landing-page/landing-page';
import { getCodesFromCookie } from './utilties';




// Check if the Buffer global is defined, if not, attach the polyfill
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}

// Main page
const MainPage: FC = () => {
    //let [params] = useSearchParams();
    //const infoParam = params.get("info");

    const navigate = useNavigate();
    
    const cookies = getCodesFromCookie();
    if(!cookies.includes('accept-cookies')) {
        navigate('/landing');
        return;
    }

    <PageWrapper>
        <InfoPanel/>
    </PageWrapper>
}

/**
 * 
 * @returns 
 */
const CustomRoutes: FC = () => (
    <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/landing' element={<LandingPage/>}/>
        <Route path='/map' element={<MapPanel/>}/>
        <Route path='/info' element={<InfoPanel filename='home'/>}/>
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
