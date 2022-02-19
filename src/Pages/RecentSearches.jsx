import { Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchesAPI } from '../API/Userapis';
import Companylistcard from '../components/CompanyListCard';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
import { setForumNewsModalData } from '../reducers/ForumNewsModalReducer';
import { useNavigate } from 'react-router-dom';

const RecentSearches = () => {
    const navigate = useNavigate();
    const [MostViewed, setMostViewed] = useState([]);
    const [ViewAgain, setViewAgain] = useState([]);
    const GoToReports = (companyId) => navigate('/company/'+companyId, { replace: false });
    const GoToNews = (companyId) => navigate('/companynews/'+companyId, { replace: false });
    const [isFetched, setisFetched] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        getSearchesAPI(true).then(meta =>{
            if(meta.length==0)
            return false;
            let searches = [];
            meta.map(function (value, index, array) {
                console.log(value);
                let serach_array = value.searchstr.split('✂');
                if(serach_array[0]=="CompanyName"){
                    let search_sample = [];
                    search_sample["id"] = serach_array[5];
                    search_sample["Country"] = serach_array[1];
                    search_sample["SymbolTicker"] = serach_array[2];
                    search_sample["image"] = serach_array[3];
                    search_sample["Company_Name"] = serach_array[4];
                    searches.push(search_sample)
                }
            });    
            console.log(searches);
            setMostViewed(searches);
        });
        getSearchesAPI().then(meta =>{
            if(meta.length==0)
            return false;
            let searches = [];
            meta.map(function (value, index, array) {
                console.log(value);
                let serach_array = value.searchstr.split('✂');
                if(serach_array[0]=="CompanyName"){
                    let search_sample = [];
                    search_sample["id"] = serach_array[5];
                    search_sample["Country"] = serach_array[1];
                    search_sample["SymbolTicker"] = serach_array[2];
                    search_sample["image"] = serach_array[3];
                    search_sample["Company_Name"] = serach_array[4];
                    searches.push(search_sample)
                }
            });    
            console.log(searches);
            setViewAgain(searches);
            setisFetched(true);
        });

        dispatch(setheadermenuData({currentpath:'/searches', headerfootershow:true}));
    }, []);    

    return (
         <>
           <div style={{"minHeight":"90vh"}}>
                <div className="container-fluid">
                    <div className="container card section_divider">
                    <div className="row news_label_with_search_row" style={{"background": "#eeedef"}}>
                        <div className="col-md-6">
                        <label className='labelasheading'>View Again</label><br/>     
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-12">
                            <Grid container spacing={1}>
                            {(isFetched&&(ViewAgain.length==0))?"<span>No recent searches found.</span>":ViewAgain.map(function (value, index, array) {
                            return (
                            <Grid onClick={()=>dispatch(setForumNewsModalData({visibility:true, details:value}))}   key={index} item md={2} xs={6} height={260}>        
                                <Companylistcard  CompanyImage ={value.image} GoToReports={GoToReports} GoToNews={GoToNews} CompanyName={value.Company_Name} CompanyId={value.id} />
                            </Grid>
                            )})}
                            </Grid>
                        </div>
                    </div>
                   
                    <div className="row news_label_with_search_row"  style={{"background": "#eeedef"}}>
                        <div className="col-md-6">
                        <label className='labelasheading'>Most Viewed</label><br/>     
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-12">
                        <Grid container spacing={1}>
                        {MostViewed.map(function (value, index, array) {
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

export default RecentSearches;
