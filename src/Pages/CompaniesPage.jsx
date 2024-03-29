import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySelect from '../components/CompanySelect';
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';

const Companiespage = () => {
    const navigate = useNavigate();
    const GoToCompany = (e) =>{
        e.preventDefault();
        navigate('/financials');
    } 
    const GoToNews = (e) =>{
        e.preventDefault();
        navigate('/news');
    }
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setheadermenuData({currentpath:'/home', headerfootershow:true}));
    }, []);

    return (
        <>
           
        <div style={{"minHeight":"90vh"}} className="container homepage_container section_divider">
                <div className="row global_search_box">
                    <div className="col-md-4 offset-md-4">
                        <CompanySelect/>
                       
                    </div>
                </div>    
            <div className="row">
                <div className="col-md-10 offset-md-1 card homepage_center_main_div">
                       <div className="row homepagebothicondiv">
                            <div className="col-md-6">
                                <div className="homepage_icon_div">
                                    <div className="row icon_container_row">
                                        <div className="col homepage_icon_col">
                                            <a onClick={GoToCompany} href="about:blank" className="nolink homepage_icon_container">
                                            <img alt="Image not found." className='homepage_icons' srcSet={"./assets/icons/CompanyAnalysis.png"} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="homepage_icon_title_div">
                                            <h3>Company Financial Report</h3>
                                        </div>
                                        <span className='homepage_icon_span'>View Quarterly and annual financial statements, auditors’ opinion, and complete set of company financial notes covering 700+ traded equities in the GCC Countries (KSA, UAE, Kuwait, Bahrain, Qatar, Oman).</span>
                                    </div>
                                    <br/>
                                    </div>
                            </div>
                            <div className="col-md-6">
                           
                                    <div className="row icon_container_row">
                                        <div className="col homepage_icon_col">
                                        <div  className="homepage_icon_div">
                                        <a  className="homepage_icon_container nolink" href="about:blank" onClick={GoToNews}>
                                            <img alt="Image not found." className='homepage_icons' srcSet={"./assets/icons/News.png"} />
                                        </a>
                                     </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col">
                                    <div className="homepage_icon_title_div">
                                        <h3>News</h3>
                                    </div>
                                        <span className="homepage_icon_span">Browse up-to-date news covering the GCC Countries.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Companiespage;
