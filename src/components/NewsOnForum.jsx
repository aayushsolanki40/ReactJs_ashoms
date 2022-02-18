import { Grid, Button } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Newsitem from '../components/NewsItem';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import {getCountries, getFinancialNews2} from '../API/Userapis';
import PublicIcon from '@mui/icons-material/Public';
import ForumNewsItem from './ForumNewsItem';
import { getFlag } from '../API/LocalStore';

const Newsonforum = () => {
    function changeCountry(country){
        setcurrentNewsPosition(0)
        setselectedCountry(country);
        getFinancialNews2(0, 10, country).then(meta => {
            setNews(meta.data)
            setcurrentNewsPosition(1);
            console.log(meta);
        });  
    }

    console.log("Location : "+window.location.pathname.split('/')[3]);


    const [currentNewsPosition, setcurrentNewsPosition] = useState(0);
    const [News, setNews] = useState([]); 
    const [selectedCountry, setselectedCountry] = useState('');  
    const [Countries, setCountries] = useState([]);
    const [hasmorenews, sethasmorenews] = useState(true);

    function fetchNews(){
    getFinancialNews2(currentNewsPosition, 10, selectedCountry).then(meta => {
            setNews([...News, ...meta.data]);
            if(meta.metadata.total_pages==meta.metadata.current_page)
            sethasmorenews(false);
            setIsFetching(false);
            setcurrentNewsPosition(currentNewsPosition+1);
        });
    }
    
    console.log("dsd");
     useEffect(() => {
         getCountries().then(meta => {
             setCountries(meta)
             console.log(meta);
         });   
         getFinancialNews2(currentNewsPosition, 10).then(meta => {
            setNews(meta.data);
            setcurrentNewsPosition(currentNewsPosition+1)
            console.log(meta);
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
            //if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
            // setIsFetching(true);
       }
     }

    return (
        <div>
            <div className="container-fluid">
                <div className="container card section_divider">
              
                <div className="row section_divider">
                        <div className="col-md-12">
                        <label className='labelasheading'>News</label><br/>  
                        <div className='row search_input_box_ForumNewsPage'>
                            <div className="col-1">
                            <img className='search_icon_r' alt="" srcSet="/assets/icons/search_icon_light.svg" />
                            </div>
                            <div className="col-11">
                            <input className='search_input_ForumNewsPage ' placeholder='Search' />
                            </div>
                        </div>
                        <div className='flags_div' style={{"paddingTop":"10px", "paddingBottom":"10px"}}> 
                        
                        <Chip
                            onClick={()=>changeCountry('')}
                            avatar={<PublicIcon/>}
                            label='All'
                            variant={(selectedCountry=='')?"":"outlined"}
                        />   
                                <br />
                        {(Countries.length==0)?(
                               Array.from({ length: 3 }, (x, i) => { return (
                                <div  key={i}><Skeleton variant="rectangular"  width={70} style={{"borderRadius":"20px"}} height={30} /></div>
                                )
                               }) ):(Countries.map(function (value, index, array) {
                                   console.log((index+1)%3);
                            return (<>
                            <Chip
                            key={index}
                            onClick={()=>changeCountry(value.country)}
                            avatar={<Avatar alt={value.country[0]} src={getFlag(value.country)} />}
                            label={value.country}
                            variant={(selectedCountry==value.country)?"":"outlined"}
                                />{((index + 1)%3==0)?<br/>:("")}</>)
                            }))
                        }
                        </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12  news_cards_div section_divider">
                    <Grid container spacing={2}>
                        <>
                            {(News.length==0)?(
                               Array.from({ length: 3 }, (x, i) => { return (
                                <Grid className='newsItemBox d-flex'  key={i} item xs={12}>
                                <Skeleton variant="rectangular"  width={150} height={100} />    
                                <Skeleton variant="rectangular ml-3"  width={300} height={100} />
                                </Grid>
                                )
                               }) ):(News.map(function (value, index, array) {
                            return (
                            <ForumNewsItem size={12} title={value.source}
                                              description={value.title}
                                              image={value.image_url}
                                              created_at={value.created}
                                              url_link={value.link}
                                              key={index} />)
                            }))
                            }

                          
                            
                            {isFetching && (
                                <>
                                <Grid className='newsItemBox d-flex'  item xs={12}>
                                <Skeleton variant="rectangular"  width={150} height={100} />    
                                <Skeleton variant="rectangular ml-3"  width={300} height={100} />
                                </Grid>
                                <Grid className='newsItemBox d-flex'  item xs={12}>
                                <Skeleton variant="rectangular"  width={150} height={100} />    
                                <Skeleton variant="rectangular ml-3"  width={300} height={100} />
                                </Grid>
                                </>
                            )}

                            {hasmorenews && ( 
                                 <div className='d-flex justify-content-center w-100'>
                                 <Button onClick={()=>setIsFetching(true)} variant="text"><span style={{"textDecoration": "underline"}}>See More</span></Button>
                                 </div>   
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

export default Newsonforum;
