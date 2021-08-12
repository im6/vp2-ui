import { staticPath } from '../constant';
import { BoxType } from '../interface';

const createBoxElement = (boxVars: BoxType): HTMLElement => {
  const animDelayValue = boxVars.animDelay || '';
  const box = document.createElement('div');
  box.classList.add('box');
  box.dataset.k = boxVars.id.toString();
  box.dataset.l = boxVars.like.toString();
  box.style.animationDelay = animDelayValue;

  const cvs = document.createElement('div');
  cvs.classList.add('canvas');
  const colors0 = boxVars.color.split('#');
  const colors1 = colors0.map((v) => `#${v}`);
  colors1.forEach((v) => {
    const oneColor = document.createElement('div');
    const oneColorTxt = document.createElement('span');
    oneColorTxt.innerText = v;
    oneColor.appendChild(oneColorTxt);
    oneColor.style.backgroundColor = v;
    oneColor.style.animationDelay = animDelayValue;
    cvs.appendChild(oneColor);
  });

  if (typeof boxVars.onRedir === 'function') {
    cvs.onclick = (v) => {
      const evtTarget = v.target as HTMLElement;
      if (evtTarget.tagName === 'DIV') {
        // @ts-ignore
        boxVars.onRedir(boxVars.id);
      }
    };
  }

  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.setAttribute('type', 'button');
  btn.innerHTML = `<img src="${staticPath}${
    boxVars.isLiked ? 'hrtr.svg' : 'hrt.svg'
  }">${boxVars.like}`;
  btn.onclick = () => {
    if (btn.innerHTML.indexOf('hrt.svg') > -1) {
      const newNum = boxVars.isLiked ? boxVars.like : boxVars.like + 1;
      btn.innerHTML = `<img src="${staticPath}hrtr.svg">${newNum}`;
      boxVars.onLike(boxVars.id);
    } else {
      const newNum = boxVars.isLiked ? boxVars.like - 1 : boxVars.like;
      btn.innerHTML = `<img src="${staticPath}hrt.svg">${newNum}`;
      boxVars.onUnlike(boxVars.id);
    }
  };

  box.appendChild(cvs);
  box.appendChild(btn);
  return box;
};

export default createBoxElement;
