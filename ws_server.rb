require 'rack/websocket'

class WsServer < Rack::WebSocket::Application
  def initialize
    super
    @channel = EM::Channel.new
  end

  def on_open env
    @sid = @channel.subscribe{|msg| send_data(msg) }
    @channel.push "client #{@sid} connected"
  end

  def on_message env, msg
    @channel.push "client #{@sid}: #{msg}"
  end

  def on_close env
    @channel.unsubscribe(@sid)
    @channel.push "client #{@sid} disconnected"
  end

  def on_error env, error
    puts "WsServer error: #{error}"
  end
end
