import React, {useState} from 'react';



const Footer = () => {
    const [Email_err, setEmail_err] = useState('');
    const [Email, setEmail] = useState('');
    const validateEmail = (email) =>
        email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const handle_subscribe_form = (e) =>{
        e.preventDefault();
        if(Email==''){
            setEmail_err("please enter email here.");
        }
        else{
            if(validateEmail(Email)){

            }
            else{
                setEmail_err("please enter valid email.");
            }
        }
    }


    return (
        <div className='footer_fluid footer'>
        <div className='container-fluid'>
            <div className="container footer_container">
                <div className="row">
                    
                    <div className="col-md-2 offset-md-2 ">
                       <label className='footer_label'>Useful Links</label>
                       <ul className='footer_link_list'>
                           <li><a href="/about_us">About Us</a></li>
                           <li><a href="/termsandconditions">Terms and Conditions</a></li>
                           <li><a href="/privacynpolicy">Privacy & Policy</a></li>
                       </ul>
                    </div>
                    <div className="col-md-3 appsplaystore_icon_box">
                        <div className="row downloadstoreiconrows">
                          <div className="col-md-12">  
                        {/* <label className='footer_label'>Available on</label> */}
                        </div>
                            <a style={{"height": "50px"}} className="col-md-12 available_on_apple_footer" href="https://apps.apple.com/us/app/ashom-app/id1562818820">
                    
                                <img alt="" srcSet="/assets/icons/applestoreDownload.png" />
                            
                            </a>
                            <div style={{"marginTop": "10px"}} className="col-md-12 available_on_play_store">
                                <img alt="" srcSet="/assets/icons/playstoreDownload.png" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                     <form onSubmit={handle_subscribe_form}>   
                    <label className='footer_label_subscribe'>Subscribe</label><br/>
                    <span className='subscribe_quate'>Subscribe to receive up to date notifications</span>
                    <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value)} className="subscribe_input_footer" placeholder='Your Address Email'/>
                    <span style={{"color":"red"}} className="err_text">{Email_err}</span>
                    <button type="submit" className='btn subscribe_btn'>Subscribe</button>
                    </form>
                    </div>
                </div>
                
            </div>
            
        </div>
        <div className="container-fluid footer_cp_row">
        <div className="container">
            <div className="row">
                <div className="col-md-12 footer_copyright_label">
                        copyright Ashom.app 2022
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default Footer;
