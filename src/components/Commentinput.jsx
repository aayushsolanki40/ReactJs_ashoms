import { Avatar, IconButton  } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createCommentApi, getForumComments, getUserdata, makeReplayAPI, updateCommentApi } from '../API/Userapis';

const Commentinput = ({forumId, setEditingText, setisEditing, ForumData, setForumComments, isEditing, EditingText, EditingCommentId, isReplaying, setisReplaying, setReplayText, ReplayText, ReplayCommentId}) => {

const [Comment, setComment] = useState('');
const [Myprofile, setMyprofile] = useState('');  

const refreshForumData = () =>{
    getForumComments(forumId).then(meta => {
        ForumData.total_comments = meta.length;
        setForumComments(meta)
    })
}

console.log("d : "+forumId);
const makeComment = (e) => {
    e.preventDefault();
    if(Comment=='')
    return false;
    if(isEditing)
    updateCommentApi(forumId, Comment, EditingCommentId).then(meta =>{
        setisEditing(false);
        setComment("");
        refreshForumData();
    })
    else if(isReplaying)
    makeReplayAPI(ReplayCommentId, Comment).then(meta =>{
        setisReplaying(false);
        setComment("");
        refreshForumData();
    })
    else
    createCommentApi(forumId, Comment).then(meta =>{
        setComment("");
        refreshForumData();
    })
}

useEffect(()=>{
    console.log("is Editing : "+EditingCommentId);
    if(isEditing){
       setComment(EditingText);
   }
   if(isReplaying){
    setComment(ReplayText);
    }
})

useEffect(() => {
     getUserdata().then(meta =>{
        setMyprofile(meta.profile_pic);
     })
}, []);

    return (
      <div className='addcommentcontainer'>  
        <div className="row">
            <div className="col-1">
                    <Avatar
                      alt="A"
                      src={Myprofile}
                       sx={{ width: 50, height: 50 }}
                    />
            </div>
            <div className="col-11">
            <form onSubmit={makeComment}>
                <div className="addcommentinput">
                    <div className="row comment_input_box">
                      
                        <div className="col-10"> 
                            <input type="text" value={Comment} onChange={(e)=>{ if(isEditing) setEditingText(e.target.value); if(isReplaying) setReplayText(e.target.value);  setComment(e.target.value);}} className="commentinput" placeholder="Add Comment Here....." />
                        </div>
                        <div className="col-2 commentInput_icon_box">
                        <IconButton type="submit" color="primary" onClick={(e)=>makeComment(e)} className='commentInput_post_btn' component="span">
                             <img className='commentInput_icon' srcSet='/assets/icons/email.svg' />
                        </IconButton>
                        </div>
                        
                    </div>
                    
                </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Commentinput;
