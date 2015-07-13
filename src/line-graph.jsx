
var React = require('react');
var R = require('ramda');
var uuid = require('uuid');

var LineGraph = React.createClass({

  render: function() {
    var count = this.props.pts.length;
    var res = this.props.size / (count + 1);
    var yLim = this.props.size * 0.75 - res;

    var pathData = R.mapIndexed(function(pt, idx) {
      var y = remap(pt[1], 1, 0, res, yLim);
      var def = (idx === 0) ? ['M', pt[0], y] :
                              ['L', pt[0], y];
      return def.join(' ');
    }, this.props.pts).join(' ');

    var start = R.mapIndexed(function(pt, idx) {
      var def = (idx === 0) ? ['M', res, yLim] :
                              ['L', res, yLim];
      return def.join(' ');
    }, this.props.pts).join(' ');

    var mid = R.mapIndexed(function(pt, idx) {
      var def = (idx === 0) ? ['M', pt[0], yLim] :
                              ['L', pt[0], yLim];
      return def.join(' ');
    }, this.props.pts).join(' ');

    var style = {
      strokeLinejoin: 'round',
      strokeLinecap: 'round'
    };
    var id = uuid.v1();

    var animation = '<animate xlink:href="#' + id + '" attributeName="d" attributeType="XML" values="' + start + '; ' + mid + '; ' +  pathData + '" dur="600ms" fill="freeze" keySplines="0.77, 0, 0.175, 1; 0.77, 0, 0.175, 1;" keyTimes="0;0.5;1" calcMode = "spline" begin="' + ((this.props.delay || 0) + 300) +'ms" />';

    return (
      <g>
        <path id={ id }
          d={ start }
          fill={ this.props.fill }
          stroke={ this.props.stroke }
          strokeWidth="2"
          style={ style }
          opacity={ this.props.opacity } />
          <g dangerouslySetInnerHTML={{ __html: animation }} />
      </g>
    );
  }
});


/**
 * Utilities
 */
function remap(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

module.exports = LineGraph;
