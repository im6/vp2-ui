import { likeAjax, localStorageEnabled } from './util';
import { ProfileRoute, ColorBrowseRoute } from '../interface';

const LSLIKEKEY = 'userLike';
const appObj = window._colorpk;

class LikeManagement {
  isAuth: boolean;
  hasLocalStorage: boolean;
  likeMap: Record<string, boolean>;

  constructor() {
    this.isAuth = appObj.auth;
    this.hasLocalStorage = localStorageEnabled;
    this.likeMap = this.isAuth ? this.initLikeFromDB() : this.initLikeFromLs();
  }
  initLikeFromDB() {
    const res = <Record<string, boolean>>{};
    // grab from global _colorpk
    if (Array.isArray((appObj as ProfileRoute).list1)) {
      // profile page's likes, [Color]
      (appObj as ProfileRoute).list1.forEach((v) => {
        res[v.k.toString()] = true;
      });
    } else if (Array.isArray((appObj as ColorBrowseRoute).likes)) {
      // latest or popular, [Int]
      (appObj as ColorBrowseRoute).likes.forEach((v) => {
        res[v.toString()] = true;
      });
    }
    return res;
  }

  initLikeFromLs() {
    const res = <Record<string, boolean>>{};
    const currentLocalState = this.getLsLike();
    if (Array.isArray(currentLocalState)) {
      currentLocalState.forEach((v) => {
        res[v.toString()] = true;
      });
    } else {
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify([]));
    }
    return res;
  }

  getLsLike() {
    const likeStr = window.localStorage.getItem(LSLIKEKEY);
    if (!likeStr) return null;
    return JSON.parse(likeStr);
  }

  addLike(id: number) {
    this.likeMap[id.toString()] = true;
    likeAjax(id, 'POST');
    if (!this.isAuth && this.hasLocalStorage) {
      const userLike = this.getLsLike();
      userLike.push(id);
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    }
  }

  removeLike(id: number) {
    delete this.likeMap[id.toString()];
    likeAjax(id, 'DELETE');
    if (!this.isAuth && this.hasLocalStorage) {
      let userLike = this.getLsLike();
      userLike = userLike.filter((v: number) => v !== id);
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    }
  }
}

const likeManager = new LikeManagement(); // always singleton

export default likeManager;
