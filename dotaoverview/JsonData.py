import json
def steamidjson():
    with open ('steamid.json') as g:
        steamidlist = json.load(g)
    return steamidjson