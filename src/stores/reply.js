import { observable, runInAction } from 'mobx';

const reply = observable({
  generateId: 5,
  list: [
    {
      id: 1,
      feedId: 1,
      date: new Date(),
      hours: '',
      contents: `1번 기사 재밌게 보았습니다. - 권시현`,
      user: {
        id: 2,
        nickname: `권시현`,
      }
    },
    {
      id: 2,
      feedId: 1,
      date: new Date(),
      hours: '',
      contents: `재미있는 1번 기사 잘 보았습니다. - 돌파리오`,
      user: {
        id: 1,
        nickname: `돌파리오`,
      }
    },
    {
      id: 3,
      feedId: 2,
      date: new Date(),
      hours: '',
      contents: `2번 기사 재밌게 보았습니다. 돌파리`,
      user: {
        id: 1,
        nickname: `돌파리오`,
      }
    },
    {
      id: 4,
      feedId: 2,
      date: new Date(),
      hours: '',
      contents: `재미있는 2번 기사 잘 보았습니다. 권시`,
      user: {
        id: 2,
        nickname: `권시현`,
      }
    },
  ],
  write(reply) {
    runInAction(() => {
      this.list = [...this.list, {
        id: this.generateId,
        date: new Date(),
        feedId: reply.feedId,
        user: reply.user,
        contents: reply.contents,
      }];
      this.generateId = this.generateId + 1;
    });
  },
  update(index, reply) {
    const _list = [...this.list];
    _list.splice(index, 1, {
      ...reply,
    });
    runInAction(() => {
      this.list = _list;
    });
  },
  remove(index) {
    const _list = [...this.list];
    _list.splice(index, 1);
    runInAction(() => {
      this.list = _list;
    });
  },
});

export { reply };