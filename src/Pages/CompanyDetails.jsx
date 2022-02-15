import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {getCompanyYears, getCompanyDocuments, getSingleCompany, requestOpenCompanyApi} from '../API/Userapis';
import { Skeleton, Grid, Paper, Card, Chip, Divider, CardActionArea, IconButton, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFlag } from '../API/LocalStore';
import {getRemainsVisits} from '../API/Userapis';
import Documentdetailppopup from '../popup/DocumentDetailPPopup';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


const Companydetails = (props) => {
    let params = useParams();
    const company_id = params.id;
    const [CompanyYears, setCompanyYears] = useState([]);
    const [SelectedYear, setSelectedYear] = useState('');
    const [SelectedPeriod, setSelectedPeriod] = useState('annual');
    const [Companydocuments, setCompanydocuments] = useState([]);
    const [Company_country, setCompany_country] = useState('');
    const [Company_name, setCompany_name] = useState('');
    const [Company_image, setCompany_image] = useState('');
    const [hasSeenThisCompany, sethasSeenThisCompany] = useState(false);
    const [Remains_visits, setRemains_visits] = useState(0);
    const [isDetailModalShow, setisDetailModalShow] = useState(true);
    const [ModalDocumentTitle, setModalDocumentTitle] = useState('');
    const [ModalDocumentDetails, setModalDocumentDetails] = useState('');

    const GoToDocumentView = (ref_url) =>{
        requestOpenCompanyApi(company_id, 1);
        sethasSeenThisCompany(true);
        if(Remains_visits!==0){
        window.open(ref_url, '_blank');
        }
        else{
            alert("You have not any remaining counts to see this document.");
        }
    } 
    
    useEffect(() => {
        getCompanyYears(company_id).then(meta => {
            setCompanyYears(meta)
            setSelectedYear(meta[0].year);
            getCompanyDocuments(company_id, meta[0].year, SelectedPeriod).then(meta => {
                setCompanydocuments(meta)
            });
        });
        
        getRemainsVisits().then(meta =>{
            let visited_companies = meta.visited_companies;
            let sm_arr = visited_companies.filter((element, index, array)=>element===company_id);
            if(sm_arr.length>0){
                sethasSeenThisCompany(true);
            }
            if(meta.visit_data.max_companies===0){
                setRemains_visits(-1);
            }
            else{
                setRemains_visits(meta.visit_data.remaining_visits);
            }
            let remaining_visits = meta.visit_data.remaining_visits;
            if((remaining_visits>0)||(sm_arr.length>0)){
            // getCompanyYears(company_id).then(meta => {
            //     setCompanyYears(meta)
            //     setSelectedYear(meta[0].year);
            //     getCompanyDocuments(company_id, meta[0].year, SelectedPeriod).then(meta => {
            //         setCompanydocuments(meta)
            //     });
            // });
            }
            // else
            // alert("please upgrade plan to see company's documents.")
        });    

        getSingleCompany(company_id).then(meta =>{
            setCompany_name(meta.Company_Name);
            setCompany_image(meta.image);
            setCompany_country(meta.Country);
        })
           
    }, []);


   

    const setDocumentYear = (year) =>{
        setSelectedYear(year)
        getCompanyDocuments(company_id, year, SelectedPeriod).then(meta => {
            setCompanydocuments(meta)
        });
    }

    const setDocumentPeriod = (period) =>{
        setSelectedPeriod(period)
        getCompanyDocuments(company_id, SelectedYear, period).then(meta => {
            setCompanydocuments(meta)
        });
    }

    const documents = [{document_name :"Income Statement", document_image:"/assets/icons/IncomeStatement.png", info:"An income statement is a report that shows how much revenue a company earned over a specific time period (usually for a year or some portion of a year). An income statement also shows the costs and expenses associated with earning that revenue. The literal “bottom line” of the statement usually shows the company’s net earnings or losses. This tells you how much the company earned or lost over the period.Income statements also report earnings per share (or “EPS”). This calculation tells you how much money shareholders would receive if the company decided to distribute all of the net earnings for the period. (Companies almost never distribute all of their earnings. Usually they reinvest them in the business.)To understand how income statements are set up, think of them as a set of stairs. You start at the top with the total amount of sales made during the accounting period. Then you go down, one step at a time. At each step, you make a deduction for certain costs or other operating expenses associated with earning the revenue. At the bottom of the stairs, after deducting all of the expenses, you learn how much the company actually earned or lost during the accounting period. People often call this the bottom line."}, 
                        {document_name :"Balance Sheet", document_image:"/assets/icons/BalanceSheet.png", info:"A balance sheet provides detailed information about a company’s assets, liabilities and shareholders’ equity.Assets are things that a company owns that have value. This typically means they can either be sold or used by the company to make products or provide services that can be sold. Assets include physical property, such as plants, trucks, equipment and inventory. It also includes things that can’t be touched but nevertheless exist and have value, such as trademarks and patents. And cash itself is an asset. So are investments a company makes.Liabilities are amounts of money that a company owes to others. This can include all kinds of obligations, like money borrowed from a bank to launch a new product, rent for use of a building, money owed to suppliers for materials, payroll a company owes to its employees, environmental cleanup costs, or taxes owed to the government. Liabilities also include obligations to provide goods or services to customers in the future.Shareholders’ equity is sometimes called capital or net worth. It’s the money that would be left if a company sold all of its assets and paid off all of its liabilities. This leftover money belongs to the shareholders, or the owners, of the company."}, 
                        {document_name :"Equity Statement", document_image:"/assets/icons/EquityStatements.png", info: "The statement of changes in equity, sometimes called the “statement of changes in owners’ equity” or “statement of changes in shareholders’ equity,” primarily serves to report changes in the owners’ investment in the business over time. The basic components of owners’ equity are paid- in capital and retained earnings. Retained earnings include the cumulative amount of the company’s profits that have been retained in the company. In addition, non- controlling or minority interests and reserves that represent accumulated OCI items are included in equity. The latter items may be shown separately or included in retained earnings. Volkswagen includes reserves as components of retained earnings.The statement of changes in equity is organized to present, for each component of equity, the beginning balance, any increases during the period, any decreases during the period, and the ending balance. For paid- in capital, an example of an increase is a new issuance of equity and an example of a decrease is a repurchase of previously issued stock. For retained earnings, income (both net income as reported on the income statement and OCI) is the most common increase and a dividend payment is the most common decrease."}, 
                        {document_name :"Cash Flow Statement", document_image:"/assets/icons/CashFlow.png", info:"Cash flow statements report a company’s inflows and outflows of cash. This is important because a company needs to have enough cash on hand to pay its expenses and purchase assets. While an income statement can tell you whether a company made a profit, a cash flow statement can tell you whether the company generated cash.A cash flow statement shows changes over time rather than absolute dollar amounts at a point in time. It uses and reorders the information from a company’s balance sheet and income statement.The bottom line of the cash flow statement shows the net increase or decrease in cash for the period. Generally, cash flow statements are divided into three main parts. Each part reviews the cash flow from one of three types of activities: (1) operating activities; (2) investing activities; and (3) financing activities."}, 
                        {document_name :"Comprehensive Statement", document_image:"/assets/icons/ComprehensiveIncome.png", info:"The statement of comprehensive income is one of the five financial statements required in a complete set of financial statements for distribution outside of a corporation.The statement of comprehensive income covers the same period of time as the income statement and consists of two major sections:Net income (or net earnings) from the company's income statement Other comprehensive income, which consists of positive and/or negative amounts for foreign currency translation and hedges, and a few other items. The totals from each of the above sections are summed and are presented as comprehensive income.(If a company does not have any item that meets the criteria of other comprehensive income, the statement of comprehensive income is not required.)For a company with an item that is considered to be other comprehensive income, the statement of comprehensive income is usually a separate financial statement that is presented immediately following the income statement. (However, a company has the option to combine the income statement and the statement of comprehensive income into one continuous financial statement.)The amount of net income will cause an increase in the stockholders' equity account Retained Earnings, while a loss will cause a decrease.The amount of other comprehensive income will cause an increase in the stockholders' equity account Accumulated Other Comprehensive Income (while a negative amount will cause a decrease in Accumulated Other Comprehensive Income)."}, 
                        {document_name :"Notes", document_image:"/assets/icons/Notes.png", info:"Also referred to as footnotes. These provide additional information pertaining to a company's operations and financial position and are considered to be an integral part of the financial statements. The notes are required by the full disclosure principle."}, 
                        {document_name :"Financial Report", document_image:"/assets/icons/FinancialReport.png", info:"An annual report is a financial summary of a company’s activities during the year along with management’s analysis of the company’s current financial position and future plans. Annual reports are prepared at the end of the fiscal year for external users to gain financial information about the inner workings of the company and what management plans to do in the future."}, 
                        {document_name :"Annual Report", document_image:"/assets/icons/AnnualReports.png", info:"Download the Audited Financial Statements"}]

    function documentExists(documentName) {
        let isExist = Companydocuments.filter((e)=>{
            if(e.document_name==(documentName)){
                return true;
            }
        }) 
        if(isExist.length>0){
            return true;
        }    
        else{    
            return false;
        }            
      }

    const showDetailsPopUp = (document_name, event) =>{
        setisDetailModalShow(true);
        setModalDocumentTitle(document_name);
        let documentData = documents.filter((elem)=>elem.document_name==document_name);
        console.log(documentData[0]);
        setModalDocumentDetails(documentData[0].info);
        console.log(document_name);
    }

    function getdocumentLink(documentName){
        var data =  Companydocuments.filter((e)=>{
            if(e.document_name==(documentName)){
                return e;
            }
            }) 
        if(data.length > 0)    
        return data[0].document_link; 
        else
        return data.document_link;    
    }  


    const theme = createMuiTheme({
        overrides: {
          // Style sheet name
          MuiTouchRipple: {
            // Name of the rule
            child: {
              // Some CSS
              backgroundColor: "red"
            }
          }
        }
      });
      
      const navigate = useNavigate();
      const handleBack = () =>{
          navigate(-1);
      }  

    return (
        <>
          <Documentdetailppopup  Document_title={ModalDocumentTitle} Document_details={ModalDocumentDetails} isDetailModalShow={isDetailModalShow}/>
          <div className="container-fluid">
              <div className="container documentdetailsection">
              <div className="row">
                            <div className="col-md-1">
                            <Button style={{"border":"none", "height": "30px"}} onClick={handleBack}><span className="back_btn_txt"><img alt="Back" style={{"transform":"rotateZ(90deg)"}} srcSet="/assets/icons/Dropdown.svg" /> Back</span></Button>
                            </div>
                        </div>
             
                  <div className="row">
                      <div className="col-md-4">
                            <Card className="section_divider company_details_period_section">
                            <label className='labelasheading mt-3 ml-2'>Select Year</label><br/>   
                            <div className="yearSelectorDocument">
                                
                              {(CompanyYears.length==0)?(
                              <div className='d-flex'><Skeleton variant="rectangular"  width={70} style={{"borderRadius":"20px"}} height={30} /></div>
                             ):(CompanyYears.map(function (value, index, array) {
                                return (
                                <Chip
                                key={index}
                                onClick={()=>setDocumentYear(value.year)}
                                label={value.year}
                                variant="outlined"
                                variant={(SelectedYear==value.year)?"":"outlined"}
                                />)
                                }))
                            }  
                            </div>    
                             <Divider className='section_divider mt-3'/>   
                            <label className='labelasheading mt-3 ml-2'>Select Period</label><br/>
                            <div className="periodSelectorDocument">
                                <Chip
                                onClick={()=>setDocumentPeriod('annual')}
                                label="Annual"
                                variant={(SelectedPeriod=='annual')?"":"outlined"}
                                />
                                <Chip
                                onClick={()=>setDocumentPeriod('q1')}
                                label="1st Quarter"
                                variant={(SelectedPeriod=='q1')?"":"outlined"}
                                />
                                <Chip
                                onClick={()=>setDocumentPeriod('q2')}
                                label="2nd Quarter"
                                variant={(SelectedPeriod=='q2')?"":"outlined"}
                                />
                                <Chip
                                onClick={()=>setDocumentPeriod('q3')}
                                label="3rd Quarter"
                                variant={(SelectedPeriod=='q3')?"":"outlined"}
                                />
                                <Chip
                                onClick={()=>setDocumentPeriod('q4')}
                                label="4th Quarter"
                                variant={(SelectedPeriod=='q4')?"":"outlined"}
                                />
                            </div>
                            </Card>
                      </div>
                      <div className="col-md-8">
                        <Card className="section_divider company_details_document_section">
                        <div className="row company__country_div_details">
                            <div className="col-md-10">
                                <div className="company_details_company_div float-left row">
                                    <div className="col-md-2 col-2">
                                    <img src={Company_image}/>
                                    </div>
                                    <div className="col-md-10 col-10">
                                    <span className='tox_company_name'>
                                        {Company_name}
                                    </span>
                                    </div>
                                </div>  
                            </div>
                        <div className="col-md-2">
                                <div className="country_div_in_f_popup float-right">
                                <Chip
                                    style={{"border":"none"}}
                                    avatar={<Avatar alt={Company_country?Company_country[0]:"A"} src={getFlag(Company_country)} />}
                                    label={Company_country}
                                    variant="outlined"
                                />
                                </div>
                            </div>
                        </div>
                            <Grid container spacing={2}>
                        {documents.map(function (value, index, array) {
                            return (
                                <Grid item xs={6} md={3} key={index}>
                                 <CardActionArea > 
                                 <Paper className='document_type_card p-1' onClick={()=>documentExists(value.document_name)?GoToDocumentView(getdocumentLink(value.document_name)):false}>
                                  <div className='documentTypeCa4rdImage'>
                                    <img  src={value.document_image} alt="Cash Flow" srcSet={value.document_image} />
                                   </div>   
                                   <div  className='document_type_card_title'>
                                      {value.document_name}
                                   </div>
                                   {documentExists(value.document_name)?"":(<div className='noDocumentAvailableCard'>
                                     <span>   Not Available</span>
                                   </div>)}
                                   </Paper>
                                   <div className='companyDetailButtonBox'>
                                  <div className="com_details_lock_icon" aria-label="delete">
                                    <img src={hasSeenThisCompany?"/assets/icons/unlock.svg":"/assets/icons/lock.svg"} />
                                  </div>
                                  <div data-toggle="modal" data-target="#documentDetailPoppup" onClick={(event)=>showDetailsPopUp(value.document_name, event)} className="com_details_exclamatoy_icon" aria-label="delete">
                                    <img src="/assets/icons/exclamatoy.svg" />
                                  </div>
                                  </div>
                                  
                                  </CardActionArea> 
                                </Grid>
                                )
                            })}
                            </Grid>
                            
                            </Card>
                            
                      </div>
                  </div>
              </div>
          </div>
        </>
    );
}

export default Companydetails;
