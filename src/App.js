import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Welcome from "./Welcome";
import AppNavbar from './AppNavbar';
import './App.css';
import ListAndEdit from "./ListAndEdit";
import AppFooter from "./AppFooter";
import PersonEdit from "./PersonEdit";

const App = () => {
    return (
        <Router>
            <div className="wrapper">
            <AppNavbar/>
                <Routes>
                    <Route exact path="/" element={<Welcome/>}/>
                    <Route path='/persons' exact={true} element={<ListAndEdit/>}/>
                    <Route path='/newperson' element={<PersonEdit/>}/>
                </Routes>
                <AppFooter/>
            </div>
        </Router>
    )
}

export default App;
