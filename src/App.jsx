import './App.css';
import Header from './components/Header';
import Loginpage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useParams, BrowserRouter} from "react-router-dom";
import ForgetPassword from './Pages/Forget_password';
import Companiespage from './Pages/CompaniesPage';
import Forumpage from './Pages/ForumPage';
import Newspage from './Pages/NewsPage';
import Homepage from './Pages/HomePage';
import Logout from './Pages/Logout';
import Companydetails from './Pages/CompanyDetails';
import Pdfview from './Pages/PdfView';
import Footer from './components/Footer';
import OtpScreen from './Pages/OtpScreen';
import Indexpage from './Pages/indexPage';
import Autoprofile from './Pages/Autoprofile';
import Changepassword from './Pages/ChangePassword';
import Settingspage from './Pages/SettingsPage'; 
import Privacypolicy from './Pages/Privacypolicy';
import Termsncondition from './Pages/Termsnconditions';
import Aboutus from './Pages/Aboutus';
import Contactus from './Pages/Contact_us';
import { getUserToken } from './API/LocalStore';
import PaymentGateway from './Pages/PaymentGateway';

const App = () => {
    
    let var_token = null;
    console.log("token : "+getUserToken());

    if ((getUserToken() !== null) &&(getUserToken() !==  undefined) ) {
        var_token = getUserToken();
    }   
    const url_location = window.location.pathname;
    const EmailOfOtp = sessionStorage.getItem('email_for_otp');
    const mobileOfOtp = sessionStorage.getItem('mobile_for_otp');
    if((url_location=='/otp'))
    if(!EmailOfOtp&&!mobileOfOtp)
    window.location.href  = "/login";
    
    const [token, settoken] = useState(((var_token===null)&&(var_token !==  undefined))?'':var_token);
    const [IsUserLogin, setIsUserLogin] = useState(((var_token===null)&&(var_token !==  undefined))?false:true);
    

    var m_r = '/company/'+((url_location.split("/").length>1)?url_location.split("/")[2]:'');
    console.log("c: "+m_r+' '+url_location);
    
    if(IsUserLogin){
        if((url_location=='/login')||(url_location=='/signup'))    
        window.location.href  = "/home";
        // window.location.replace("/home");
    }
    else{
        if((url_location!=='/login')&&(url_location!=='/signup')&&(url_location!=='/linkedin')&&(url_location!=='/forgot_password'))    
        window.location.href  = "/login";
        // window.location.replace("/login");
    }

    return ( < div >
            {(IsUserLogin && ((url_location == '/') || (url_location == '/home') || (url_location == '/forums/addforum') || (url_location == '/financials') || (url_location == '/forums') || (url_location == '/news') || (url_location === m_r)))?(<Header IsUserLogin={IsUserLogin} setIsUserLogin={setIsUserLogin} />):""}
             <Routes>
                <Route exact path="/linkedin" element={<h1>Helo</h1>} />
                    <Route path="/otp" element={<OtpScreen/>} />
                <Route path="/" element={< Companiespage />} />
                    <Route path="/changepass" element={<Changepassword/>}></Route>
                <Route path="/settings" element={<Settingspage/>}/>
                    <Route path = "/myprofile" element={<Autoprofile/>} />
                    <Route path = "/payment" element={<PaymentGateway/>} />
                    <Route exact path = "/login"
                          element = {<Loginpage token={token} setIsUserLogin={setIsUserLogin} /> } />  
                    <Route path = "/logout"
                          element = {<Logout  setIsUserLogin={setIsUserLogin}/> } />      
                    <Route path = "/signup" 
                           element = { < SignUpPage token={token} setIsUserLogin={setIsUserLogin} /> }/>
                    <Route path="/forgot_password"  token={token} setIsUserLogin={setIsUserLogin}
                           element = { < ForgetPassword/> }/>     

                    <Route path="/financials" token={token}  setIsUserLogin={setIsUserLogin}
                           element = { <Homepage  setIsUserLogin={setIsUserLogin}/> }/> 
                    <Route path="/news" token={token} 
                           element = { < Newspage/> }/> 
                    <Route path="/forums/:any" token={token}  setIsUserLogin={setIsUserLogin}
                           element = { < Forumpage/> }/> 
                    <Route path="/forums" token={token}  setIsUserLogin={setIsUserLogin}
                           element = { < Forumpage/> }/>        
                    <Route path="/home" token={token}  setIsUserLogin={setIsUserLogin}
                           element = { < Companiespage/> }/>   
                    <Route exact path="/company/:id" element = { <Companydetails/> }/>   
                    <Route exact path="/document" element = { <Pdfview/> }/>   

                    <Route exact path="/privacynpolicy" element={<Privacypolicy />} />
                    <Route exact path="/termsandconditions" element={<Termsncondition />} />
                    <Route exact path="/about_us" element={<Aboutus />} />
                <Route exact path="/contact_us" element={<Contactus />} />
                </Routes>
            {(IsUserLogin && ((url_location == '/') || (url_location == '/home') || (url_location == '/forums/addforum') || (url_location == '/financials') || (url_location == '/forums') || (url_location == '/news') || (url_location === m_r))) ? (<Footer/>):""}
        </div>
    );
}

export default App;