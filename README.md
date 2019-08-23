# Cislate
A webapp to accelerate manual Latin translation by swift word lookup

To start translating, just run the main file app.py to start the server and open the webpage. If you close the webpage you must rerun cislate.py, not simply reload the webpage, in order to restart the translation server as well. If you want to force the server to shutdown, execute the following shell script:
lsof -ti tcp:3800 | xargs kill

Dependencies:

CherryPy - https://pypi.org/project/CherryPy/

requests - https://pypi.org/project/requests/

webbrowser - (native python) https://docs.python.org/2/library/webbrowser.html
