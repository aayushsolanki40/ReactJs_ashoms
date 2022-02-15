import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import Forumpost from './Forumpost';
import {timeSince, getForumComments} from '../API/Userapis';
import Chatlist from '../components/Chatlist';
import Commentinput from './Commentinput';
import Pollpost from './PollPost';

const Forumdescription = (props) => {
    const ForumData = props.forumalldata;
 
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

    const [isEditing, setisEditing] = useState(false);
    const [EditingText, setEditingText] = useState('');
    const [EditingCommentId, setEditingCommentId] = useState(0);

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

                            return (<Chatlist key={index} forumId={ForumData.id} setisEditing={setisEditing} setEditingText={setEditingText} setEditingCommentId={setEditingCommentId} chatdata={value} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments}  />)
                        })):""

                    }

                    <Commentinput isEditing={isEditing} setisEditing={setisEditing} setEditingText={setEditingText} EditingText={EditingText} EditingCommentId={EditingCommentId} ForumComments={ForumComments} ForumData={ForumData} setForumComments={setForumComments} forumId={ForumData.id}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forumdescription;
