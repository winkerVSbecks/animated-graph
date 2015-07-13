
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

    return (
      <div>
        <div>
          { chartsAndGraphs }
        </div>

        <div className="px4">
          <div className="md-col-3 inline-block m1">
            <div className="p1 bg-white border rounded">
              <div className="mb1 bg-blue" style={ { height: '50px' }}></div>
              <h1 className="h5 mb0 mt0">Grid</h1>
            </div>
          </div>
          <div className="md-col-3 inline-block m1">
            <div className="p1 bg-white border rounded">
              <div className="mb1 bg-green" style={ { height: '50px' }}></div>
              <h1 className="h5 mt0 mb0">Battery</h1>
            </div>
          </div>
          <div className="md-col-3 inline-block m1">
            <div className="p1 bg-white border rounded">
              <div className="mb1 bg-navy" style={ { height: '50px' }}></div>
              <h1 className="h5 mt0 mb0">Cumulative</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

});


module.exports = Content;
