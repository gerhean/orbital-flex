import authSaga from './authSaga';
import scheduleSaga from './scheduleSaga';
import chatSaga from './chatSaga';
import userSaga from './userSaga';

function* backendSaga() {
	yield* authSaga();
	yield* scheduleSaga();
	yield* chatSaga();
	yield* userSaga()
}

export default backendSaga