/** @jsx React.DOM */

var Message = React.createClass({
  getInitialState: function(){
    return {time: new Date()};
  },
  render: function(){
    return(
      <li className="message">
        {this.props.msg}
      </li>
    );
  }
});

var MessageList = React.createClass({
  render: function () {
    var renderMessage = function(message){
      return <Message msg={message.text} />
    }
    return(
      <ul className="message">
        { this.props.messages.map(renderMessage)}
      </ul>
    );
  }
});

var MessageForm = React.createClass({
  getInitialState: function(){
    return {text: ''};
  },
  changeHandler : function(e){
    this.setState({ text : e.target.value });
  },
  handleSubmit : function(e){
    e.preventDefault();
    var message = {
      text : this.state.text
    }
    this.props.submitfnc(message);
    this.setState({text: ''});
  },
  render:function(){
    return(
      <div className="messageForm">
        <form onSubmit={this.handleSubmit} >
          <input onChange={this.changeHandler} value={this.state.text}/>
        </form>
      </div>
    );
  }
});

var EmChat = React.createClass({
  getInitialState: function(){
    var websocketUrl = 'ws://'+window.location.hostname+':'+window.location.port+'/ws';
    this.socket = new WebSocket(websocketUrl);
    this.socket.onmessage = this.messageRecieve;
    return { messages: [], text: ''};
  },
  messageRecieve: function(event){
    this.state.messages.push({text: event.data});
    this.setState({});
  },
  handleMessageSubmit : function(message){
    this.socket.send(message.text);
    this.setState({});
  },
  render: function(){
    return(
      <div className="EmChat">
        <MessageList messages={this.state.messages}/>
        <MessageForm submitfnc={this.handleMessageSubmit}/>
      </div>
    );
  }
});

React.renderComponent(<EmChat />, document.getElementById('container'));
