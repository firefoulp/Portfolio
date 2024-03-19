import requests
class AccountDota:
    def __init__(self,ID):
        self.ID = ID
        self.Jsonaccount =  MyaccountJson(ID)
        self.Name = self.Jsonaccount.json()['profile']['personaname']
        self.Avatarurl = self.Jsonaccount.json()['profile']['avatar']
        
    def ShowWin(self):
        Request=requests.get('https://api.opendota.com/api/players/'+str(self.ID)+'/wl') 
        Win = Request.json()['win']
        Lose = Request.json()['lose']
        mylist = [Lose,Win]
        return mylist
    def Lastgamecount(self,limit):
        Request=requests.get('https://api.opendota.com/api/players/'+str(self.ID)+'/wl?limit='+str(limit))
        print('https://api.opendota.com/api/players/'+str(self.ID)+'/wl?limit='+str(limit))
        Win = Request.json()['win']
        Lose = Request.json()['lose']
        mylist = [Lose,Win]
        if mylist == "<Response [400]>":
            return " ERROR "
        return ('Sur les ' + str(limit) + ' games tu a Gagné = '+ str(mylist[0]) + ' Et ta Lose = ' + str(mylist[1]))
        
    def Perc(self): # ICI il renvoie un string de mes match global
        mylist = self.ShowWin()
        total = mylist[1] + mylist[0]
        print(total)
        perc = mylist[1]/total * 100
        return str(round(perc,2))
def MyaccountJson(IDaccount):
    ApidotaMatch = requests.get('https://api.opendota.com/api/players/'+str(IDaccount))
    return ApidotaMatch
    
print(AccountDota(110643261).Name)
print(AccountDota(110643261).Perc())