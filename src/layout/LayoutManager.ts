import { maxBoxNumInRow } from '../constant';

class LayoutManager {
  containerWidth: string | null;
  containerWidthMax: string | null;
  helperWidth: string | null;
  helperWidthMax: string | null;

  constructor() {
    this.containerWidth = null;
    this.containerWidthMax = null;
    this.helperWidth = null;
    this.helperWidthMax = null;
  }

  set windowWidth(wiw: number) {
    const [boxWidth, boxMargin] = LayoutManager.boxSize(wiw);
    const util = LayoutManager.widthUtility(wiw);

    const wd = Math.floor((wiw * util) / boxWidth) * boxWidth;
    const maxTotal = boxWidth * maxBoxNumInRow;
    const doubleMargin = boxMargin * 2;

    this.containerWidth = `${wd}px`;
    this.containerWidthMax = `${maxTotal}px`;
    this.helperWidth = `${wd - doubleMargin}px`;
    this.helperWidthMax = `${maxTotal - doubleMargin}px`;
  }

  static widthUtility(wiw: number): number {
    return wiw > 692 ? 0.9 : 0.99;
  }

  static boxSize(wiw: number): number[] {
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
  }
}

export default LayoutManager;
