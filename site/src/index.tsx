import { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/landing-page/landing-page';
import MapPanel from './components/map-panel/map-panel';

import './global.css';
import PageWrapper from './components/page-wrapper/page-wrapper';

// Main page
const MainPage: FC = () => {
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
