import { USE_BACKEND } from "../../env.js";
import backendSaga from "./backendSaga";
import mockBackendSaga from "./mockBackendSaga";

function* mainSaga() {
  yield* USE_BACKEND ? backendSaga() : mockBackendSaga();
}

export default mainSaga;
