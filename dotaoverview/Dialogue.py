import TreeBinary
def dials():
    Discusion = TreeBinary.TreeB()
    Discusion.firstnode = TreeBinary.Asking("Tu mange des legumes ?")
    Discusion.add_message("Tu aime les Patates","oui","Tu mange des legumes ?")
    Discusion.add_message("Alors la Bonne Viande ?","non","Tu mange des legumes ?")


    Discusion.add_message("Bah alors ta de trés mauvais gouts","non","Tu aime les Patates")
    Discusion.add_message("Tu es si cruelle","non","Bah alors ta de trés mauvais gouts")
    Discusion.add_message("On fait la paix","oui","Bah alors ta de trés mauvais gouts")

    Discusion.add_message("Pourquoi tu ment comme ça","non","Alors la Bonne Viande ?")
    Discusion.add_message("On est d'accord","oui","Pourquoi tu ment comme ça")
    Discusion.add_message("Mais azy toi aussi","non","Pourquoi tu ment comme ça")

    Discusion.add_message("Le club des vaillant Vodka ","oui","Tu aime les Patates")
    Discusion.add_message("Sale fou parle bien","non","Le club des vaillant Vodka ")
    Discusion.add_message("Allons sur Paris ensemble","oui","Le club des vaillant Vodka ")

    Discusion.add_message("UNNNN WIWIWIWIW WINNER","oui","Alors la Bonne Viande ?")
    Discusion.add_message("Bah fallait dire non","oui","UNNNN WIWIWIWIW WINNER")
    Discusion.add_message("Ta du repondant j'aime bien","non","UNNNN WIWIWIWIW WINNER")
    return Discusion