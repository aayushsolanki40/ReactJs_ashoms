import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFinancialNews, getSingleCompany } from '../API/Userapis';
import Newsitem from '../components/NewsItem';
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';
const Companynews = () => {
    const dispatch = useDispatch();
    const { companyid } = useParams();
    const [News, setNews] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [CompanyData, setCompanyData] = useState();
    const [hasmorenews, sethasmorenews] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        dispatch(setheadermenuData({currentpath:'/news', headerfootershow:true}));
        getSingleCompany(companyid).then(meta =>{
            setCompanyData(meta);
            fetchNews();
        });
    }, []); 

    function fetchNews(){
        setIsFetching(true);
        getFinancialNews(CurrentPage, CompanyData.Country, CompanyData.SymbolTicker).then(metanews =>{
            setNews(metanews.data);
            if(metanews.metadata.total_pages>CurrentPage)
            sethasmorenews(true);
            else
            sethasmorenews(false);
            setIsFetching(false);
            setCurrentPage(CurrentPage+1)
        })
    }
   
     useEffect(() => {
       if (!isFetching) return;
       fetchNews();
     }, [isFetching]);
   
     function handleScroll() {
       if(hasmorenews){  
       if (window.innerHeight + ((parseInt(document.documentElement.scrollTop)+2000)) < document.documentElement.offsetHeight || isFetching) return;
       setIsFetching(true);
       }
     }

    return (
        <>
           <div style={{"minHeight":"90vh"}}>
                <div className="container-fluid">
                    <div className="container card section_divider">
                    <div className="row">
                    <div className="col-md-12  news_cards_div section_divider">
                    <div className="row news_label_with_search_row"  >
                        <div className="col-md-6">
                        <label className='labelasheading'>News of {CompanyData?CompanyData.Company_Name:""} </label><br/>     
                        </div>
                    </div>    
                    {
                        ((!isFetching)&&(News.length==0))?(<span>No any news found related to this company.</span>):""
                    }
                    <Grid container spacing={2} >
                        <>
                        {News.map(function (value, index, array) {
                            return (
                            <Newsitem size={3} title={value.source}
                                description={value.title}
                                created={value.created}
                                image={value.image_url}
                                url_link={value.link}
                                key={index} />)})
                            }
                            </>
                         </Grid>
                    </div>
                    </div>
                    </div>
                </div>
            </div>                    
        </>
    );
}

export default Companynews;
