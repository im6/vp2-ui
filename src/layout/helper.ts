import { maxBoxNumInRow } from '../constant';

const widthUtility = (wiw: number): number => {
  return wiw > 692 ? 0.9 : 0.99;
};

const boxSize = (wiw: number): number[] => {
  // Borders and padding are not included in the width calculation.
  let width;
  let margin;
  if (wiw < 321) {
    margin = 4;
    width = 125 + margin * 2;
  } else if (wiw < 769) {
    margin = 4;
    width = 150 + margin * 2;
  } else {
    // wide screen
    margin = 10;
    width = 220 + margin * 2;
  }
  return [width, margin];
};

const getComponentWidth = (wiw: number) => {
  const [boxWidth, boxMargin] = boxSize(wiw);
  const util = widthUtility(wiw);

  const wd = Math.floor((wiw * util) / boxWidth) * boxWidth;
  const maxTotal = boxWidth * maxBoxNumInRow;
  const doubleMargin = boxMargin * 2;

  return {
    containerWidth: `${wd}px`,
    containerWidthMax: `${maxTotal}px`,
    helperWidth: `${wd - doubleMargin}px`,
    helperWidthMax: `${maxTotal - doubleMargin}px`,
  };
};

export default getComponentWidth;
