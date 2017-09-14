import { fetchSampleDataSaga } from 'containers/home/sagas';

export default function* rootSaga () {
  yield [
    fetchCommentsSaga()
  ];
}
