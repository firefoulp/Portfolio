class Asking :
    def __init__(self,data):
        self.message = data
        self.Yes = None
        self.Non = None
    def add_message(self, new_message, yes_or_no, old_message ):
        if self.message == old_message :
            if yes_or_no == "oui":
                self.Yes = Asking(new_message)
            else:
                self.Non = Asking(new_message)
        else:
            if self.Yes != None:
                self.Yes.add_message(new_message, yes_or_no, old_message )
            if self.Non != None:
                self.Non.add_message(new_message, yes_or_no, old_message )
    def search(self,message):
        if self.message == message:
            return True
        if message == self.Yes.message:
            return True
        if message == self.Non.message:
            return False
        else:
            if self.Yes != None:
                self.Yes.search(message)
            if self.Non != None:
                self.Non.search(message)
        if self.Yes==None and self.Non == None :
            return False
class TreeB:
    def __init__(self):
        self.firstnode=None
        self.currentMss=None
    def next_message(self, yes_or_no):
        if self.currentMss == None:
            if yes_or_no == "yes":
                if self.firstnode != None:
                    print(self.firstnode.Yes.message)
                    self.currentMss = self.firstnode.Yes
                    return
            else:
                if self.firstnode != None:
                    print(self.firstnode.Non.message)
                    self.currentMss = self.firstnode.Non
                    return
        else:
            if yes_or_no == "yes":
                if self.currentMss != None:
                    print("Test YES avec suite de reponse")
                    self.currentMss = self.currentMss.Yes
                    return
            else:
                if self.currentMss != None:
                    print("TEST NOPE AVEC SUITE DE REPONSE")
                    self.currentMss = self.currentMss.Non
                    return
    def reset(self):
        self.currentMss = self.firstnode
    
       
    def add_message(self, new_message, yes_or_no, old_message ):
        self.firstnode.add_message(new_message, yes_or_no, old_message)
        
        




