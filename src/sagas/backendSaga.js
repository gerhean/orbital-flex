import authSaga from './authSaga';
import scheduleSaga from './scheduleSaga';
import chatSaga from './chatSaga';

function* backendSaga() {
	yield* authSaga();
	yield* scheduleSaga();
	yield* chatSaga();
}

export default backendSaga