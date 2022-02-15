import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import {Card, TextField, Avatar } from '@mui/material';
import Backbutton from '../components/Backbutton';
import { getUserdata, updateuserapi } from '../API/Userapis';
import PhoneInput from 'react-phone-input-2'

const Autoprofile = () => {

    const [errorMessage, seterrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const [First_name, setFirst_name] = useState('');
    const [Last_name, setLast_name] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    const [First_name_err, setFirst_name_err] = useState('');
    const [Last_name_err, setLast_name_err] = useState('');
    const [Mobile_err, setMobile_err] = useState('');
    const [Email_err, setEmail_err] = useState('');
    const [Profile_pic, setProfile_pic] = useState('');
    const [Phone, setPhone] = useState('');
    const [CountryCode, setCountryCode] = useState('971');
    const [ProfileFile, setProfileFile] = useState();

    useEffect(() => {
      getUserdata().then(meta => {
        if (meta.response) {
          let error = meta.response.data;
        if (error.status == false) {
          localStorage.removeItem("user_token");
          window.location.href = "/login"
          }
        }
          else{
          let { first_name, last_name, mobile, email, profile_pic, country_code } = meta;
          console.warn(meta.userdata);
          setProfile_pic(profile_pic);
          setFirst_name(first_name)
          setLast_name(last_name);
          console.log(country_code+''+mobile);
          setMobile(country_code+''+mobile);
          setPhone(mobile);
          setCountryCode(country_code);
          setEmail(email);
          }
         
        }) 
        window.scrollTo(0, 0)
      }, []);

  const clearAlerts = () =>{
    setFirst_name_err('');
    setLast_name_err('');
    setMobile_err('');
    setEmail_err('');
    seterrorMessage('');
    setsuccessMessage('');
  }    
    
  const form_handle = (e) => {
    e.preventDefault();
    clearAlerts();
    let isValidate= true;
    if(First_name==''){
      isValidate=false;
      setFirst_name_err("Please enter your first name.");
    }
    if(Last_name==''){
      isValidate=false;
      setLast_name_err("Please enter your last name.");
    }
    if(Phone==''){
      isValidate=false;
      setMobile_err("Please enter your mobile number.");
    }
    if(Email==''){
      isValidate=false;
      setEmail_err("Please enter your email.");
    }

    if(isValidate){
      console.log(ProfileFile);
      updateuserapi(First_name, Last_name, Email, Phone, ((ProfileFile) ? ProfileFile : Profile_pic)).then(meta =>{
        if(meta.status){
          setsuccessMessage(meta.message);
        }
        else{
          seterrorMessage(meta.message);
        }
      })
    }
  }

  const handleProfileChange = (event) =>{
    clearAlerts();
    var file = event.target.files[0];
    let file_type = ((file['type']).split('/'))[0];
    setProfileFile(file);
    console.log(ProfileFile) // Would see a path?
    if(file_type==='image'){
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
        setProfile_pic(reader.result);
      }.bind(this);
      setProfileFile(file);
    
   }
   else{
      event.preventDefault();
     seterrorMessage("File must be image.");
     return false;
   }
  }
    return (
        <div>
      
        <section className='authPage_section native_background'>
        <Backbutton />  
        <div className='container-fluid'>
            <div className='container'>
                <div className="row auto_page_row">
                    <div className="col-md-2 col-sm-2 offset-md-5 offset-sm-5 d-flex justify-content-center">
                        <img alt="Ashom Logo" style={{"width":"80px"}} srcSet="/assets/icons/launch_Logo.png" />
                    </div>
                </div>
               <div className='row'>
                    <Card  variant="outlined" className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 section_divider authPage_form_div">
                      <div className="row">
                          <div className="col-md-12 d-flex justify-content-center">
                             <input type="file" onChange={handleProfileChange} id="profile_pic_inp" className="d-none"/>
                              <label  htmlFor="profile_pic_inp">  <Avatar
                                   
                                    alt={(First_name!='')?(First_name[0]):('A')}
                                    src={Profile_pic}
                                    sx={{ width: 60, height: 60 }}
                                />
                                </label>
                          </div>
                      </div>
                      <div className='row' style={{"height":"50px"}}> 
                        <div className='col-md-12'>
                        <Alert className={(errorMessage!='')?'':'d-none'} severity="error">{errorMessage}</Alert>
                        <Alert className={(successMessage!='')?'':'d-none'} severity="success">{successMessage}</Alert>
                        </div>
                      </div>

                        <form onSubmit={form_handle} method='post' noValidate>
                        <div className='form-group mt-3'>
                          <div className="col-md-12">
                                <TextField
                                    id="first_name" 
                                    value={First_name} 
                                    onChange={e => setFirst_name(e.target.value)}
                                    label="First Name"
                                    type="text"
                                    autoComplete="off"
                                    autoFocus={true}
                                    variant="standard"
                                    className="w-100 email_input"
                                />
                            <span className="input_err">{First_name_err}</span>
                          </div>
                        </div>
                        <div className='form-group'>
                          <div className="col-md-12">
                                <TextField
                                    id="last_name" 
                                    value={Last_name} 
                                    onChange={e => setLast_name(e.target.value)}
                                    label="Last Name"
                                    type="text"
                                    autoComplete="off"
                                    autoFocus={true}
                                    variant="standard"
                                    className="w-100 email_input"
                                />
                            <span className="input_err">{Last_name_err}</span>
                          </div>
                        </div>
                        <div className='form-group'>
                          <div className="col-md-12">
                          <label className='form_label_txt'>Mobile</label>
                          <PhoneInput
                                    className="b-none"
                                    country={'ae'}
                                    value={Mobile}
                                    style={{'width':'100%', 'border': 'none', 'borderBottom': '1px solid grey'}}
                                    countryCodeEditable={false}
                                    onChange={(phone, country) => {setCountryCode(country.dialCode); setMobile(phone); setPhone(phone.slice((country.dialCode).length));  console.log(phone.slice((country.dialCode).length));}}
                                    />
                                {/* <TextField
                                    id="Mobile" 
                                    value={Mobile} 
                                    onChange={e => setMobile(e.target.value)}
                                    label="Mobile"
                                    type="number"
                                    autoComplete="off"
                                    autoFocus={true}
                                    variant="standard"
                                    className="w-100 email_input"
                                /> */}
                            <span className="input_err">{Mobile_err}</span>
                          </div>
                        </div>
                        <div className='form-group'>
                          <div className="col-md-12">
                                <TextField
                                    id="Email" 
                                    value={Email} 
                                    onChange={e => setEmail(e.target.value)}
                                    label="Email"
                                    type="Email"
                                    autoComplete="off"
                                    autoFocus={true}
                                    variant="standard"
                                    className="w-100 email_input"
                                />
                            <span className="input_err">{Email_err}</span>
                          </div>
                          </div>
                        <div className='form-group loginbtn_div otpscreen_btn'>
                                <button type='submit' className='loginbtn'>CONTINUE</button>
                        </div>
                       
                        </form>
                        </Card>
                    {/* </div> */}
                </div>
                

            </div>
          </div>
        </section>
    </div>
    );
}
export default Autoprofile;
