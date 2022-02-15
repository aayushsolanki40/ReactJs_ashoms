import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import Backbutton from '../components/Backbutton';
import { getAboutus } from '../API/Userapis';

const Aboutus = () => {
    const [AboutUs, setAboutUs] = useState('');
    useEffect(() => {
        getAboutus().then(meta => {
            setAboutUs(meta);
        })
    }, []);
    return (
        <div>
            <section className='authPage_section native_background'>
            <Backbutton />
                <div className='container-fluid'>
                    <div className='container'>
                        <div className="row auto_page_row">
                            <div className="col-md-2 col-sm-2 offset-md-5 offset-sm-5 d-flex justify-content-center">
                                <img alt="Ashom Logo" style={{ "width": "60px"}} srcSet="/assets/icons/launch_Logo.png" />
                            </div>
                        </div>
                        <div className='row'>
                            <Card variant="outlined" style={{ "min-height": "550px"}} className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 section_divider authPage_form_div">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mainheading_div " style={{ "height": "54px" }}>
                                            <h1 className="auth_welcome_text">About The App</h1>
                                        </div>
                                    </div>
                                </div>

                                <div classsName="row">
                                    <div className="col" style={{ "color": "#707070", "font-size": "14px" }} dangerouslySetInnerHTML={{__html: AboutUs}}></div>
                                </div>

                            </Card>
                            {/* </div> */}
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
}
export default Aboutus;
