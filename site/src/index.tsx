import { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/landing-page/landing-page';

import './global.css';
import TestPage from './components/test-page/test-page';


/**
 * 
 * @returns 
 */
const CustomRoutes: FC = () => (
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/test' element={<TestPage/>}/>
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
