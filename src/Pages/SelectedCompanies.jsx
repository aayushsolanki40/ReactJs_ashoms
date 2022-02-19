import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSelectedCompanies } from '../API/Userapis';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { setForumNewsModalData } from '../reducers/ForumNewsModalReducer';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Companylistcard from '../components/CompanyListCard';

const Selectedcompanies = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [Companies, setCompanies] = useState([]);
    useEffect(() => {
        getSelectedCompanies().then(meta =>{
            setCompanies(meta);
        })
        dispatch(setheadermenuData({currentpath:'/financials', headerfootershow:true}));
    }, []);    

    const GoToReports = (companyId) => navigate('/company/'+companyId, { replace: false });
    const GoToNews = (companyId) => navigate('/companynews/'+companyId, { replace: false });

    return (
         <>
           <div style={{"minHeight":"90vh"}}>
                <div className="container-fluid">
                    <div className="container card section_divider">
                    <div className="row news_label_with_search_row"  >
                        <div className="col-md-6">
                        <label className='labelasheading'>Selected Companies</label><br/>     
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-12">
                        <Grid container spacing={1}>
                        {Companies.map(function (value, index, array) {
                        return (
                        <Grid onClick={()=>dispatch(setForumNewsModalData({visibility:true, details:value}))}   key={index} item md={2} xs={6} height={260}>        
                            <Companylistcard  CompanyImage ={value.image} GoToReports={GoToReports} GoToNews={GoToNews} CompanyName={value.Company_Name} CompanyId={value.id} />
                        </Grid>
                        )})}
                         </Grid>
                        </div>
                    </div>
                </div>    
            </div>    
        </div> 
        </>   
    );
}

export default Selectedcompanies;
