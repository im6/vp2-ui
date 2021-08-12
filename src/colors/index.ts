import '../shared/base';
import '../layout';
import './style.scss';
import createBoxElement from '../box';
import { debounce } from '../shared/util';
import { ENTRYANIMDELAY, INITNUM, STEP, SCROLLBOUND } from '../constant';
import likeManager from '../shared/likeManager';
import { ColorBrowseRoute } from '../interface';

const { initData } = window._colorpk as ColorBrowseRoute;
const LIMIT = initData.length;

const $listDiv = document.getElementsByClassName('list')[0];
let currentIdx = 0;

const addColorBox = (step: number) => {
  let forwardSteps = step;
  for (let i = 0; i < step; i += 1) {
    const v = initData[i + currentIdx];
    if (!v) {
      forwardSteps = i;
      break;
    }
    const { k: id, v: color, s: like } = v;
    const oneBox = createBoxElement({
      id,
      color,
      like,
      isLiked: Object.prototype.hasOwnProperty.call(likeManager.likeMap, id),
      animDelay: `${i * ENTRYANIMDELAY}ms`,
      onLike: (id1) => {
        likeManager.addLike(id1);
      },
      onUnlike: (id1) => {
        likeManager.removeLike(id1);
      },
      onRedir: (id1) => {
        window.location.href = `/color/${id1}`;
      },
    });

    $listDiv.appendChild(oneBox);
  }

  currentIdx += forwardSteps;
};

window.onscroll = debounce((evt: UIEvent) => {
  // @ts-ignore
  const bodyElem = evt.target.scrollingElement || evt.target.activeElement;
  const htmlElem = document.documentElement;
  const position = bodyElem.scrollTop || htmlElem.scrollTop;
  const offset = htmlElem.scrollHeight - position - htmlElem.clientHeight;

  if (offset < SCROLLBOUND && currentIdx < LIMIT) {
    addColorBox(STEP);
  }
}, 200);

addColorBox(INITNUM);
