import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions, Button, Chip } from '@mui/material';


const Companylistcard = (props) => {
    const {CompanyImage, CompanyName} = props;

    const handleClick = () =>{
        
    }

    return (
        <>
         <CardActionArea
                
            onClick={()=>handleClick()}>
             <Card style={{"height":"200px"}}>
           
                <CardContent
                    style={{"height":"100px"}}
                >
                <CardMedia
                    component="img"
                    image={CompanyImage}
                    alt="Paella dish"
                    style={{"maxWidth":"100%", "maxHeight":"100px", "padding":"8px", "objectFit":"contain"}}
                />
                </CardContent>
                <CardContent>
                <Typography gutterBottom variant="span" style={{"textAlign":"center", "fontSize":"13px", "float":"bottom", "minHeight":"38px", "maxHeight":"38px"}} component="div">{CompanyName}</Typography>
                </CardContent>
                
            </Card>
            </CardActionArea>
        </>
    );
}

export default Companylistcard;
