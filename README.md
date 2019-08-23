# Cislate
A webapp to accelerate manual Latin translation by swift word lookup

To start translating, just run the main file cislate.py to start the server and open the webpage. If you close the webpage you must rerun cislate.py, not simply reload the webpage, in order to restart the translation server as well. If you want to force the server to shutdown, execute the following shell script:
lsof -ti tcp:3800 | xargs kill

Files:

cislate.py - server, handles Latin text processing and word translation
index.html - webpage interface (build on Bootstrap)
style.css - additional styling (supplementing Bootstrap)
favicomatic - favicons for the webpage (created with http://www.favicomatic.com/)

Dependencies:

CherryPy - https://pypi.org/project/CherryPy/
requests - https://pypi.org/project/requests/
webbrowser - (native python) https://docs.python.org/2/library/webbrowser.html
Bootstrap - https://getbootstrap.com/docs/4.3/getting-started/download/
