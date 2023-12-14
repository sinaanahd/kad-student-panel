import "./asset/css/index.scss";
import { Route , Switch ,Redirect ,BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';
import { useContext, useEffect } from 'react';
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
import GuidePage from "./components/guide/guide";
import DashboardPage from "./components/dashboard/dashboard";
import ShopPage from "./components/shop/shop";
import CartPage from "./components/cart/cart";
import OnlineStream from "./components/online-stream/online-strem";
import Cookie from "./components/cookie-maker/cookie-maker";

function App() {
  const {user} = useContext(DataContext);
  useEffect(()=>{
    const slug = window.location.pathname
    if(!user){
      if(slug === "/login" || slug === "/sign-up" || slug === "/login-code" || slug === "/forget-pass" || slug === "" || slug === "/"){
        //  window.location.pathname = "/my-courses";
      }
      else{
        window.location.pathname = "/login";
      }
    }else{
      if(slug === "/login" || slug === "/sign-up" || slug === "/login-code" || slug === "/forget-pass" || slug === "" || slug === "/"){
        window.location.pathname = "/my-courses";
      }
    }
    
  },[])
  return (
    <>
    <BrowserRouter>
    {window.location.pathname !== "/" && window.location.pathname !== ""  && window.location.pathname !== "/login" && window.location.pathname !== "/login-code" && window.location.pathname !== "/sign-up" && window.location.pathname !== "/forget-pass" ? <>
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
              <Route path="/guides" exact component={GuidePage} />
              <Route path="/dashboard" exact component={DashboardPage} />
              <Route path="/shop" exact component={ShopPage} />
              <Route path="/cart" exact component={CartPage} />
              <Route path="/cookie" exact component={Cookie} />
              <Route path="/online/:id" exact component={OnlineStream} />
              <Route path="/not-found" component={NotFound} />
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
              <Route path="/" component={Login} />
            </Switch>
    </> }
        
    </BrowserRouter>
    </>
  );
}

export default App;
