import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const SensumLogo = ({
  style = null,
  // scale = 1,
  opacity = 1,
  circleOpacity = 1,
  rotate = 0,
  slice = false
}) => { 
  const fillColor = style?.color;
  return(
    <Svg
      viewBox="0 0 249 249"
      // width={249 * scale}
      // height={249 * scale}
      style={style}
      preserveAspectRatio={`xMidYMid ${slice ? 'slice' : 'meet'}`}
    >
      <Path
        fill={fillColor}
        fillOpacity={opacity}
        transform={`rotate(${rotate}, 124.5, 124.5)`}
        d="M124.6,133.6c-0.4,13-3.2,35.4-17.8,35.5c-20.6,0.2-27-24.8-56.7-24.1 c-25.1,0.6-38.3,17.5-41.8,22.8c-4.9-13.2-7.6-27.4-7.7-42.3c-0.1-13.6,2-26.7,6-39c3.2-2.9,14.6-10.9,37-3.6 c26.8,8.8,47.4,65.5,63.9,65.4c16.4-0.1,17.2-23.8,17.2-23.8l0,0L124.6,133.6z"
      />
      <Path
        fill={fillColor}
        fillOpacity={opacity}
        transform={`rotate(${rotate}, 124.5, 124.5)`}
        d="M124.5,124.5L124.5,124.5c0,0,0.8-23.6,17.2-23.8s37.1,56.6,63.9,65.4c22.4,7.3,33.8-0.7,37-3.6 c4-12.3,6.1-25.4,6-39c-0.1-14.9-2.8-29.1-7.7-42.3c-3.5,5.3-16.7,22.1-41.8,22.8c-29.7,0.7-36.1-24.3-56.7-24.1 c-14.6,0.1-17.4,22.5-17.8,35.5L124.5,124.5z"
      />
      <Circle
        strokeMiterlimit={10}
        stroke={fillColor}
        strokeOpacity={circleOpacity}
        cx={124.5}
        cy={124.5}
        r={124} />
    </Svg>
  )
 };

export default SensumLogo;