
var React = require('react');
var R = require('ramda');
var uuid = require('uuid');

var AnimatedLine = React.createClass({

  render: function() {
    var direction = this.props.direction;
    var x1 = this.props.pts[0][0];
    var x2 = this.props.pts[1][0];
    var y1 = this.props.pts[0][1];
    var y2 = this.props.pts[1][1];
    var start, end, attributeName;

    if (direction === 'X') {
      start = x1;
      end = x2;
      x2 = x1;
      attributeName = 'x2';
    } else {
      start = y1;
      end = y2;
      y2 = y1;
      attributeName = 'y2';
    }

    var id = uuid.v1();
    var animation = '<animate attributeName="' + attributeName + '" ' +
      'xlink:href="#' + id + '" ' +
      'from="' + start + '" ' +
      'to="' + end + '" ' +
      'dur="600ms" ' +
      'fill="freeze" ' +
      'keySplines="0.77, 0, 0.175, 1" ' +
      'keyTimes="0;1" ' +
      'calcMode = "spline" ' +
      'begin="' + (this.props.delay || 0) + 'ms" />';

    return (
      <line id={ id }
        x1={ x1 } y1={ y1 }
        x2={ x2 } y2={ y2 }
        fill={ this.props.fill }
        stroke={ this.props.stroke }
        strokeWidth={ this.props.strokeWidth }
        opacity={ this.props.opacity }>
        <g dangerouslySetInnerHTML={{ __html: animation }} />
      </line>
    );
  }

});

module.exports = AnimatedLine;
