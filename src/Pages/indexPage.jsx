import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

const Indexpage = () => {
const location = useLocation();
const [Mobile, setMobile] = useState('0');


    return (
        <div>
            <div>{Mobile}</div>
        </div>
    );
}

export default Indexpage;
