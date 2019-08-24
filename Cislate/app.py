import cherrypy, requests, re, webbrowser, os, os.path
from bs4 import BeautifulSoup

class Cislate(): # http://127.0.0.1:3800
    @cherrypy.expose
    def index(self):
        return open(os.path.join(os.path.abspath(''), 'static/index.html'))

    @cherrypy.expose
    def shutdown(self):
        print("SHUTDOWN")
        cherrypy.engine.exit()
        #subprocess.call(['lsof -ti tcp:3800 | xargs kill'])

    @cherrypy.expose
    def translate(self, latin):
        if cherrypy.engine.state != cherrypy.engine.states.STARTED:
            return "server shutdown, restart to translate"
        url = 'http://archives.nd.edu/cgi-bin/wordz.pl?keyword='
        request = requests.get(url + latin)
        html = BeautifulSoup(request.text, 'html.parser')
        translation = latin + "\n\n" + str(html.pre)[6:-9]
        return translation

    @cherrypy.expose
    def processLatin(self, latin):
        if cherrypy.engine.state != cherrypy.engine.states.STARTED:
            return "server shutdown, restart to translate"
        return ''.join(['<span>'+elt+'</span>\n' if elt is not '\n' else '<br>' for elt in re.findall(r'\S+|\n',latin)])

if __name__ == "__main__":
    webbrowser.open_new_tab("http://127.0.0.1:3800")
    cherrypy.quickstart(Cislate(), '/', {
        'global' : {
            'server.socket_host' : '127.0.0.1',
            'server.socket_port' : 3800,
            'server.shutdown_timeout': 1
        },
        '/': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': os.path.abspath('')
        },
        '/static': {
            'tools.staticfile.on': True,
            'tools.staticfile.filename': os.path.abspath('./static')
        },
        '/style.css': {
            'tools.staticfile.on': True,
            'tools.staticfile.filename': os.path.abspath('./static/style.css')
        },
        '/favicon.ico': {
            'tools.staticfile.on': True,
            'tools.staticfile.filename': os.path.abspath('./static/favicon.ico')
        }
    })
