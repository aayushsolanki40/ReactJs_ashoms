import { Button, Grid } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Newsitem from '../components/NewsItem';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import {getCountries, getFinancialNews, getFinancialNewsPost} from '../API/Userapis';
import PublicIcon from '@mui/icons-material/Public';
import { getFlag } from '../API/LocalStore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';

const Newspage = () => {
    const dispatch = useDispatch();
    const [currentNewsPosition, setcurrentNewsPosition] = useState(0);
    const [News, setNews] = useState([]); 
    const [selectedCountry, setselectedCountry] = useState('');  
    const [Countries, setCountries] = useState([]);
    const [hasmorenews, sethasmorenews] = useState(true);
    const [SearchText, setSearchText] = useState('');
    const [isSearching, setisSearching] = useState(false);
    const shareBtnModalShow = useSelector((state)=>state.sharebtnmodal.modalShow);

    function changeCountry(country){
        setcurrentNewsPosition(0)
        setselectedCountry(country);
        getFinancialNewsPost(0, country, "", "").then(meta => {
            setNews(meta.data)
            setcurrentNewsPosition(1);
        });  
    }

    function fetchNews(searchext=0){
        setisSearching(true);
        getFinancialNewsPost(currentNewsPosition, selectedCountry, "", searchext).then(meta => {
            if(((meta.data).length==0))
            setNews([]);
            else
            setNews([...News, ...meta.data]);
            if(meta.metadata.total_pages==meta.metadata.current_page)
            sethasmorenews(false);
            setIsFetching(false);
            setcurrentNewsPosition(currentNewsPosition+1);
            setisSearching(false);
        });
    }

    const handleSearch = (Searchvalue) =>{
        setSearchText(Searchvalue);
        setNews([]);
        setcurrentNewsPosition(0);
        fetchNews(Searchvalue);
    }
    
     useEffect(() => {
        dispatch(setheadermenuData({currentpath:'/news', headerfootershow:true}));
         getCountries().then(meta => {
             setCountries(meta)
         });   
         getFinancialNews(currentNewsPosition).then(meta => {
            setNews(meta.data);
            setcurrentNewsPosition(currentNewsPosition+1)
        });      
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     const [isFetching, setIsFetching] = useState(false);
   
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
      
    const navigate = useNavigate();
    const handleBack = () =>{
        navigate(-1);
    }
     
    return (
        <div style={{"minHeight":"90vh"}}>
            <div className="container-fluid">
                <div className="container card section_divider">
                <div className="row">
                            <div className="col-md-1">
                            <Button style={{"border":"none", "height": "30px"}} onClick={handleBack}><span className="back_btn_txt"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                            </div>
                        </div>
             
                <div className="row section_divider">
                        <div className="col-md-12">
                        <label className='labelasheading'>Countries</label><br/>  
                        <div className='flags_div d-flex'> 
                        <Chip
                            onClick={()=>changeCountry('')}
                            avatar={<PublicIcon/>}
                            label='All'
                            variant={(selectedCountry=='')?"":"outlined"}
                        />   
                        {(Countries.length==0)?(
                               Array.from({ length: 6 }, (x, i) => { return (
                                <div  key={i}><Skeleton variant="rectangular"  width={70} style={{"borderRadius":"20px"}} height={30} /></div>
                                )
                               }) ):(Countries.map(function (value, index, array) {
                            return (
                            <Chip
                            key={index}
                            onClick={()=>changeCountry(value.country)}
                            avatar={<Avatar alt={value.country[0]} src={getFlag(value.country)} />}
                            label={value.country}
                            variant={(selectedCountry==value.country)?"":"outlined"}
                            />)
                            }))
                        }
                        </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12  news_cards_div section_divider">
                    <div className="row news_label_with_search_row"  >
                        <div className="col-md-6">
                        <label className='labelasheading'>News</label><br/>     
                        </div>
                        <div className="col-md-6">
                        <div className='row search_input_box_NewsPage'>
                            <div className="col-2 col-md-1">
                            <img className='search_icon_r' alt="" srcSet="/assets/icons/search_icon_light.svg" />
                            </div>
                            <div className="col-10 col-md-11">
                            <input onChange={(e)=>handleSearch(e.target.value)} value={SearchText} className='search_input_NewsPage ' placeholder='Search' />
                            </div>
                        </div>
                        </div>
                    </div>    
                   
                    <Grid container spacing={2} >
                        <>
                            {(News.length==0)?(
                              (isSearching)?( Array.from({ length: 8 }, (x, i) => { return (
                                <Grid className='newsItemBox'  item xs={12} md={3}>
                                <Skeleton variant="rectangular" style={{"borderRadius":"10px"}} height={230} />
                                </Grid>
                                )
                               }) ):("")):(News.map(function (value, index, array) {
                            return (
                            <Newsitem size={3} title={value.source}
                                description={value.title}
                                created={value.created}
                                image={value.image_url}
                                url_link={value.link}
                                key={index} />)
                            }))
                            }
                        
                            {isFetching && (
                                <>
                                <Grid className='newsItemBox'  item xs={12} md={3}>
                                <Skeleton variant="rectangular"  height={250} />
                                </Grid>
                                <Grid className='newsItemBox'  item xs={12}  md={3}>
                                <Skeleton variant="rectangular" height={250} />
                                </Grid>
                                </>
                            )}
                            </>
                         </Grid>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Newspage;
