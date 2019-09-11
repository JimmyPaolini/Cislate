import cherrypy, requests, re, webbrowser, os, os.path
from bs4 import BeautifulSoup

root = os.path.abspath('Cislate')
HOST = '127.0.0.1'
PORT = 3800
william = 'http://archives.nd.edu/'
whitakers = 'cgi-bin/wordz.pl?keyword='

class Cislate(): # http://127.0.0.1:3800
    @cherrypy.expose
    def index(self):
        return open(os.path.join(root, 'static/index.html'))

    @cherrypy.expose
    def shutdown(self):
        print("SHUTDOWN")
        cherrypy.engine.exit()
        #subprocess.call(['lsof -ti tcp:3800 | xargs kill'])

    @cherrypy.expose
    def translate(self, latin):
        if cherrypy.engine.state != cherrypy.engine.states.STARTED:
            return "proxy server error"
        url = william + whitakers + latin
        request = requests.get(url)
        html = BeautifulSoup(request.text, 'html.parser')
        translation = latin + "\n\n" + str(html.pre)[6:-9]
        return translation

if __name__ == "__main__":
    webbrowser.open_new_tab("http://127.0.0.1:3800")
    cherrypy.quickstart(Cislate(), '/', {
        'global' : {
            'server.socket_host' : HOST,
            'server.socket_port' : PORT,
            'server.shutdown_timeout': 1
        },
        '/': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': root
        },
        '/static': {
            'tools.staticfile.on': True,
            'tools.staticfile.filename': os.path.join(root, 'static')
        },
        '/script.js': {
            'tools.staticfile.on': True,
            'tools.staticfile.filename': os.path.join(root, 'static/script.js')
        },
        '/style.css': {
            'tools.staticfile.on': True,
            'tools.staticfile.filename': os.path.join(root, 'static/style.css')
        },
        '/favicon.ico': {
            'tools.staticfile.on': True,
            'tools.staticfile.filename': os.path.join(root, 'static/favicon.ico')
        }
    })
