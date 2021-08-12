import { debounce } from '../shared/util';
import getComponentWidth from './helper';
import { checkWelcome, hideWelcome } from '../shared/userPreference';
import { ColorBrowseRoute } from '../interface';

const mainElem = document.querySelector('.list') as HTMLElement;
const helpElem = document.querySelector('.help') as HTMLElement;

const isWelcomeHidden = checkWelcome() && false; // todo: always show colorpk v1

const adjustLayout = (w: number) => {
  const { containerWidth, containerWidthMax, helperWidth, helperWidthMax } =
    getComponentWidth(w);
  mainElem.style.width = containerWidth;
  mainElem.style.maxWidth = containerWidthMax;
  if (helpElem) {
    helpElem.style.width = helperWidth;
    helpElem.style.maxWidth = helperWidthMax;
  }
};

window.onresize = debounce((evt: UIEvent) => {
  const w = evt.target as Window;
  adjustLayout(w.innerWidth);
}, 250);

adjustLayout(window.innerWidth);

if (!isWelcomeHidden && helpElem) {
  helpElem.style.display = 'block';
  (window._colorpk as ColorBrowseRoute).removeWelcome = () => {
    if (!helpElem.parentElement) return;
    helpElem.parentElement.removeChild(helpElem);
    hideWelcome();
  };
}
