import React from 'react';
import Sharebtnsmodal from '../popup/ShareBtnsModal';
import SubscriptionModal from './SubscriptionModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showsharemodal } from '../reducers/ShareBtnModalReducer';
import { showsubscriptionmodal } from '../reducers/SubscriptionModalReducer';

const Popupmodals = () => {

    const dispatch = useDispatch();
    const sharebtnmodal = useSelector((state)=>state.sharebtnmodal.value);
    const subscriptionmodal = useSelector((state)=>state.subscriptionmodal.value);

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
        </>
    );
}

export default Popupmodals;
