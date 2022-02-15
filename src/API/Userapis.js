import axios from 'axios';
import { getUserToken } from './LocalStore';

let token = getUserToken();
const base_url = "https://testnet.ashom.app/";

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " year ago";
        else
            return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " month ago";
        else
            return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " day ago";
        else
            return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " hour ago";
        else
            return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " minute ago";
        else
            return Math.floor(interval) + " minutes ago";
    }
    if (interval < 2)
        return ((Math.floor(seconds) < 0) ? 0 : (Math.floor(seconds))) + " second ago";
    else
        return Math.floor(seconds) + " seconds ago";
}


function signupAPI(first_name, last_name, countryCode, email, password, login_type, phone, social_id, profile_pic = "") {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append('first_name', first_name);
        bodyFormData.append('last_name', last_name);
        bodyFormData.append('device_id', 'NoDeviceId');
        bodyFormData.append('country_code', countryCode);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        bodyFormData.append('login_type', login_type);
        bodyFormData.append('mobile', phone);
        bodyFormData.append('app_version', 'Web');
        bodyFormData.append('social_id', social_id);
        bodyFormData.append('profile_pic', profile_pic);

        axios({
                method: "post",
                url: base_url + "api/webservice/user",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data)
            })
            .catch(function(error) {
                resolve(error.response.data)
            })
    })
}


//https://ashom.app/api/webservice/updateuser
// token, first_name, last_name, email, mobile (<--mandatory all), profile_pic (optional) 
function updateuserapi(first_name, last_name, email, mobile, profile_pic) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("first_name", first_name);
        bodyFormData.append("last_name", last_name);
        bodyFormData.append("email", email);
        bodyFormData.append("mobile", mobile);
        bodyFormData.append("profile_pic", profile_pic);

        axios({
                method: "post",
                url: base_url + "api/webservice/updateuser/",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}


function verifyOtp(mobile = '', otp = 0) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/verifyotp/" + mobile + '/' + otp,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            })
    })
}

// https://ashom.app/api/webservice/resendotp/{mobile}
function resendOTP(mobile = '') {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/resendotp/" + mobile,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) { resolve(error); })
    })
}

function getUserdata() {
    let var_token = getUserToken();
    console.log("ddd : " + var_token);
    var bodyFormData = new FormData();
    bodyFormData.append("token", var_token)
    return new Promise(resolve => {
        axios({
                method: "post",
                url: base_url + "api/webservice/userdata",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data.userdata);
            })
            .catch(function(error) {
                resolve(error);
            });
    })
}

