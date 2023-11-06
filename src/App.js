import "./asset/css/index.scss";
import { Route , Switch ,Redirect ,BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import { DataContext } from './components/data/datacontext';
import MYCourses from './components/my-courses/my-courses';
import JalasatPage from './components/jalasat/jalasat-page';
import NotFound from './components/404/404';
import Header from './components/header/header';
import SideBar from './components/side-bar/side-bar';
import WelcomeName from './components/welcome-name/welcome-name';
import ProfilePage from './components/profile/profile';
import FinancePage from './components/finance/finance-page';
import Login from './components/login/login';
import LoginCode from './components/login-code/login-code';
import SignUp from "./components/sign-up/sign-up";
import Forget_pass from "./components/forget-pass/forget-pass";

function App() {
  const {user} = useContext(DataContext);
  return (
    <>
    <BrowserRouter>
    {window.location.pathname !== "/login" && window.location.pathname !== "/login-code" && window.location.pathname !== "/sign-up" && window.location.pathname !== "/forget-pass" ? <>
    <Header user={user}/>
        <div className="page-wrapper">
          <SideBar />
          <div className="main-content mm-width">
            <WelcomeName user={user}/>
            <Switch>
              <Route path="/finance" exact component={FinancePage} />
              <Route path="/jalasat/:id" component={JalasatPage} />
              <Route path="/my-courses" exact component={MYCourses} />
              <Route path="/jalasat" exact component={JalasatPage} />
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" component={Login} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
    </> : <>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/login-code" exact component={LoginCode} />
              <Route path="/sign-up" exact component={SignUp} />
              <Route path="/forget-pass" exact component={Forget_pass} />
            </Switch>
    </> }
        
    </BrowserRouter>
    </>
  );
}

export default App;
