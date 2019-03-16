import app from 'app';

export default function* sagas() {
  yield [
    ...app.AppSaga,
  ];
}
