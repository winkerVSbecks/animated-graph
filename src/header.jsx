
var React = require('react');
var clrs = require('colors.css');

var Header = React.createClass({

  render: function() {
    var today = new Date().toDateString();

    return (
      <header className="py3 mb4">
        <h1 className="h1 h1-responsive caps m0">
          { this.props.title }
        </h1>
        <div className="h6">
          <div className="bold gray">
            { today }
          </div>
        </div>
        <hr className="mt1 mb1 b2 border--red" />
      </header>
    );
  }

});

module.exports = Header;
