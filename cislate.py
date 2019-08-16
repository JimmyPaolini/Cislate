import requests, cherrypy, json
from bs4 import BeautifulSoup

class Cislate(): # http://0.0.0.0:3000
    @cherrypy.expose
    def index(self):
        return open('/Users/jimmy/Documents/Cislate/index.html')

    @cherrypy.expose
    def translate(self, latin):
        url = 'http://archives.nd.edu/cgi-bin/wordz.pl?keyword='
        request = requests.get(url + latin)
        html = BeautifulSoup(request.text, 'html.parser')
        translation = str(html.pre)[6:-9]
        return translation

    @cherrypy.expose
    def spanify(self, latin):
        return ''.join(['<span>'+word+'</span>\n' for word in latin.split()])


if __name__ == '__main__':
    config = {
        'global' : {
            'server.socket_host' : '0.0.0.0',
            'server.socket_port' : 3800
        }
    }
    cherrypy.quickstart(Cislate(), "/", config)
    #cherrypy.engine.exit()
