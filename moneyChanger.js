class Caisse {
    //On se sert du constructeur pour faire certaines validations. On pourrait thrower...mais bon c une démo!
    constructor(montant) {
        //Créer des variables d'exécution
        this.denominationSous = [25, 10, 5];
        this.denominationBillet = [100, 50, 20, 10, 5, 2, 1];

        this.montant = montant;

        this.billet = Math.floor(this.montant);
        this.sous = (montant - this.billet) * 100;

        //Appliquer la règle de l'élimonation de la pièce de un cent.
        var modulo = this.sous % 5;
        this.sous = ( modulo >= 3) ? this.sous + (5 - modulo) : this.sous - ( modulo);

        //À 100 sous on ajoute un dollar
        if (this.sous == 100) {
            this.sous = 0;
            this.billet += 1;
        }
    }

    //Petite fonction utilidatire qui décompose un nombre en fonction de dénominations.
    change(montant, denominations) {
        var change = [];
        denominations.forEach((denomination) => {
            var de = Math.floor(montant / denomination);
            change.push(de);
            montant -= de * denomination;
        });
        return change
    }

    //Va affiche les informations des billets et des pièces `donner
    redonnerChange() {
        var changeSous = this.change(this.sous, this.denominationSous);
        var changeBillet = this.change(this.billet, this.denominationBillet);

        //Messages des billet et sous à donner
        console.log("Billets et pièces à remettre pour le montant de %s$.", this.montant);

        for (var i = 0; i < this.denominationBillet.length; i++) {
            if (changeBillet[i] > 0) {
                var typeDenomination = (this.denominationBillet[i] > 2) ? "billet(s)" : "pièce(s)";
                console.log("%s %s de %s dollar.", changeBillet[i], typeDenomination, this.denominationBillet[i]);
            }
        }
        console.log("---- Change");
        for (var i = 0; i < this.denominationSous.length; i++) {
            if (changeSous[i] > 0) {
                console.log("%s pièce(s) de %s sous.", changeSous[i], this.denominationSous[i]);
            }
        }
    }
}

var caisse = new Caisse("10.27");
caisse.redonnerChange();