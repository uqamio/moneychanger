"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var Caisse = (function () {
    //On se sert du constructeur pour faire certaines validations. On pourrait thrower...mais bon c une démo!

    function Caisse(montant) {
        _classCallCheck(this, Caisse);

        //Créer des variables d'exécution
        this.denominationSous = [25, 10, 5];
        this.denominationBillet = [100, 50, 20, 10, 5, 2, 1];

        this.montant = montant;

        this.billet = Math.floor(this.montant);
        this.sous = (montant - this.billet) * 100;

        //Appliquer la règle de l'élimonation de la pièce de un cent.
        var modulo = this.sous % 5;
        this.sous = modulo >= 3 ? this.sous + (5 - modulo) : this.sous - modulo;

        //À 100 sous on ajoute un dollar
        if (this.sous == 100) {
            this.sous = 0;
            this.billet += 1;
        }
    }

    _createClass(Caisse, [{
        key: "change",

        //Petite fonction utilidatire qui décompose un nombre en fonction de dénominations.
        value: (function (_change) {
            function change(_x, _x2) {
                return _change.apply(this, arguments);
            }

            change.toString = function () {
                return _change.toString();
            };

            return change;
        })(function (montant, denominations) {
            var change = [];
            denominations.forEach(function (denomination) {
                var de = Math.floor(montant / denomination);
                change.push(de);
                montant -= de * denomination;
            });
            return change;
        })
    }, {
        key: "redonnerChange",

        //Va affiche les informations des billets et des pièces `donner
        value: function redonnerChange() {
            var changeSous = this.change(this.sous, this.denominationSous);
            var changeBillet = this.change(this.billet, this.denominationBillet);

            //Messages des billet et sous à donner
            console.log("Billets et pièces à remettre pour le montant de %s$.", this.montant);

            for (var i = 0; i < this.denominationBillet.length; i++) {
                if (changeBillet[i] > 0) {
                    var typeDenomination = this.denominationBillet[i] > 2 ? "billet(s)" : "pièce(s)";
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
    }]);

    return Caisse;
})();

var caisse = new Caisse("10.27");
caisse.redonnerChange();
