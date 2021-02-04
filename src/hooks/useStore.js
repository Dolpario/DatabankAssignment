import {auth} from '../stores/auth';
import {feed} from '../stores/feed';
import {reply} from '../stores/reply';

const useStore = () => {
  return {auth, feed, reply};
};

export default useStore;