import React, {useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import { Card, CardMedia, CardContent, Typography, Link } from '@mui/material';
import {getRemainsVisits, timeSince} from '../API/Userapis';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showsharemodal } from '../reducers/ShareBtnModalReducer';
import {setnewssharedata} from '../reducers/NewsShareReducer';

const ForumNewsItem = (props) => {
const {image, title, description, created_at, url_link, size} = props;
const navigate = useNavigate();
const dispatch = useDispatch();
    
    const sharetoforum = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        dispatch(setnewssharedata({active:true, title : description, link : url_link, image : image}));
        navigate('/forums/addforum', true);
    }

    const showsharemodals = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        dispatch(showsharemodal(true));
    }

    return (
        <>
        <Grid className='newsForumItemBox'  item xs={size}>
        <a style={{"textDecoration":"none"}} href={url_link}>  
        <div className="newsForumItemIcons">
            <div className="newsForumItemIconsdIV">
                <Link className="newsForumItemIconsLink" href='/forums' onClick={(e)=>sharetoforum(e)}>
                            <img src="" alt="" srcSet="/assets/icons/sharetoforumicon.png" />
                </Link>
                <Link className="newsForumItemIconsLink" onClick={(e)=>showsharemodals(e)}>
                            <img src="/assets/icons/sharenewsicon.png" className="sharenewsicon" />
                </Link>    
            </div>
        </div>
        <Card>
            <div className="row">
                <div className="col-md-4 pr-0">
                <CardMedia
                    component="img"
                    height="100"
                    onError={e => { e.target.src = "/assets/icons/placeholder.png"; }}
                    image={image}
                    alt={title}>
                </CardMedia>  
                </div>
                <div className="col-md-8 pl-0">
                <CardContent style={{"height":"100px", "padding":"10px"}} >
                <Typography style={{"fontWeight":"400", "fontSize":"11px", "color":"#999"}}>
                {title}
                </Typography>
                <Typography style={{"textDecorationLine":"none", "height": "55px", "display": "-webkit-box", "WebkitLineClamp": "3", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "overflow": "hidden", "fontSize":"13px"}}>
                    {description}
                </Typography>
                <span style={{"float":"right", "fontSize":"10px", "color":"grey"}}>{timeSince(new Date(created_at))}</span>
                </CardContent> 
                </div>
                </div>
            </Card>    
            </a>
         </Grid>
        </>
    );
}

export default ForumNewsItem;
