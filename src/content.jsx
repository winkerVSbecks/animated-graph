
var React = require('react');
var ChartsAndGraphs = require('./charts-and-graphs.jsx');
var Range = require('./range.jsx');

var Content = React.createClass({

  getInitialState: function() {
    return {
      size: 0,
      vertexCount: 3,
      scale: 0
    };
  },

  componentDidMount: function () {

    var container = React.findDOMNode(this);
    var vm = this;

    function resize(event) {
      vm.setState({ size: container.offsetWidth });
    };

    window.onresize = resize;
    resize();
  },

  handleChange: function(e) {
    var name = e.target.name;
    var state = this.state;
    state[name] = e.target.value;
    this.setState(state);
  },

  render: function() {

    var chartsAndGraphs = this.state.size > 0 ? (
      <div className="center mb2">
        <ChartsAndGraphs {...this.state} />
      </div>
    ) : null;

    var style = {
      height: '2rem',
      lineHeight: '2rem',
      color: '#fff'
    }

    return (
      <div className="prose">
        <div>
          { chartsAndGraphs }
        </div>

        <p className="mb4">You’re energy saving for this month is the equivalent of taking 🚙🚙🚙 3 Hummers off the road for a year.</p>

        <div className="clearfix mxn1 mb4">
          <div className="col col-4 px1">
            <div className="p1 bg-white border rounded">
              <div className="mb1 p1 bold bg-blue" style={ style }>
                154 kWh
              </div>
              <h1 className="h6 mb0 mt0">Grid</h1>
            </div>
          </div>
          <div className="col col-4 px1">
            <div className="p1 bg-white border rounded">
              <div className="mb1 p1 bold bg-green" style={ style }>
                46.2 kWh
              </div>
              <h1 className="h6 mt0 mb0">Battery</h1>
            </div>
          </div>
          <div className="col col-4 px1">
            <div className="p1 bg-white border rounded">
              <div className="mb1 p1 bold bg-navy" style={ style }>
                107.8 kWh
              </div>
              <h1 className="h6 mt0 mb0">Cumulative</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

});


module.exports = Content;
