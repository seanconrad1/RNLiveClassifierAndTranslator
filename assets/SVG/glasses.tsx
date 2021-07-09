import React from "react";
import { Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function Glasses({ width, height, color }) {
  const svgMarkup = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
   width="${width}" height="${height}" viewBox="0 0 1280.000000 640.000000"
   preserveAspectRatio="xMidYMid meet">
  <metadata>
  Created by potrace 1.15, written by Peter Selinger 2001-2017
  </metadata>
  <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
  fill="#000000" stroke="none">
  <path d="M2910 5554 c-201 -13 -369 -28 -460 -40 -898 -123 -1532 -455 -1858
  -975 -97 -154 -186 -377 -241 -604 l-27 -110 -138 -5 c-136 -5 -138 -5 -162
  -33 -23 -27 -24 -32 -24 -207 l0 -180 29 -32 c29 -32 31 -33 129 -36 l99 -4 7
  -171 c22 -583 197 -1075 522 -1467 92 -111 306 -316 414 -397 236 -177 456
  -289 715 -364 1023 -298 2088 181 3105 1396 637 761 917 1470 803 2037 -5 26
  -2 30 48 52 123 54 263 79 439 79 197 -1 393 -48 510 -123 73 -47 71 -43 59
  -165 -29 -285 59 -652 243 -1020 313 -623 983 -1389 1598 -1825 586 -415 1204
  -585 1800 -495 475 71 891 287 1255 650 195 194 322 370 435 600 156 319 234
  641 247 1027 l6 187 139 3 140 3 29 33 29 32 0 181 0 181 -29 29 -29 29 -171
  0 -170 0 -10 38 c-5 20 -17 66 -25 102 -25 113 -94 310 -146 417 -208 437
  -566 739 -1121 946 -285 107 -614 174 -1074 218 -170 17 -779 17 -950 1 -327
  -32 -561 -65 -762 -108 l-113 -24 -1838 0 c-1806 0 -1840 0 -1933 20 -209 45
  -491 85 -769 110 -118 11 -651 21 -750 14z m4570 -402 c-242 -166 -404 -344
  -495 -542 -16 -36 -30 -67 -32 -69 -1 -2 -37 14 -80 36 -140 72 -272 107 -458
  122 -216 17 -458 -19 -627 -93 l-36 -16 -41 74 c-91 166 -242 331 -400 437
  -44 30 -80 57 -81 62 0 4 512 7 1138 6 1073 0 1136 -1 1112 -17z"/>
  </g>
  </svg>
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
}
