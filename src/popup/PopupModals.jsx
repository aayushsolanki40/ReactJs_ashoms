import React from 'react';
import Sharebtnsmodal from '../popup/ShareBtnsModal';
import SubscriptionModal from './SubscriptionModal';
import { useSelector, useDispatch } from 'react-redux';
import { showsharemodal } from '../reducers/ShareBtnModalReducer';
import { showsubscriptionmodal } from '../reducers/SubscriptionModalReducer';
import {showforumnewsmodal} from '../reducers/ForumNewsModalReducer';
import ForumNewsModal from './ForumNewsModal';

const Popupmodals = () => {

    const dispatch = useDispatch();
    const sharebtnmodal = useSelector((state)=>state.sharebtnmodal.value);
    const subscriptionmodal = useSelector((state)=>state.subscriptionmodal.value);
    const ForumNewsModalData = useSelector((state)=>state.forumnewsmodal.value);

    return (
        <>
            <Sharebtnsmodal
                show={sharebtnmodal}
                onHide={() => dispatch(showsharemodal(false))}
            />

            <SubscriptionModal
                show={subscriptionmodal}
                onHide={() => dispatch(showsubscriptionmodal(false))}
            />

            <ForumNewsModal
                show={ForumNewsModalData.visibility}
                onHide={() => dispatch(showforumnewsmodal(false))}
                companyData={ForumNewsModalData.details}
            />
        </>
    );
}

export default Popupmodals;
