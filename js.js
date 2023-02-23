var SumaK = 0;
var Suma = 0;

var kontoK = 0;
var kontoj = 0; 

var hidden;
var deck;

var CanHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["P", "K", "T", "Ka"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }

}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    SumaK += getValue(hidden);
    kontoK += checkAce(hidden);
    while (SumaK < 17) {
    let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./karty/" + card + ".png";
        SumaK += getValue(card);
        kontoK += checkAce(card);
        document.getElementById("kartyk").append(cardImg);
    }
    console.log(SumaK);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./karty/" + card + ".png";
        Suma += getValue(card);
        kontoj += checkAce(card);
        document.getElementById("kartyj").append(cardImg);
    }

    console.log(Suma);
    document.getElementById("dobierz").addEventListener("click", dobierz);
    document.getElementById("stop").addEventListener("click", stop);

}

function dobierz() {
    if (!CanHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./karty/" + card + ".png";
    Suma += getValue(card);
    kontoj += checkAce(card);
    document.getElementById("kartyj").append(cardImg);

    if (reduceAce(Suma, kontoj) > 21) { 
        CanHit = false;
    }

}
function getValue(card) {
    let data = card.split("-"); 
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(Sumaja, kontoja) {
    while (Sumaja > 21 && kontoja > 0) {
        Sumaja -= 10;
        kontoja -= 1;
    }
    return Sumaja;
}

function stop() {
    SumaK = reduceAce(SumaK, kontoK);
    Suma = reduceAce(Suma, kontoj);

    CanHit = false;
    document.getElementById("hidden").src = "./karty/" + hidden + ".png";

    let message = "";
    if (Suma > 21) {
        message = "Przegrałeś! :(";
    }
    else if (SumaK > 21) {
        message = "Wygrałeś!";
    }
    
    else if (Suma == SumaK) {
        message = "Remis!";
    }
    else if (Suma > SumaK) {
        message = "Wygrałeś!";
    }
    else if (Suma < SumaK) {
        message = "Przegrałeś! :(";
    }

    document.getElementById("sumak").innerText = SumaK;
    document.getElementById("suma").innerText = Suma;
    document.getElementById("wynik").innerText = message;
}