function getUserdataByToken(var_token) {
    var bodyFormData = new FormData();
    bodyFormData.append("token", var_token)
    return new Promise(resolve => {
        axios({
                method: "post",
                url: base_url + "api/webservice/userdata",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}


function getCountries() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/countries",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

function allcompaniesApi() {
    return new Promise(resolve => {
        fetch(base_url + "api/webservice/companies", {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json()) // second step
            .then(data => {
                resolve(data);
            })
            .catch(error => console.error(error))
    })
}



// https://ashom.app/api/webservice/companies/{country_name}

function getCompaniesByCountry(country, page, search, controller) {
    page++;
    if (search == "")
        search = 0;
    else
        page = 0;
    return new Promise(resolve => {
        fetch(base_url + "api/webservice/companies/" + country + "/" + search + "/" + page, {
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller
            }) // first step
            .then(response => response.json()) // second step
            .then(data => {
                resolve(data);
            })
            .catch(error => console.error("Cancelled : " + search))
            // axios({
            //         method: "get",
            //         url: base_url + "api/webservice/companies/" + country + "/" + search + "/" + page,
            //         headers: { "Content-Type": "application/json" },
            //     })
            //     .then(function(response) {
            //         resolve(response.data);
            //     })
            //     .catch(function(error) {

        //     });
    })
}
// https://ashom.app/api/webservice/getyears/{company_id}
function getCompanyYears(CompanyId = 0) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/getyears/" + CompanyId,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/documents/{company_id}/{year}/{period}
function getCompanyDocuments(CompanyId = 0, year = '', period = '') {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/documents/" + CompanyId + '/' + year + '/' + period,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            }).catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/financialapi
function getFinancialNews(page = 0, country = '', company_name = '') {
    if (country === '' && company_name === '')
        var fetch_url = base_url + "api/webservice/financialapi/" + page;
    else if (country != '' && company_name === '')
        var fetch_url = base_url + "api/webservice/financialapi/" + page + '/' + country;
    else if (country != '' && company_name != '')
        var fetch_url = base_url + "api/webservice/financialapi/" + page + '/' + country + '/' + company_name;

    return new Promise(resolve => {
        axios({
                method: "get",
                url: fetch_url,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/financialapi2
function getFinancialNews2(page = 0, dataSize = 0, country = '') {
    if (country != '')
        var fetch_url = base_url + "api/webservice/financialapi2/" + page + '/' + dataSize + '/' + country;
    else
        var fetch_url = base_url + "api/webservice/financialapi2/" + page + '/' + dataSize;

    return new Promise(resolve => {
        axios({
                method: "get",
                url: fetch_url,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}


// https://ashom.app/api/webservice/likeorunlike
function getFinancialNewsPost(page, countryname, companyname, search) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("page", page);
        bodyFormData.append("countryname", countryname);
        bodyFormData.append("companyname", companyname);
        bodyFormData.append("search", search);

        axios({
                method: "post",
                url: base_url + "api/webservice/financialapi/",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

function getForums() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/forum/" + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/likeorunlike
function setLikeUnlikeForum(forum_id) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("forum_id", forum_id);

        axios({
                method: "post",
                url: base_url + "api/webservice/likeorunlike/",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/dislikeorundislike
function setDislikeUnDislikeForum(forum_id) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("forum_id", forum_id);

        axios({
                method: "post",
                url: base_url + "api/webservice/dislikeorundislike",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/shareproject/{forum_id}
function setForumShares(forum_id) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/shareproject/" + forum_id,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/changepassword
// post: token, old_password, new_password, confirm_password
function requestChangePassword(old_password, new_password, confirm_password) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("old_password", old_password);
        bodyFormData.append("new_password", new_password);
        bodyFormData.append("confirm_password", confirm_password);

        axios({
                method: "post",
                url: base_url + "api/webservice/changepassword",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                resolve(error);
            });
    })
}

// https://ashom.app/api/webservice/forgetpassword
// post : email
function requestForgetPassword(email) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        axios({
                method: "post",
                url: base_url + "api/webservice/forgetpassword",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                resolve(error);
            });
    })
}

//https://ashom.app/api/webservice/comments/{forum_id}/{token}
function getForumComments(forum_id) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/comments/" + forum_id + '/' + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/remainvisits?token=085b68dc10c4a950b8e4c1e068c4180d
function getRemainsVisits() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/remainvisits?token=" + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/subscription
//POST : token, expire_date (YYYY-MM-DD)  , subscription_type, amount

function requestSubscribe(subscription_type, subscription_amount, expiry_date) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("expire_date", expiry_date);
        bodyFormData.append("subscription_type", subscription_type);
        bodyFormData.append("amount", subscription_amount);

        axios({
                method: "post",
                url: base_url + "api/webservice/subscription",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

//https://ashom.app/api/webservice/opencompany
//POST : token, company_id, is_view

function requestOpenCompanyApi(company_id, is_view = 0) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("company_id", company_id);
        bodyFormData.append("is_view", is_view);

        axios({
                method: "post",
                url: base_url + "api/webservice/opencompany",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

//https://ashom.app/api/webservice/forgetpassword
//POST : email
function requestForgotPassword(email) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);

        axios({
                method: "post",
                url: base_url + "api/webservice/forgetpassword",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://www.ashom.app/api/webservice/contactus
//email, name, subject, message (All Fields Required)
function requestContactUs(email, name, subject, message) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        bodyFormData.append("name", name);
        bodyFormData.append("subject", subject);
        bodyFormData.append("message", message);

        axios({
                method: "post",
                url: base_url + "api/webservice/contactus",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

//https://ashom.app/api/webservice/getSingleCompany
function getSingleCompany(CompanyId) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/singlecompany/" + CompanyId,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/privacy_policy
function getPrivacyPolicy() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/privacy_policy",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data.description);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/termsncondition
function getTermsncondition() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/termsnconditions",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data.description);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/aboutus
function getAboutus() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/aboutus",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/comment
// token, forum_id, comment

function createCommentApi(forum_id, comment) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("forum_id", forum_id);
        bodyFormData.append("comment", comment);
        axios({
                method: "post",
                url: base_url + "api/webservice/comment",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

function updateCommentApi(forum_id, comment, comment_id) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("forum_id", forum_id);
        bodyFormData.append("comment", comment);
        bodyFormData.append("comment_id", comment_id);
        axios({
                method: "post",
                url: base_url + "api/webservice/comment",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/deletecomment/{comment_or_reply_id}
function deleteCommentApi(comment_id) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/deletecomment/" + comment_id,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/forum
//POST : token, content, content_image
function postForumApi(content, content_image) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("content", content);
        bodyFormData.append("content_image", content_image);
        axios({
                method: "post",
                url: base_url + "api/webservice/forum",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/postpoll
// token, title, option1, option2, option3, validity(: All Fields are required and validity must be in numbers eg : 1day : 1)
function postpollApi(title, option1, option2, option3, validity) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("title", title);
        bodyFormData.append("option1", option1);
        bodyFormData.append("option2", option2);
        bodyFormData.append("option3", option3);
        bodyFormData.append("validity", validity);
        axios({
                method: "post",
                url: base_url + "api/webservice/postpoll",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}


function getLinkedinAccessToken(code, redirect_uri) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("code", code);
        bodyFormData.append("redirect", redirect_uri);
        axios({
                method: "post",
                url: base_url + "api/webservice/linkedInProfile",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                console.log(error.response.data);
            });
    })
}


function getLikedUserName(accesstoken) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: "https://api.linkedin.com/v2/me",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accesstoken },
            })
            .then(function(response) {
                console.log(response.data);
                let metadata = response.data;
                var userdata = { "firstName": metadata.firstName.localized.en_US, "lastName": metadata.lastName.localized.en_US }
                resolve(userdata);
            })
            .catch(function(error) {

            });
    })
}

function getLikedUserEmail(accesstoken) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accesstoken },
            })
            .then(function(response) {
                console.log(response.data);
                let metadata = response.data.elements[0]["handle~"].emailAddress;
                var userdata = { "firstName": metadata.firstName.localized.en_US, "lastName": metadata.lastName.localized.en_US }
                resolve(userdata);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/sendvote
//Post : token, poll_id, selected_option  (Selected Option Must be only 1, 2, 3) All Fields are required
function votePollApi(poll_id, selected_option) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("poll_id", poll_id);
        bodyFormData.append("selected_option", selected_option);
        axios({
                method: "post",
                url: base_url + "api/webservice/sendvote",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}
//https://ashom.app/api/webservice/reply
//POST : token, comment_id, comment
function makeReplayAPI(comment_id, comment) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("comment_id", comment_id);
        bodyFormData.append("comment", comment);
        axios({
                method: "post",
                url: base_url + "api/webservice/reply",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

//https://ashom.app/api/webservice/comment
//POST : token, forum_id, comment




export {
    getLinkedinAccessToken,
    getLikedUserName,
    getLikedUserEmail,
    timeSince,
    signupAPI,
    updateuserapi,
    verifyOtp,
    resendOTP,
    getUserdata,
    getCountries,
    allcompaniesApi,
    getCompaniesByCountry,
    getCompanyYears,
    getCompanyDocuments,
    getFinancialNews,
    getFinancialNews2,
    getFinancialNewsPost,
    getForums,
    setLikeUnlikeForum,
    setDislikeUnDislikeForum,
    setForumShares,
    postForumApi,
    requestChangePassword,
    getForumComments,
    getRemainsVisits,
    requestSubscribe,
    requestOpenCompanyApi,
    requestForgotPassword,
    getUserdataByToken,
    requestContactUs,
    getSingleCompany,
    getPrivacyPolicy,
    getTermsncondition,
    getAboutus,
    createCommentApi,
    updateCommentApi,
    deleteCommentApi,
    makeReplayAPI,
    postpollApi,
    votePollApi
};