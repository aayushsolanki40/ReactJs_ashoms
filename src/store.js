import ShareBtnModalReducer from './reducers/ShareBtnModalReducer';
import SubscriptionModalReducer from './reducers/SubscriptionModalReducer';
import userReducer from './reducers/UserdataReducer';
import sharenewsreducer from './reducers/NewsShareReducer';
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        user: userReducer,
        sharebtnmodal: ShareBtnModalReducer,
        subscriptionmodal: SubscriptionModalReducer,
        sharenewsreducer: sharenewsreducer
    }
})

export default store;