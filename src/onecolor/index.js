import '../shared/base';
import './style.scss';
import createBoxElement from '../box';
import { downloadCanvas } from '../shared/util';
import likeManager from '../shared/likeManager';

const downloadBtn = document.getElementById('download');
const container = document.getElementsByClassName('container')[0];
const { k: id, v: color, s: like } = window._colorpk.selected;
downloadBtn.href = downloadCanvas(color);

const oneBox = createBoxElement({
  id,
  color,
  like,
  isLiked: Object.prototype.hasOwnProperty.call(likeManager.likeMap, id),
  onLike: (id0) => {
    likeManager.addLike(id0);
  },
  onUnlike: (id0) => {
    likeManager.removeLike(id0);
  },
});

container.insertBefore(oneBox, downloadBtn);
