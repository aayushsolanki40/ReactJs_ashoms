import React, {useEffect, useState} from 'react';
import Forumpost from '../components/Forumpost';
import Newsonforum from '../components/NewsOnForum';
import {timeSince, getForums} from '../API/Userapis';
import Forumdescription from '../components/ForumDescription';
import Pollpost from '../components/PollPost';
import { CardActionArea } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Addforumlayout from '../components/AddForumLayout';
import { Button } from '@mui/material';

const Forumpage = () => {

    const [ForumDetailId, setForumDetailId] = useState('');
    const [IsAddIconDisplay, setIsAddIconDisplay] = useState(true);
    const [ForumSearchText, setForumSearchText] = useState('');
    const [Forums, setForums] = useState([]);
    const [ForumAvailable, setForumAvailable] = useState([]);
    // alert(Intl.DateTimeFormat().resolvedOptions().timeZone + " " + (new Date().getTimezoneOffset()/60))
    var offsetTimeHours = new Date().getTimezoneOffset() / 60;
    useEffect(() => {
        getForums().then((data)=>{
                console.log(data);
                setForums(data);
                setForumAvailable(data);
        })    
    }, []);
    
    const Navigate = useNavigate();
    const url_path = window.location.pathname;
    const url_bud = url_path.split('/')[2];
    console.log("F : "+url_path.split('/')[2]);

    

    const addforumhandlebtn = () =>{
        window.scrollTo(0, 0);
        Navigate('/forums/addforum');
    }

    window.addEventListener('scroll', handleScroll);
    
    const handleForumSearch = (searchvalue) =>{
        setForumSearchText(searchvalue);
        if(searchvalue===''){
            setForums(ForumAvailable);
        }
        else{
            let Filters = ForumAvailable.filter((meta)=>{
                return ((((meta.content.toLowerCase()).includes(searchvalue.toLowerCase())))||((((meta.first_name+" "+meta.last_name).toLowerCase()).includes(searchvalue.toLowerCase()))))?meta:false;
            });
            setForums(Filters);
        }

    }

    function handleScroll() { 
        if (window.innerHeight + ((parseInt(document.documentElement.scrollTop))+200) < document.documentElement.offsetHeight){
            if(IsAddIconDisplay!==true) setIsAddIconDisplay(true);
        }
        else{
            if(IsAddIconDisplay===true) setIsAddIconDisplay(false);
        }
    }

    const navigate = useNavigate();
    const handleBack = () =>{
        navigate(-1);
    }

    return (
        <>
        
          <div style={{"minHeight":"90vh"}} className="container-fluid forum_container_fluid">
              <div className="container">
              
                  <div className="row">
                      
                      <div className="col-md-7 card section_divider">
                      {(url_bud!=='addforum')?(<div className="row">
                            <CardActionArea onClick={addforumhandlebtn} className="addforumbtn">
                                <img srcSet="/assets/icons/addforumbtn.svg"/>
                            </CardActionArea>
                       </div>):("")}    
                        {
                        (url_bud=='addforum')?(<Addforumlayout/>):    
                        ((ForumDetailId=='')?
                        (<> 
                        <div className="row">
                            <div className="col-md-1">
                            <Button style={{"border":"none", "height": "30px"}} onClick={handleBack}><span className="back_btn_txt"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                            </div>
                        </div>
             
                        <div className='row search_input_box_ForumPage'>
                            <div className="col-2 col-md-1">
                                <img className='search_icon_r' alt="" srcSet="/assets/icons/search_icon_light.svg" />
                            </div>
                            <div className="col-10 col-md-11">
                                <input onChange={(e)=>handleForumSearch(e.target.value)} value={ForumSearchText} className='search_input_ForumPage ' placeholder='Search' />
                            </div>
                        </div>
                        {Forums.map(function (value, index, array) {
                            console.log(value.forum_type==="forum");
                            return (
                                (value.forum_type==="forum")?(<Forumpost key={index} setForumDetailId={setForumDetailId} forumalldata={value} form_id={value.id} username={value.first_name+' '+value.last_name} profile_img={value.posted_by_profile} 
                                    time={timeSince(new Date(value.created).setTime(new Date(value.created).getTime() + ((new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000)))} content={value.content} content_image={value.content_image}
                                    url_link={"url"} total_messages={value.total_comments} 
                                    total_likes={value.total_liked} total_dislikes={value.total_disliked} 
                                    total_shares={value.share_count} 
                                    liked={value.liked} disliked={value.disliked} />
                                ):(<Pollpost key={index} polldata={value} setForumDetailId={setForumDetailId} />))
                            })}</>):<Forumdescription  forumalldata={ForumDetailId} setForumDetailId={setForumDetailId} />)
                        }  
                            
                            
                      </div>
                      <div className="col-md-5 pl-4 news_section_in_forum section_divider">
                          <div className='card' >
                            <Newsonforum key={1} />
                            </div>
                      </div>
                  </div>
              </div>
          </div>
        </>
    );
}

export default Forumpage;
