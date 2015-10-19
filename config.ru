require_relative 'server'
require_relative 'ws_server'

map '/ws' do
  run WsServer.new
end

map '/' do
  run Server
end