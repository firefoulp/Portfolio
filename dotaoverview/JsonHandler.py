import json
import discord
from discord.ext import commands
import requests

with open ('heroes.json') as f:
    heroListJson = json.load(f)
with open ('steamid.json') as f:
     steamidlist = json.load(f)
def HeroeID(id):
    for hero in heroListJson["heroes"]: #permet de me find mon heroe  
        if str(id) == str(hero['id']):
            return hero["localized_name"]
def AllHeroes():
    herolist= ["",""]
    for hero in heroListJson["heroes"]:
        if len(herolist[0]) >= 1965: # je separe sinon il fait plus de 2000 caractere 
            herolist[1]=str(herolist[1]) + "Name  = " + str(hero['name'] + " ID  = " + str(hero['id'])+'\n')
        if len(herolist[0]) <= 1950:
            herolist[0]=str(herolist[0]) + "Name  = " + str(hero['name'] + " ID  = " + str(hero['id'])+'\n')
        
    # print(len(herolist[1]))
    # print("000000000000000000000")
    # print(len(herolist[0]))
    return herolist
def Herolimit(id,limit,accountid):
    print("https://api.opendota.com/api/players/"+str(accountid)+"/heroes?limit="+str(limit))
    Request=requests.get("https://api.opendota.com/api/players/"+str(accountid)+"/wl?hero_id="+str(id)+"&limit="+str(limit))
    Win = Request.json()['win']
    Lose = Request.json()['lose']
    mylist = [Lose,Win]
    if mylist == "<Response [400]>":
        return " ERROR "
    if ( int(Win) + int(Lose) ) == int(limit):
        return ('Sur les ' + str(limit) + ' games avec '+ HeroeID(id) +' tu as Gagné  '+ str(mylist[0]) + ' fois  Et ta Lose ' + str(mylist[1]) + ' fois')
    temp=limit
    limit= Win + Lose
    return ('Tu a pas fait '+str(temp)+ " Mais plutôt " + str(limit) + ' games au  total avec '+ HeroeID(id) +' et tu as Gagné  '+ str(mylist[0]) + ' fois  Et ta Lose ' + str(mylist[1]) + ' fois')
def checkingaccount(id):#j'ai penser que a la fin mais c'etait plus simple de les mettre dans un object mais meme cette methode je la crains du coup j'ai jouer la securité 
    for accountid in steamidlist["discordidaccount"]:
        if accountid["accountid"] == str(id):
            return True
    return False


def accountsteamid(id):
    for accountid in steamidlist["discordidaccount"]:
        if accountid['accountid'] == str(id):
            return accountid['idsteam']
    return None


def addaccountwithid(id,steamid):
    update = {"accountid": str(id), "idsteam": str(steamid)}
    write_json(update) 
    
    
    
def write_json(new_data, filename='steamid.json'): # prise sur le site https://www.geeksforgeeks.org/append-to-json-file-using-python/
    with open(filename,'r+') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        file_data["discordidaccount"].append(new_data)
        # Sets file's current position at offset.
        file.seek(0)
        # convert back to json.
        json.dump(file_data, file, indent = 4)