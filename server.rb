require 'sinatra/base'

class Server < Sinatra::Base
  get '/' do
    File.read(File.join('public', 'index.html'))
  end
end
