import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, CardActions, Button, IconButton } from '@mui/material';
import React, {useState} from 'react';
import ShareIcon from '@mui/icons-material/Share';
import {setLikeUnlikeForum, setDislikeUnDislikeForum, setForumShares} from '../API/Userapis'

const Forumpost = (props) => {
    const {form_id,  forumalldata, username, profile_img, time, content, content_image, total_messages, total_likes, total_dislikes, total_shares, setForumDetailId} = props;
    const url_link = ((content.split("@")).length>1)?content.split("@")[1]:"";
    const content_txt = content.split("@")[0];
    const [Liked, setLiked] = useState(props.liked);
    const [Disliked, setDisliked] = useState(props.disliked);
    const [TotalLiked, setTotalLiked] = useState(total_likes);
    const [TotalDisliked, setTotalDisliked] = useState(total_dislikes);
    const [TotalShares, setTotalShares] = useState(total_shares);
    
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

        setLiked(Liked?false:true)
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
        console.log(forumalldata);
        setForumDetailId(forumalldata);
    }

    return (
        <>
        <Card className="forumpostcard">
           <div className="row">
            <div className="col-md-1">
                <Avatar className='forumpostitem_avatar'  alt={(username)?username[0]:''} src={profile_img} />
            </div>
            <div className="col-md-11">
            <CardContent  style={{"padding":"0", "paddingTop":"10px", "paddingLeft":"4px"}}>
                <Typography variant='h6'>{username}</Typography>
                <Typography style={{"color":"grey"}} variant='span'>{time}</Typography><br/>
                <Typography style={{"display": "-webkit-box", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "overflow": "hidden"}} variant='span'>{content_txt}</Typography>
                <Typography style={{"display": "-webkit-box", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "overflow": "hidden"}} variant='span'><a target="_black"  style={{"color":"rgb(80 185 242)"}} href={url_link}>{url_link}</a></Typography>
                
            </CardContent>  
            <CardMedia
                    className={!content_image ? 'd-none' : ''}
                    component="img"
                    height="300"
                    onError={e => { e.target.src = "/assets/icons/placeholder.png"; }}
                    image={content_image}
                    alt="Image not available"
                />  
            <CardActions>
                <div className="forumactionbtns">
                <IconButton onClick={handleComment}>
                    <img style={{"height":"25px"}} srcSet='./assets/icons/bubble.svg'/>
                </IconButton>{total_messages}</div>
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

export default Forumpost;
