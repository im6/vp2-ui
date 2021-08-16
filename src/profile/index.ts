import '../shared/base';
import '../layout';
import './style.scss';
import createBoxElement from '../box';
import likeManager from '../shared/likeManager';
import { ENTRYANIMDELAY } from '../constant';
import { ProfileRoute } from '../interface';

const $listDiv = document.getElementsByClassName('list')[0];

enum TabSelection {
  portfolio = 'list0',
  like = 'list1',
}
const appObj = window._colorpk as ProfileRoute;
let currentTab = TabSelection.portfolio;

const addColorBox = (source: TabSelection) => {
  const likeMode = source === TabSelection.like;
  $listDiv.innerHTML = '';
  appObj[source].forEach((v, i) => {
    const { k: id, v: color, s: like } = v;
    const oneBox = createBoxElement({
      id,
      color,
      like,
      isLiked:
        likeMode ||
        Object.prototype.hasOwnProperty.call(likeManager.likeMap, id),
      onLike: (id0) => {
        likeManager.addLike(id0);
        if (!likeMode) {
          const one = appObj[TabSelection.portfolio].find((v0) => v0.k === id0);
          appObj[TabSelection.like].push(one!);
        }
      },
      onUnlike: (id0) => {
        likeManager.removeLike(id0);
        appObj[TabSelection.like] = appObj[TabSelection.like].filter(
          (v0) => v0.k !== id0
        );
        if (likeMode) {
          const thisBox = document.querySelector(`[data-k='${id0}']`)!;
          $listDiv.removeChild(thisBox);
        }
      },
      onRedir: (id0) => {
        window.location.href = `/color/${id0}`;
      },
    });

    try {
      const delayTime = `${i * ENTRYANIMDELAY}ms`;
      oneBox.style.animationDelay = delayTime;
      const rows = oneBox.querySelectorAll('.canvas > div');
      for (let rid = 0; rid < 4; rid += 1) {
        (rows[rid] as HTMLElement).style.animationDelay = delayTime;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('browser compatible');
    }

    $listDiv.appendChild(oneBox);
  });

  if (appObj[source].length < 1) {
    $listDiv.innerHTML = `<h3>You have not ${
      likeMode ? 'saved' : 'created'
    } any color.</h3>`;
  }
};

document.getElementById('switch_left')!.onclick = () => {
  if (currentTab !== TabSelection.portfolio) {
    addColorBox(TabSelection.portfolio);
    currentTab = TabSelection.portfolio;
  }
};

document.getElementById('switch_right')!.onclick = () => {
  if (currentTab !== TabSelection.like) {
    addColorBox(TabSelection.like);
    currentTab = TabSelection.like;
  }
};

addColorBox(currentTab);
