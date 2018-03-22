import React from 'react'
import {View, StyleSheet} from 'react-native'
import Svg, {Path, Circle} from 'react-native-svg'

const MAX_PERCENTAGE = 100;
const SVG_EPSILON = 0.001;
const PERIOD = 2 * Math.PI;
const DEFAULT_INNER_RADIUS = 50;
const DEFAULT_RADIUS = 60;
const DEFAULT_BLANK_COLOR = "silver";
const DEFAULT_INNER_COLOR = "white";
const DEFAULT_FILL_COLOR = "blue";

/**
 * Creates the filled portion of the progress circle.
 * @param percentage - 0 to MAX_PERCENTAGE
 * @param radius - same as the prop for the overall progress circle.
 * @returns {string} - code for SVG path
 */
function _filledArc(percentage, radius){
    if (percentage >= MAX_PERCENTAGE) {
        percentage = MAX_PERCENTAGE - SVG_EPSILON;
    }
    const a = PERIOD * percentage / MAX_PERCENTAGE;
    let xAxisRotation = 0,
        sweepFlag = 1,
        x = radius * (1 + Math.sin(a)),
        y = radius * (1 - Math.cos(a)),
        largeArcFlag = percentage <= (MAX_PERCENTAGE / 2) ? 0 : 1;
    return `A${radius} ${radius} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
}

/**
 * Generates a Progress Circle.
 * Example use:
 *  <ProgressCircle innerRadius={60} radius={70} percentage={50}><Text>{'50%'}</Text></ProgressCircle>
 * @param percentage - 0 to MAX_PERCENTAGE
 * @param blankColor - remaining progress color inside progress circle
 * @param innerColor - background color enclosed by progress circle
 * @param fillColor - fulfilled progress color inside progress circle
 * @param innerRadius - radius inside progress circle. Arc width will be equal to radius minus inner radius.
 * @param radius - outer radius of progress circle
 * @param children - for example, a text that displays the progress percentage
 * @returns {XML} - for direct rendering
 * @constructor
 */
const ProgressCircle = ({
        percentage = 0,
        blankColor = DEFAULT_BLANK_COLOR,
        innerColor = DEFAULT_INNER_COLOR,
        fillColor = DEFAULT_FILL_COLOR,
        innerRadius = DEFAULT_INNER_RADIUS,
        radius = DEFAULT_RADIUS,
        children }) => {
    let canvasSize = radius * 2;
    return <View style={{height: canvasSize, width: canvasSize}}>
        <Svg width={canvasSize} height={canvasSize}>
            <Circle cx={radius} cy={radius} r={radius} fill={blankColor}/>
            <Path
                d={`M${radius} ${radius} L${radius} 0 ${_filledArc(percentage, radius)} Z`}
                fill={fillColor}
            />
            {<Circle cx={radius} cy={radius} r={innerRadius} fill={innerColor}/>}
        </Svg>
        <View style={styles.innerView}>
            {children}
        </View>
    </View>
};

const styles = StyleSheet.create({
    innerView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

export default ProgressCircle
