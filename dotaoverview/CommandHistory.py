class logd:
    def __init__(self,command):
        self.command = command
        self.nextnode = None
        self.lastnode = None
class historylog:
    def __init__(self):
        self.first_node = None
        self.last_node = None
        self.size = 0
    def clear_list(self):
        self.first_node = None
        self.last_node = None
    def append(self,data):
        lastnode=None
        if self.first_node == None:
            self.first_node = logd(data)
            return
        current_node = self.first_node
        while current_node.nextnode != None:
            lastnode = current_node
            current_node = current_node.nextnode
        new_node = logd(data)
        current_node.lastnode = lastnode
        current_node.nextnode = new_node
    def showlast(self):
        if self.first_node == None:
            return "Rien trouver"
        current_node = self.first_node
        while current_node.nextnode != None:
            lastnode = current_node
            current_node = current_node.nextnode
        current_node = lastnode
        return current_node.command
    def showall(self):
        if self.first_node == None:
            print("Cleared")
            return 
        else:
            current_node = self.first_node
            while current_node.nextnode != None:
                lastnode = current_node
                print(current_node.command)
                current_node = current_node.nextnode
    