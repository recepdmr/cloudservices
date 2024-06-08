import os
from flask import Flask
from application_list import storeList

GIT_API_URL = os.getenv('GIT_API_URL', 'no url') 
GIT_ACCESS_TOKEN = os.getenv('GIT_ACCESS_TOKEN', 'no token') 

app = Flask(__name__)

@app.route('/application/list', methods=['GET'])
def getList(): 
    return storeList(GIT_API_URL,GIT_ACCESS_TOKEN)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=os.getenv('SERVE_PORT','8081'))