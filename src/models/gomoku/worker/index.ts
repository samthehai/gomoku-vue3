import PromiseWorker from 'promise-worker';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker';

type DataType = 'init' | 'compute' | 'watch';

export type ExchangeData = {
  type: DataType;
  color?: string;
  mode?: string;
  r?: number;
  c?: number;
};

const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);

const send = (data: ExchangeData) =>
  promiseWorker.postMessage(
    JSON.parse(
      JSON.stringify({
        type: 'message',
        data,
      }),
    ),
  );

export default {
  send,
};
