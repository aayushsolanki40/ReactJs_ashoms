import React, {useState, useEffect} from 'react';
import { Button, IconButton,  } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from "react-router-dom";
import {useParams, useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {getUserdata} from '../API/Userapis';
import Headermenu from './Headermenu';
import Subscriptionpopup from './Subscriptionpopup';
import MoreIcon from '@mui/icons-material/MoreVert';
import { LogoutUser } from '../API/LocalStore';


const Header = (props) => {
    const [currentTab, setcurrentTab] = useState(window.location.pathname);
    const {IsUserLogin, setIsUserLogin, headerData} = props;
    const [username, setusername] = useState('Loading..');
    const [profileImg, setprofileImg] = useState('');
    const [Userdata, setUserdata] = useState('');
    const navigate = useNavigate();

    var base_url = window.location.origin;
    const preloadImages = [
      base_url+"/assets/icons/menu_home_fill.svg",
      base_url+"/assets/icons/menu_home.svg",
      base_url+"/assets/icons/menu_company.svg",
      base_url+"/assets/icons/menu_company_fill.svg",
      base_url+"/assets/icons/menu_forum.svg",
      base_url+"/assets/icons/forum_header_icon.svg",
      base_url+"/assets/icons/menu_news.svg",
      base_url+"/assets/icons/menu_news_fill.svg"
    ];
    
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const cacheimages = async (srcArray) =>{
      const promises = await srcArray.map((src) => {
        return new Promise(function (resolve, reject){
          const img  = new Image();
          img.src = src;
          img.onload = resolve();
          img.onerror = reject();
        });
      });
      await Promise.all(promises);
    }


    useEffect(() => { 
        getUserdata().then(meta => {
          if (meta.response){
          let error = meta.response.data;
          if (error.status==false){
             LogoutUser();
            // window.location.href = "/login";
          }
        }
            console.log(meta);
            setUserdata(meta);
            let {first_name, last_name, profile_pic} = meta;
            setusername(capitalizeFirstLetter(first_name))
            setprofileImg(profile_pic)
    });
    cacheimages(preloadImages);
  }, []);



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let params = useParams();
    const company_id = params.id;
    const Pages = ['/home', '/news', '/forums', '/companies', '/company/'+company_id];
    let curr_link = window.location.pathname;
    const [value, setValue] = React.useState(Pages.indexOf(curr_link));

    const navtohome = () =>{
      navigate('/home');
      setcurrentTab('/home');
    }
    
    useEffect(() => {
      handleChange();
    }, [currentTab]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      switch (newValue) {
        case '0':{
          setcurrentTab('/home')
          break;
        }  
        case '1':{
          setcurrentTab('/news')
          break;  
        }  
        case '2':{
          setcurrentTab('/forums')
          break;  
        }    
        case '3':{
          setcurrentTab('/financials')
          break;
        }  
        default:{
          break;
        }  
      }
      
    };

    
    return (
        <>
        <Subscriptionpopup  Userdata={Userdata} />
          <div className="container-fluid navbar-back sticky-top">
              <div className="container">
                <nav className="navbar navbar-expand-lg  p-0">
                    <a className="navbar-brand">
                       <NavLink to="/"><div className='row authPage_icon_div section_divider'>
                            <img className='authPage_icon' src='/assets/icons/ashom_header_logo.svg'/>
                        </div></NavLink> 
                    </a>
                    <div className='navbar_toogle_box' >
                    <Avatar   data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{"height":"40px", "width":"40px"}} alt={username.charAt(0)} src={profileImg} />
                    <IconButton
                    onClick={handleClick}
                      size="large"
                      aria-label="display more actions"
                      edge="end"
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                    </div>
                    {/* <button >
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse float-left" id="navbarNav">
                        <ul className="navbar-nav float-md-left w-100">
                           {IsUserLogin ? (
                        <>    
                          <li className={(headerData.currentpath==='/home'||headerData.currentpath==='/'||headerData.currentpath==='')?"nav-item active":"nav-item"}>
                            <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/home')} to={"/home"}>
                            {(headerData.currentpath==='/home')?<img style={{"height": "30px", "width": "43px"}} className='headerIconImgs' src="/assets/icons/menu_home_fill.svg" alt="" />:<img className='headerIconImgs' style={{"height": "30px", "width": "43px"}} src="/assets/icons/menu_home.svg" alt="" />}
                              HOME 
                              </NavLink>
                          </li>
                          <li className={(headerData.currentpath==='/financials')?"nav-item active":"nav-item"}>
                            <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/financials')}  to={"/financials"}>
                              {(headerData.currentpath==='/financials')?<img className='headerIconImgs' src="/assets/icons/menu_company_fill.svg" style={{"height": "30px", "width": "43px"}} alt="" />:<img className='headerIconImgs' style={{"height": "30px", "width": "43px"}} src="/assets/icons/menu_company.svg" alt="" />} 
                              FINANCIALS 
                              </NavLink>
                          </li>
                          <li className={(headerData.currentpath==='/forums')?"nav-item active":"nav-item"}>
                          <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/forums')} to={"/forums"}>
                          {(headerData.currentpath==='/forums')?<img className='headerIconImgs'  src="/assets/icons/forum_header_icon.svg" alt="" style={{"height": "30px", "width": "43px"}} />:<img className='headerIconImgs'  src="/assets/icons/menu_forum.svg" alt="" style={{"height": "30px", "width": "43px"}} />}
                              FORUMS 
                              </NavLink>
                          </li>
                          <li className={(headerData.currentpath==='/news')?"nav-item active":"nav-item"}>
                          <NavLink activeclassname="active_header_navlink" className="nav-link" onClick={()=>setcurrentTab('/news')}  to={"/news"}>
                          {(headerData.currentpath==='/news')?<img className='headerIconImgs'  src="/assets/icons/menu_news_fill.svg" alt="" style={{"height": "30px", "width": "43px"}} />:<img className='headerIconImgs'  src="/assets/icons/menu_news.svg" alt="" style={{"height": "30px", "width": "43px"}} />}
                              NEWS 
                              </NavLink>
                          </li>
                          <a href="nolink" onClick={(e)=>e.preventDefault()} href="about:blank"><div  onClick={handleClick} className='float-right row headerprofile'>
                          <a href="nolink" onClick={(e)=>e.preventDefault()} href="about:blank">
                            <Chip 
                              id="headerprofile_chip"
                                className='float-right headerprofile_chip'
                                avatar={<Avatar style={{"height":"40px", "width":"40px"}} alt={username.charAt(0)} src={profileImg} />}
                                label={username}
                                variant="outlined"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            />
                             </a>   
                            <img htmlFor="headerprofile_chip" style={{"position": "absolute", "right": "0", "transform": "translate(11px, 14px)"}} srcSet="http://localhost:3000/assets/icons/Dropdown.svg" />
                            </div>  </a>   
                        </> 
                        ) : (
                        <>    
                        </>
                        )}
                        </ul>
                    </div>
                    </nav>
                   <Headermenu profileImg={profileImg} username={username} anchorEl={anchorEl} open={open} handleClose={handleClose} setIsUserLogin={setIsUserLogin}/>
              </div>
          </div>
            
        </>
    );
}

export default Header;
