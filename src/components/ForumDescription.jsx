import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import Forumpost from './Forumpost';
import {timeSince, getForumComments} from '../API/Userapis';
import Chatlist from '../components/Chatlist';
import Commentinput from './Commentinput';
import Pollpost from './PollPost';
import { NavLink, Route, Router, Routes } from 'react-router-dom';

const Forumdescription = (props) => {
    const ForumData = props.forumalldata;
    
    const [isEditing, setisEditing] = useState(false);
    const [EditingText, setEditingText] = useState('');
    const [EditingCommentId, setEditingCommentId] = useState(0);

    const [isReplaying, setisReplaying] = useState(false);
    const [ReplayText, setReplayText] = useState('');
    const [ReplayCommentId, setReplayCommentId] = useState(0);

    const [isReply, setisReply] = useState(false);


    console.log(ForumData);
    const [ForumComments, setForumComments] = useState([]);
    const handleback = () =>{
        console.log("dd");
        props.setForumDetailId('');
    }

    useEffect(() => {
       getForumComments(ForumData.id).then(meta => {
           setForumComments(meta)
           console.log(meta);
       })
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [ForumData]);
    
    
    const handlermorereplies = (chatdata) =>{
        // alert(JSON.stringify(chatdata))
    }

    return (
        <>
            <div className="container">
                <div className="row" style={{"height":"60px"}}>
                <Button style={{"border":"none"}} onClick={handleback}
    className="backbutton_btn"><span className="back_btn_txt"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcset="/assets/icons/Dropdown.svg" /> Back</span></Button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        
                        {(ForumData.forum_type==="forum")?(<Forumpost setForumDetailId={ForumData.id} form_id={ForumData.id} username={ForumData.first_name+' '+ForumData.last_name} profile_img={ForumData.profile_pic} 
                            time={timeSince(new Date(ForumData.created))} content={ForumData.content} content_image={ForumData.content_image} 
                            url_link={"url"} total_messages={ForumData.total_comments} 
                            total_likes={ForumData.total_liked} total_dislikes={ForumData.total_disliked} 
                            total_shares={ForumData.share_count} 
                            liked={ForumData.liked} disliked={ForumData.disliked}/>
                                ):(<Pollpost  polldata={ForumData} setForumDetailId={ForumData.id} />)}   
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <label className='labelasheading'>Comments</label><br/> 
                    
                    {
                        (ForumComments.length >0)?
                        (ForumComments.map(function (value, index, array) {
                            return (
                            <div className="chatlistdivouter">    
                            <Chatlist key={index} forumId={ForumData.id} setisEditing={setisEditing} setEditingText={setEditingText} setEditingCommentId={setEditingCommentId} setisReplaying={setisReplaying} setReplayText={setReplayText} setReplayCommentId={setReplayCommentId} chatdata={value} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments}  />
                            {(value.in_reply)?((value.replies.length >0)?
                                (value.replies.map(function (replyvalue, index, array) {
                                    return (<div className='row'><div className="col-11 offset-1"><Chatlist key={index} forumId={ForumData.id} setisEditing={setisEditing} setEditingText={setEditingText} setEditingCommentId={setEditingCommentId} setisReplaying={setisReplaying} setReplayText={setReplayText} setReplayCommentId={setReplayCommentId} chatdata={replyvalue} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments}  />
                                   {(replyvalue.in_reply)?( (<div className='morerepliesdiv'><NavLink to="/forums/replies"><span className='morerepliestxt' onClick={()=>handlermorereplies(replyvalue)}>more replies</span></NavLink></div>)):""}
                                    </div></div>)
                                })):console.log("Zero Length")
                                ):console.log("No reply"+index)}
                            </div>)
                        })):""

                    }
                    <Commentinput isEditing={isEditing} setisEditing={setisEditing} setEditingText={setEditingText} EditingText={EditingText} EditingCommentId={EditingCommentId} isReplaying={isReplaying} setisReplaying={setisReplaying} setReplayText={setReplayText} ReplayText={ReplayText} ReplayCommentId={ReplayCommentId} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments} forumId={ForumData.id}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forumdescription;
