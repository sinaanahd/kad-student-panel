import { Route , Switch ,Redirect ,BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';
import MYCourses from './components/my-courses/my-courses';
import JalasatPage from './components/jalasat/jalasat-page';
import NotFound from './components/404/404';
import Header from './components/header/header';
import SideBar from './components/side-bar/side-bar';
import WelcomeName from './components/welcome-name/welcome-name';
import ProfilePage from './components/profile/profile';
import FinancePage from './components/finance/finance-page';
import Login from './components/login/login';

import "./asset/css/index.scss";
import { useContext } from 'react';
import { DataContext } from './components/data/datacontext';

function App() {
  const {user} = useContext(DataContext);
  return (
    <>
    <BrowserRouter>
    {window.location.pathname !== "/login" ? <>
    <Header user={user}/>
        <div className="page-wrapper">
          <SideBar />
          <div className="main-content mm-width">
            <WelcomeName user={user}/>
            <Switch>
              <Route path="/finance" exact component={FinancePage} />
              <Route path="/jalasat" component={JalasatPage} />
              <Route path="/my-courses" exact component={MYCourses} />
              <Route path="/jalasat" exact component={JalasatPage} />
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="/" component={MYCourses} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
    </> : <>
            <Switch>
              <Route path="/login" exact component={Login} />
            </Switch>
    </> }
        
    </BrowserRouter>
    </>
  );
}

export default App;
