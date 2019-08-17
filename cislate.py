import cherrypy, requests, re, webbrowser, os, os.path
from bs4 import BeautifulSoup

class Cislate(): # http://0.0.0.0:3000
    @cherrypy.expose
    def index(self):
        return open('/Users/jimmy/Documents/Cislate/index.html')

    @cherrypy.expose
    def shutdown(self):
        cherrypy.engine.exit()

    @cherrypy.expose
    def translate(self, latin):
        if cherrypy.engine.state != cherrypy.engine.states.STARTED:
            return "server shutdown, restart to translate"
        url = 'http://archives.nd.edu/cgi-bin/wordz.pl?keyword='
        request = requests.get(url + latin)
        html = BeautifulSoup(request.text, 'html.parser')
        translation = str(html.pre)[6:-9]
        return translation

    @cherrypy.expose
    def spanify(self, latin):
        if cherrypy.engine.state != cherrypy.engine.states.STARTED:
            return "server shutdown, restart to translate"
        return ''.join(['<span>'+elt+'</span>\n' if elt is not '\n' else '<br>' for elt in re.findall(r'\S+|\n',latin)])

config = {
    'global' : {
        'server.socket_host' : '127.0.0.1',
        'server.socket_port' : 3800
    },
    '/': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "/Users/jimmy/Documents/Cislate"
        }
}
webbrowser.open_new_tab("http://127.0.0.1:3800")
cherrypy.quickstart(Cislate(), "/", config)
#cherrypy.engine.exit()
