import { Avatar, Card, CardContent,  CardActionArea, CardHeader, CardMedia, Typography, CardActions, Button, IconButton } from '@mui/material';
import React, {useState, useEffect} from 'react';
import ShareIcon from '@mui/icons-material/Share';
import {setLikeUnlikeForum, setDislikeUnDislikeForum, setForumShares, timeSince, votePollApi} from '../API/Userapis';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const Pollpost = (props) => {
    
    const {setForumDetailId, polldata} = props;
    console.log(polldata);
    const {id, forumalldata,  first_name, last_name, options, profile_img, liked, disliked, share_count,  total_comments, content, content_image, total_messages, total_liked, total_disliked, total_shares, created} = polldata;
    const form_id = id;
    const time= timeSince(new Date(created));
    const username = first_name+last_name;
    const url_link = ((content.split("@")).length>1)?content.split("@")[1]:"";
    const content_txt = content.split("@")[0];
    const [Liked, setLiked] = useState(liked);
    const [Disliked, setDisliked] = useState(disliked);
    const [TotalLiked, setTotalLiked] = useState(total_liked);
    const [TotalDisliked, setTotalDisliked] = useState(total_disliked);
    const [TotalShares, setTotalShares] = useState(share_count);
    const [Option1Voters, setOption1Voters] = useState(0);
    const [Option2Voters, setOption2Voters] = useState(0);
    const [Option3Voters, setOption3Voters] = useState(0);
    var Option1CVoters = 0;
    var Option2CVoters = 0;
    var Option3CVoters = 0;
    const [PollResult, setPollResult] = useState(false);
    
    useEffect(() => {
        Option1CVoters = parseInt(options.total_option1_voters);
        Option2CVoters = parseInt(options.total_option2_voters);
        Option3CVoters = parseInt(options.total_option3_voters);

        setOption1Voters(parseInt(options.percentage_option1_voters));
        setOption2Voters(parseInt(options.percentange_option2_voters));
        setOption3Voters(parseInt(options.percentage_option3_voters));

    }, []);

    const handleLike = () =>{
        if(Liked==false){
            setDisliked(false);
            setTotalLiked(parseInt(TotalLiked)+1)
        } 
        else{
            setTotalLiked(parseInt(TotalLiked)-1)
        }

        if(Disliked){
            setTotalDisliked(parseInt(TotalDisliked)-1)
        }

        setLiked(Liked?false:true);
        setLikeUnlikeForum(form_id)
    }

    const handleDislike = () =>{
        if(Disliked==false){
            setLiked(false);
            setTotalDisliked(parseInt(TotalDisliked)+1)
        } 
        else{
            setTotalDisliked(parseInt(TotalDisliked)-1)
        }

        if(Liked){
            setTotalLiked(parseInt(TotalLiked)-1)
        }
        setDisliked(Disliked?false:true)
        setDislikeUnDislikeForum(form_id)
    }

    const handleShare = () =>{
        setTotalShares(parseInt(TotalShares)+1);
        setForumShares(form_id);
    }


    const handleComment = () =>{
        console.log(form_id);
        setForumDetailId(polldata);
    }

    const sendPollVote = (option) =>{
        votePollApi(form_id, option).then(meta=>{
            if(meta.status){
                switch (option) {
                    case 1:{
                        console.log(1);
                        Option1CVoters++;
                        calculateVoters();
                        break;
                    }
                    case 2:{
                        console.log(2);
                        Option2CVoters++;
                        calculateVoters();
                        break;
                    }
                    case 3:{
                        console.log(3);
                        Option3CVoters++;
                        calculateVoters();
                        break;    
                    }
                    default:
                        break;
                }

              
            }
            else{
                alert(meta.message);
            }

        
        })
    }

    const calculateVoters = () =>{
        let total_voters = Option1CVoters+Option2CVoters+Option3CVoters;
        console.log(total_voters+" "+Option1CVoters+"  "+(Option1CVoters>0?(Option1CVoters*100/total_voters):0));
        console.log(total_voters+" "+Option2CVoters+" "+(Option2CVoters>0?(Option2CVoters*100/total_voters):0));
        console.log(total_voters+" "+Option3CVoters+" "+(Option3CVoters>0?(Option3CVoters*100/total_voters):0));
        setOption1Voters(Option1CVoters>0?(Option1CVoters*100/total_voters):0);
        setOption2Voters(Option2CVoters>0?(Option2CVoters*100/total_voters):0);
        setOption3Voters(Option3CVoters>0?(Option3CVoters*100/total_voters):0);
    }

    return (
        <>
        <Card>
           <div className="row">
            <div className="col-md-1">
                <Avatar className='forumpostitem_avatar'  alt={(username)?username[0]:''} src={profile_img} />
            </div>
            <div className="col-md-11">
            <CardContent style={{"padding":"0", "paddingTop":"10px", "paddingLeft":"4px"}}>
                <Typography variant='h6'>{username}</Typography>
                <Typography style={{"color":"grey", "fontSize":"12px"}} variant='span'>{time}</Typography><br/>
                <Typography style={{"display": "-webkit-box", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "overflow": "hidden"}} variant='span'>{content_txt}</Typography>
                <Typography style={{"display": "-webkit-box", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "overflow": "hidden"}} variant='span'><a target="_black"  style={{"color":"rgb(80 185 242)"}} href={url_link}>{url_link}</a></Typography>
                
            </CardContent> 
            <CardContent height="300"> 
              <div className="container">
                  <div className="row">
                        <div className="pollprogressbar">
                        <CardActionArea onClick={()=>sendPollVote(1)} style={{"height":"100%", "borderRadius":"10px"}}>
                                 <span className='poloptionpercentage1'><b>{options.option1}</b></span>   
                                 <span className='poloptionpercentage2'><b>{(Option1Voters+"%")}</b></span>   
                            <div className="pollprogress" style={{"--mywidth":(Option1Voters+"%")}}>
                            </div>
                            </CardActionArea>
                        </div>
                        
                  </div> 
                  <div className="row">
                      <div className="pollprogressbar">
                      <CardActionArea onClick={()=>sendPollVote(2)} style={{"height":"100%", "borderRadius":"10px"}}>
                            <span className='poloptionpercentage1'><b>{options.option2}</b></span>   
                            <span className='poloptionpercentage2'><b>{(Option2Voters+"%")}</b></span>
                            <div className="pollprogress" style={{"--mywidth":(Option2Voters+"%")}}>
                        </div>
                    </CardActionArea>
                    </div>
                  </div>
                  <div className="row">
                    
                        <div className="pollprogressbar">
                        <CardActionArea onClick={()=>sendPollVote(3)} style={{"height":"100%", "borderRadius":"10px"}}>
                            <span className='poloptionpercentage1'><b>{options.option3}</b></span>   
                            <span className='poloptionpercentage2'><b>{(Option3Voters+"%")}</b></span>
                            <div className="pollprogress" style={{"--mywidth":(Option3Voters+"%")}}>
                            </div>
                            </CardActionArea>
                        </div>
                        
                  </div>
              </div>
            </CardContent> 
            <CardActions>
                <div className="forumactionbtns">
                <IconButton onClick={handleComment}>
                    <img style={{"height":"25px"}} srcSet='./assets/icons/bubble.svg'/>
                </IconButton>{total_comments}</div>
                <div className="forumactionbtns">
                <IconButton onClick={handleLike}>
                    {(Liked)?<img style={{"height":"25px"}} srcSet='./assets/icons/Thumbup_fill.svg'/>
                            :<img style={{"height":"25px"}} srcSet='./assets/icons/Thumbsup.svg'/>}
                </IconButton>{TotalLiked}</div>
                <div className="forumactionbtns">
                <IconButton onClick={handleDislike}>
                    {(Disliked)?<img style={{"height":"25px"}} srcSet='./assets/icons/ThumbsDown_fill.svg'/>
                            :<img style={{"height":"25px"}} srcSet='./assets/icons/thumbdown.svg'/>}
                </IconButton>{TotalDisliked}</div>
                <div className="forumactionbtns">
                <IconButton onClick={handleShare}>
                    <ShareIcon style={{fill: "#87CDF3"}}/>
                </IconButton>{TotalShares}</div>
            </CardActions>  
            </div>
            </div>     
        </Card>
        </>
    );
}

export default Pollpost;
