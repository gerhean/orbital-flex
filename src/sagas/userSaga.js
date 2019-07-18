import firebase from 'firebase';
import '@firebase/firestore'
import { Toast } from 'native-base';
import { takeLatest, takeEvery, takeLeading, put, call, select } from 'redux-saga/effects';

import { 
	UPDATE_USER_INFO,
	UPDATE_USER_INFO_SUCCESS,
	FETCH_USER_INFO,
	FETCH_USER_INFO_SUCCESS,
	ADD_USER_REVIEW,
	ADD_USER_REVIEW_SUCCESS,
	FETCH_USER_REVIEWS,
	FETCH_USER_REVIEWS_SUCCESS,
} from '../actions/actionTypes';

import { 
	client, 
	schedule_index, 
	serverTimestamp, 
	deleteField, 
	db, 
	displayErrorMessage, 
	displayMessage
} from './backendConstants';

const localTimestamp = firebase.firestore.Timestamp.now;

function* userSaga() {

	yield takeLeading(UPDATE_USER_INFO, function*(action){
    try {
    	const uid = firebase.auth().currentUser.uid;
    	const userRef = db.collection('users').doc(uid)
	    yield call(
	    	[userRef, userRef.update], 
	    	action.userInfo
	    )
      yield put({ type: UPDATE_USER_INFO_SUCCESS, userInfo: action.userInfo })
      yield call(displayMessage, "User Info Updated");
    } catch (error) {
      yield call(displayErrorMessage, error, UPDATE_USER_INFO);
    }
  })

  yield takeEvery(FETCH_USER_INFO, function*(action){
    try {
    	const uid = action.uid;
    	const storedUser = yield select(state => state.users[uid]);
    	if (!storedUser || (Date.now() - storedUser.timeFetched > 300000)) { // reduce api calls
		    const userDocRef = db.collection('users').doc(uid);
		   	const userData = yield call([userDocRef, userDocRef.get]);
		   	const user = yield {
		   		...userData.data(),
		   		uid,
		   		timeFetched: Date.now()
		   	}

		    yield put({ type: FETCH_USER_INFO_SUCCESS, uid, user });
    	}

    } catch (error) {
      yield call(displayErrorMessage, error, FETCH_USER_INFO);
    }
  })

  yield takeEvery(ADD_USER_REVIEW, function*(action){
    try {
    	const ownUid = firebase.auth().currentUser.uid;
    	const uid = action.uid;
    	const text = action.text;
    	const rating = action.rating;
    	const review = {
    		rating,
    		text,
    		sentTime: serverTimestamp()
    	};
	    const userReviewRef = db.collection('users').doc(uid).collection('reviews').doc(ownUid);
	    yield call([userReviewRef, userReviewRef.set], review);
	    const localReview = {
    		...review,
    		poster: ownUid,
    		sentTime: Date.now()
    	};
	    yield put({ type: ADD_USER_REVIEW_SUCCESS, uid, review: localReview});
    } catch (error) {
      yield call(displayErrorMessage, error, ADD_USER_REVIEW);
    }
  })

  yield takeEvery(FETCH_USER_REVIEWS, function*(action) {
		try {
			const uid = action.uid;
			const forceFetch = action.forceFetch;
			const lastFetched = yield select(state => state.users[uid].timeFetchedReview);
			
			if (forceFetch || !lastFetched || Date.now() - lastFetched > 3000000) {
				const ownUid = firebase.auth().currentUser.uid;
				const reviewCollectionRef = db.collection('users').doc(uid).collection('reviews')
				let reviewsRef = reviewCollectionRef
					.orderBy("sentTime", "desc") 
					.limit(10);
				const querySnapshot = yield call([reviewsRef, reviewsRef.get]);
				const reviews = [];
				let ownReview = false;
				querySnapshot.forEach(doc => {
					const review = doc.data();
					if (ownUid == doc.id) {
						ownReview = {
							rating: review.rating,
							text: review.text,
							createdAt: review.sentTime.toDate()
						}
					} else {
						reviews.push({
							rating: review.rating,
							text: review.text,
							createdAt: review.sentTime.toDate(),
							poster: doc.id
						});
					}
				}); 
				if (reviews[0]) {
					if (!ownReview) {
						const ownReviewRef = reviewCollectionRef.doc(ownUid);
						const ownReviewQuery = yield call([ownReviewRef, ownReviewRef.get]);
						const review = ownReviewQuery.data()
						if (review) {
							ownReview = {
								rating: review.rating,
								text: review.text,
								createdAt: review.sentTime.toDate()
							}
						}
					}
				}
				yield put({ type: FETCH_USER_REVIEWS_SUCCESS, uid, reviews, ownReview })
			}
		} catch (error) {
			displayErrorMessage(error, FETCH_USER_REVIEWS);
		}
	})

}

export default userSaga;