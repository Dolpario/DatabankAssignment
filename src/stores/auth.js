import {observable} from 'mobx';

const auth = observable({
  user: {
    id: 1,
    nickname: '돌파리오'
  },
});

export {auth};