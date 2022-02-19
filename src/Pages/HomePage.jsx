import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {getCountries, getCompaniesByCountry, insertSearchAPI} from '../API/Userapis';
import PublicIcon from '@mui/icons-material/Public';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Companylistcard from '../components/CompanyListCard';
import { useNavigate } from 'react-router-dom';
import Companyreportnews from '../popup/CompanyReportNews';
import Popupforumornews from '../popup/PopupForumOrNews';
import { format } from 'date-fns';
import { getFlag } from '../API/LocalStore';
import CompanySelect from '../components/CompanySelect';
import Backbutton from '../components/Backbutton';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import 'bootstrap';
import { companiesPaginationIndexed, getCompanies, getTotalCompanies } from '../webSQl';
import { setForumNewsModalData } from '../reducers/ForumNewsModalReducer';
import {setheadermenuData} from '../reducers/HeaderMenuReducer';

const Homepage = (props) => {
   const dispatch = useDispatch();
   const [Countries, setCountries] = useState([]); 
   const [AvailableContries, setAvailableContries] = useState([]);
   const [selectedCountry, setselectedCountry] = useState(0);  
   const [Companies, setCompanies] = useState([]);
   const [SelectedCompanyData, setSelectedCompanyData] = useState({});
   const [SearchText, setSearchText] = useState('');
   const navigate = useNavigate();
   const GoToReports = (companyId) => navigate('/company/'+companyId, { replace: false });
   const GoToNews = (companyId) => navigate('/companynews/'+companyId, { replace: false });
   const [currentCompaniesPosition, setcurrentCompaniesPosition] = useState(0);
   const [hasmoreCompanies, sethasmoreCompanies] = useState(true);
   const [isSearching, setisSearching] = useState(false);
   const [isDocumentDialog, setisDocumentDialog] = useState(false);
   const [selectdexchnage, setselectdexchnage] = useState("");

   console.log(Companies);

   const controller = new AbortController();
   const { signal } = controller;


    useEffect(() => {
        dispatch(setheadermenuData({currentpath:'/financials', headerfootershow:true}));
        setIsFetching(true);
        getCountries().then(meta => {
            setCountries(meta)
            console.log(meta);
        }); 
        window.scrollTo(0, 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function changeCountry(country){
        setCompanies([])
        setselectedCountry(country);
        getCompaniesByCountry(country, 0, SearchText, signal).then(meta => {
            setCompanies(meta.data)
            console.log(meta);
        });
        if(country!="DFM"&&country!="ADX"){
            setselectdexchnage("");
        }
    }



    function fetchCompanies(){
        setisSearching(true);
        // companiesPaginationIndexed(currentCompaniesPosition).then(meta =>{ 
        companiesPaginationIndexed(selectedCountry, SearchText, currentCompaniesPosition).then(meta => {
            setCompanies([...Companies, ...meta.data]);
            setcurrentCompaniesPosition(currentCompaniesPosition+1);
            console.log("CP : "+currentCompaniesPosition);
            if(meta.metadata.total_pages==meta.metadata.current_page)
            sethasmoreCompanies(false);
            setisSearching(false);
            setIsFetching(false);
        });
    }
    

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!isFetching) return;
        fetchCompanies();
    }, [isFetching]);

    function handleScroll() {
        if(hasmoreCompanies&&(!isFetching)){  
            if (window.innerHeight + ((parseInt(document.documentElement.scrollTop)+5000)) < document.documentElement.offsetHeight || isFetching) return;
            setIsFetching(true);
        }
    }

    const handleSearch = (SearchValue) =>{
        setisSearching(true);
        // controller.abort();
        setTimeout(() => {
            controller.abort();
        }, 1000);
        setSearchText(SearchValue);
        setcurrentCompaniesPosition(0);
        getCompaniesByCountry(0, 0, SearchText, signal).then(meta => {
            if(SearchText!="")
            setCompanies(meta);
            else
            setCompanies(meta.data);
            setisSearching(false);
        });    
    }

    const addinsearch = (company) =>{
        if(SearchText!==""){
            let searchstr = `CompanyName✂${company.Country}✂${company.SymbolTicker}✂${company.image}✂${company.Company_Name}✂${company.id}`;
            insertSearchAPI(searchstr).then(meta =>{
                console.log(meta);
            })
        }
    }

    const handleBack = () =>{
        if(props.onClick===undefined)
        navigate(-1);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const todaydate = mm + ' ' + dd + ', ' + yyyy;

    return (
        <>
    
            <div style={{"minHeight":"90vh"}} className="container-fluid section_divider">
                <div className="container card section_divider">
                    <div className="row">
                        <div className="col-md-1">
                        <Button style={{"border":"none", "height": "30px"}} onClick={handleBack}><span className="back_btn_txt"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                        </div>
                    </div>
             
                    <div className="row section_divider">
                        <div className="col-md-12">
                        <label className='labelasheading'>Countries</label><br/>  
              <div className='contrieslist_div'> 
                        <Chip
                            onClick={()=>changeCountry(0)}
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
                            })
                            
                            )
                        }
                        </div>
                        </div>
                    </div>
                 {(selectedCountry=="UAE"||selectedCountry=="DFM"||selectedCountry=="ADX")?(   
                    <div className="row">
                        <div className="col">
                        <Chip
                            onClick={()=>{(selectdexchnage!="DFM")?changeCountry("DFM"):changeCountry("UAE"); setselectdexchnage((selectdexchnage!="DFM")?"DFM":""); }}
                            avatar={<Avatar alt="UAE" src={getFlag("UAE")} />}
                            label="DFM"
                            variant={(selectdexchnage=="DFM")?"":"outlined"}
                            />
                            <Chip
                            style={{"marginLeft":"10px"}}
                            onClick={()=>{(selectdexchnage!="ADX")?changeCountry("ADX"):changeCountry("UAE"); setselectdexchnage((selectdexchnage!="ADX")?"ADX":""); }}
                            avatar={<Avatar alt="UAE" src={getFlag("UAE")} />}
                            label="ADX"
                            variant={(selectdexchnage=="ADX")?"":"outlined"}
                            />
                        </div>
                    </div>
                 ):""}
                    <div className="row section_divider">
                        <div className="col-md-12">
                            <div className="row searchboxcompanypage" >
                                <div className="col-md-6">
                                    <label className='labelasheading'>Companies <span className='companylistingtxt'>(Total {Companies.length} listed companies {selectedCountry!=""?" in "+selectedCountry:""} as of {format(new Date(), 'MMM d, Y')})</span></label>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <div className='searchinputbox_homepage'>
                                        <img src="/assets/icons/search_icon_light.svg" />
                                        <input type="text" onChange={(e)=>handleSearch(e.target.value)} value={SearchText}  autoFocus={true} name="search" className="global_search_input" id="search" placeholder="Search" />
                                     </div>
                                    </div>
                                </div>
                            </div>
                      
                             <Grid container spacing={1}>
                               { 
                              ((Companies.length==0)&&(!isFetching&&!isSearching))?("" ):(
                                Companies.map(function (value, index, array) {
                                    return (
                               <Grid onClick={()=>{dispatch(setForumNewsModalData({visibility:true, details:value})); addinsearch(value)}}   key={index} item md={2} xs={6} height={260}>        
                                   <Companylistcard  CompanyImage ={value.image} GoToReports={GoToReports} GoToNews={GoToNews} CompanyName={value.Company_Name} CompanyId={value.id} />
                               </Grid>
                               )}
                               
                               )
                               )
                                }
                                {
                                (isFetching)?(Array.from({ length: 12 }, (x, i) => { return (
                                    <Grid key={i} item md={2} xs={6}>
                                        <Skeleton style={{"transform":"scale(1, 0.9)"}} height={100} />
                                        <Skeleton height={40} />
                                    </Grid> )
                                })):("")
                                }
                            </Grid>
                        </div>
                    </div>
                   </div>
            </div>
        </>
    );
}

export default Homepage;
