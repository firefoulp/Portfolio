import discord
import Api
import JsonHandler
from discord.ext import commands
import asyncio
import json
import CommandHistory
import Dialogue
intents = discord.Intents.all()
logs= CommandHistory.historylog()
client = commands.Bot(command_prefix="!", intents = intents)
TreeDiscussion = Dialogue.dials()
# Async fais que les message sont asyncronne pour tout les msg asynchronne mettre un awaits avant pour eviter de surcharger le coeur
#une fonction asynchronne c'est quelque chose qui bloque pas le prgmme 
# exemple c'est comme faire deux chose en même temps , L'ordinateur va par exemple stocker quelque chose pendant que l'autre va recuperer des donné
@client.command(name="Hello")
async def delete(ctx):
    messages = await ctx.channel.history(limit=10)

    for each_message in messages:
        await each_message.delete()
        
@client.event

async def on_ready():
    print("Le bot est prêt !")

@client.command()

async def myidsteam(message,id):
  if JsonHandler.checkingaccount(message.author.id) == False:
    JsonHandler.addaccountwithid(message.author.id,id)
    await message.channel.send("Compte transferer")
    return
  await message.channel.send("Erreur compte deja present veuillez demander un changement")
    
  
@client.event

async def on_typing(channel, user, when):
     await channel.send(user.name+" is typing")

@client.event

async def on_member_join(member):
    general_channel = client.get_channel(1167470953522008157)
    await general_channel.send("Bienvenue sur le serveur ! "+ member.name)

@client.command()

async def lastcommand(ctx):
  await ctx.channel.send(logs.showlast())

@client.event

async def on_message(message):
  if message.author == client.user:
    return
  if message.content.startswith("!"):
    logs.append(message.content)
    print(message.content)
    # print("REUSSI")
    # print(logs.showall())
    await message.channel.send("Addd TOOO LOG")
  message.content = message.content.lower()

  if message.content.startswith("hello"):
    await message.channel.send("http://imgur.com/gallery/YiMUiop")

  await client.process_commands(message)
  if message.content == "help":
    if TreeDiscussion.currentMss == None:
      await message.channel.send(str(TreeDiscussion.firstnode.message))
    else:
      await message.channel.send(str(TreeDiscussion.currentMss.message))
  if message.content == "yes":
    TreeDiscussion.next_message(message.content)
    await message.channel.send(str(TreeDiscussion.currentMss.message))
  if message.content == "no" :
    TreeDiscussion.next_message(message.content)
    await message.channel.send(str(TreeDiscussion.currentMss.message))
  if message.content == "resetdials":
    TreeDiscussion.reset()
    await message.channel.send("Dials Reset")
    

    


@client.command()
async def clearlog(ctx):
  logs.showall()
  logs.clear_list()
  logs.showall()
  await ctx.channel.send("CLEAR")
  
  
@client.command()

async def searchdials(ctx,search): # command non fonctionnel pour le moment
  TreeDiscussion.firstnode.search(search)
  await ctx.channel.send(str(TreeDiscussion.firstnode.search(search)))
  
  
@client.command()

async def heroid(ctx):
  await ctx.channel.send(str(JsonHandler.AllHeroes()[0]))
  await ctx.channel.send(str(JsonHandler.AllHeroes()[1]))

@client.command()

async def herolimit(ctx,id,limit):
  if JsonHandler.checkingaccount(ctx.author.id) == True:
  # print(id)
  # print(limit)
   await ctx.send(JsonHandler.Herolimit(id,limit,JsonHandler.accountsteamid(ctx.author.id)))
   return
  await ctx.send("Veuillez faire votre insciprtion taper la commande !myidstream <ID steam>")
@client.command() 
async def limit(ctx,arg):
  print(arg)
  await ctx.send(Api.AccountDota(JsonHandler.accountsteamid(ctx.author.id)).Lastgamecount(arg))
  
@client.command()  
async def over(ctx):
  await ctx.send("TEST commande")
  
@client.command()
async def lvl(ctx):
  DotaProf = Api.AccountDota(JsonHandler.accountsteamid(ctx.author.id))
  await ctx.send(DotaProf.Avatarurl)
  await ctx.send('Ton score actuelle est de '+DotaProf.Perc())

client.run("Your discord Token")
