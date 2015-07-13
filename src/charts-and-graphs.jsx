
var React = require('react/addons');
var R = require('ramda');
var clrs = require('colors.css');
var AnimatedLine = require('./animated-line.jsx');
var LineGraph = require('./line-graph.jsx');
var Graph = require('./graph.jsx');


var ChartsAndGraphs = React.createClass({

  render: function() {
    var vm = this;
    var size = vm.props.size;
    var viewBox = [0, size * 0.25, size, size * 0.5].join(' ');

    var ptsGrid = [0.2, 0.4, 0.1, 0.075, 0.35, 0.3, 0.5, 0.4, 0.5];
    var ptsBattery = [0.175, 0.2, 0.3, 0.4, 0.55, 0.35, 0.1, 0.2, 0.3];
    var ptsCumulative = R.mapIndexed(function(pt, idx) {
      return [size * 0.1 * (idx + 1), Math.max(ptsGrid[idx], ptsBattery[idx])];
    }, ptsGrid);

    var yTicks = R.map(function(i) {
      var pts = [ [size * (i + 1) / 8, size * 0.65],
                  [size * (i + 1) / 8, size * 0.1] ];
      return <AnimatedLine key={ i }
          delay={ i*100 }
          direction={ 'Y' }
          pts={ pts }
          stroke={ clrs.silver } />
    }, R.range(0, 7));

    var xTicks = R.map(function(i) {
      var pts = [ [size * 0.1, size * 0.13 * (i + 1)],
                  [size * 0.9, size * 0.13 * (i + 1)] ];
      return <AnimatedLine key={ i }
          delay={ i*100 }
          direction={ 'X' }
          pts={ pts }
          stroke={ clrs.silver } />;
    }, R.range(0, 5));

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
        viewBox={ viewBox }
        width={ size }
        height={ size * 0.5 }
        fill="none">
        { yTicks }
        { xTicks }
        <Graph pts={ ptsGrid }
          size={ size }
          fill={ clrs.blue }
          delay={ 350 } />
        <Graph pts={ ptsBattery }
          size={ size }
          fill={ clrs.green }
          delay={ 500 } />
        <LineGraph pts={ ptsCumulative }
          size={ size }
          stroke={ clrs.navy }
          delay={ 100 } />
      </svg>
    );
  }
});


/**
 * Utilities
 */
function rad(a) {
  return Math.PI * a / 180;
}

function rx(r, a, c) {
  return c - r * Math.cos(rad(a));
}

function ry(r, a, c) {
  return c * 0.75 - r * Math.sin(rad(a));
}

function generatePolygon(vertexCount, r, c) {

  var theta = 360 / vertexCount;

  var polygon = R.map(function(i) {
    return [rx(r, theta * i, c), ry(r, theta * i, c)];
  }, R.range(0, vertexCount));

  return polygon;
}

function midpoint(u, v) {
  return [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2];
}

function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}

module.exports = ChartsAndGraphs;
