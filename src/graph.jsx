
var React = require('react');
var R = require('ramda');
var uuid = require('uuid');

var Graph = React.createClass({

  render: function() {
    var count = this.props.pts.length;
    var res = this.props.size / (count + 1);
    var yLim = this.props.size * 0.75 - res;
    var pts = this.props.pts;

    var vertices = R.map(function(i) {
      return [res * (i + 1), remap(pts[i], 1, 0, res, yLim)];
    }, R.range(0, count));

    // Start and end point
    vertices = R.insert(0, [res, yLim], vertices);
    vertices.push([res * count, yLim]);

    var pathData = getSplines(vertices).join(' ');
    var id = uuid.v1();

    var startPts = R.map(function(pt) {
      return [pt[0], yLim];
    }, vertices);
    var start = getSplines(startPts).join(' ');

    var animation = '<animate xlink:href="#' + id + '" attributeName="d" attributeType="XML" from="' + start + '"  to="' + pathData + '" dur="300ms" fill="freeze" keySplines="0.77, 0, 0.175, 1" keyTimes="0;1" calcMode = "spline" begin="' + ((this.props.delay || 0) + 300) +'ms" />';

    return (
      <g>
        <path id={ id }
          fill={ this.props.fill }
          stroke={ this.props.stroke }
          strokeWidth={ this.props.strokeWidth }
          opacity={ 0.75 } />
          <g dangerouslySetInnerHTML={{ __html: animation }} />
      </g>
    );
  }
});


/**
 * Utilities
 */
function randomNumber(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

function remap(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

/**
 * Bezier-spline.js
 * By: Lubos Brieda, Particle In Cell Consulting LLC, 2012
 * http://www.particleincell.com/2012/bezier-splines/
 */
function getSplines(vertices) {
  // Grab (x,y) coordinates of the control points
  var x = R.pluck(0, vertices);
  var y = R.pluck(1, vertices);

  // Computes control points p1 and p2 for x and y direction
  px = computeControlPoints(x);
  py = computeControlPoints(y);

  var dList = [];

  for(var i = 0; i < vertices.length - 1; i++) {
    var isFirst = (i === 0) ? true : false;
    dList.push(pathString(vertices[i][0], vertices[i][1],
                          px.p1[i], py.p1[i],
                          px.p2[i], py.p2[i],
                          vertices[i + 1][0], vertices[i + 1][1],
                          isFirst)
    );
  }

  dList.push('Z');

  return dList;
}

// creates formated path string for SVG cubic path element
function pathString(x1, y1, px1, py1, px2, py2, x2, y2, isFirst) {
  var str = (' C ' + px1 + ' ' + py1 + ' ' +
              px2 + ' ' + py2 + ' ' +
              x2 + ' ' + y2);

  return isFirst ? ('M ' + x1 + ' ' + y1 + str) : str;
}

// Computes control points given knots K
function computeControlPoints(K) {
  p1 = [];
  p2 = [];
  n = K.length - 1;

  // rhs vector
  a = [];
  b = [];
  c = [];
  r = [];

  // left most segment
  a[0] = 0;
  b[0] = 2;
  c[0] = 1;
  r[0] = K[0] + 2 * K[1];

  // internal segments
  for(var i = 1; i < n - 1; i++) {
    a[i]=1;
    b[i]=4;
    c[i]=1;
    r[i] = 4 * K[i] + 2 * K[i+1];
  }

  // right segment
  a[n-1] = 2;
  b[n-1] = 7;
  c[n-1] = 0;
  r[n-1] = 8 * K[n-1] + K[n];

  // solves Ax=b with the Thomas algorithm (from Wikipedia)
  for(var i = 1; i < n; i++) {
    m = a[i] / b[i-1];
    b[i] = b[i] - m * c[i - 1];
    r[i] = r[i] - m * r[i-1];
  }

  p1[n-1] = r[n-1] / b[n-1];
  for(var i = n - 2; i >= 0; --i) {
    p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];
  }

  // we have p1, now compute p2
  for(var i=0; i < n-1; i++) {
    p2[i]=2*K[i+1]-p1[i+1];
  }

  p2[n-1] = 0.5 * (K[n] + p1[n-1]);

  return { p1: p1, p2: p2 };
}

module.exports = Graph;
