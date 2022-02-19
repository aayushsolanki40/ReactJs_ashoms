import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import { getRemainsVisits, requestOpenCompanyApi } from '../API/Userapis';
import { useNavigate, Link } from 'react-router-dom';
import { getFlag } from '../API/LocalStore';
import { Alert, Avatar, Chip } from '@mui/material';
import 'bootstrap';

const ForumNewsModal = (props) => {
    const navigate = useNavigate();
    const c_data = props.companyData;
    const Company_name = c_data.Company_Name;
    const Company_image = c_data.image;
    const Company_id = c_data.id;
    const [errorMessage, seterrorMessage] = useState('');
    const Company_country = c_data.Country;
    const Delisted_date = c_data.DelistingDate;
    const [Remaining_count, setRemaining_count] = useState('');
    const [isSubscribed, setisSubscribed] = useState(false);
    const [userCanVisit, setuserCanVisit] = useState(false);
 
    useEffect(() => {
        getRemainsVisits().then(meta =>{
            console.log(meta);
            if(meta.status){
                let visited_data = meta.visit_data;
                if(visited_data.max_companies!=="0")
                setRemaining_count((visited_data.remaining_visits)+' out of  '+(visited_data.max_companies));
                else
                setRemaining_count("Unlimited");
                setisSubscribed(true);
            }
            else{
                setisSubscribed(setRemaining_count);
                setisSubscribed(false);
            }
        });

        requestOpenCompanyApi(Company_id).then(meta => {
            setuserCanVisit(meta.status);
        })
    }, [Company_name]);

    //Navigate to Financial Report
    const n_to_Financial_Report = (e) => {
        e.preventDefault();
        if(userCanVisit){
        props.onHide();
        navigate("/company/"+Company_id);
        }
        else{
            if(isSubscribed)
            alert("Your plan quata exceed. Please upgrade plan.")
            else
            alert("You have no any active plan. Please select any plan.")
        }
    }

    const n_to_Company_news = (e) => {
        e.preventDefault();
        navigate("/companynews/"+Company_id);
        props.onHide();
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
        <div className="container">
        <div className="row">
            <div className="col-1">
                <Chip
                    style={{"border":"none"}}
                    avatar={<Avatar alt={Company_country?Company_country[0]:"A"} src={getFlag(Company_country)} />}
                    label={Company_country}
                    variant="outlined"
                />
            </div>
            <div className="col-10">
                <div className="row">
                    <div className="col-md-12 popup_company_box">
                        <img alt="" src={Company_image} srcSet={Company_image} />
                        <span>{Company_name}</span>
                    </div>
                </div>
            </div>
            <div className="col-1">
                <button type="button" onClick={props.onHide} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>             
        </div>
        </div>
        </Modal.Header>
        <Modal.Body>
        

        <div className="row" style={{"display": "flex", "justifyContent": "space-evenly"}}>
            <a  href="about:blank"  className="nolink box_inner company_pop_r" onClick={(e)=>n_to_Financial_Report(e)}>
                <div className="round_company_circle">
                    <img alt="" srcSet="/assets/icons/FinancialStatement.png" />
                </div>
                <span>Financials Statements</span>
            </a>
            <a  href="about:blank"  className="nolink box_inner company_pop_r" onClick={(e)=>n_to_Company_news(e)}>
                <div className="round_company_circle">
                    <img alt="" srcSet="/assets/icons/newsIcon.png" />
                </div>
                <span>News</span>
            </a>
            </div>
                <div className="row">
                    <div className="col-md-12">
                        <Alert className={(errorMessage!='')?'':'d-none'} severity="error">{errorMessage}</Alert>
                        <div className="country_div_in_f_popup d-flex justify-content-end">
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <div className="row">
            <div className="col-md-12 company_pop_r delisted_txt">
                    {Delisted_date?(<span>Delisted on <b>{Delisted_date}</b></span>):""}
                    {(isSubscribed)?(<span>Remaining Count : {Remaining_count}</span>):(<span style={{"color":"red"}}>Your did not subscribed.</span>)}
                </div>
            </div>
            </Modal.Footer>
      </Modal>
    );
}

export default ForumNewsModal;
