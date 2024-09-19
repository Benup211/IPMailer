import {Routes,Route} from 'react-router-dom';
import { HomePage } from '../pages/home-page';
export const HomeRoute = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
    );
}