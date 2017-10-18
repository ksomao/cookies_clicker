var cookies = 0;
var cookiesBySecond = 0;
var cookieDiv = document.querySelector(".buttonContainer");
var scoreDiv = document.querySelector("#score");
var cookieBySecondDom = document.querySelector("#cookieBySecond");
var bonusDOM = document.querySelectorAll(".bonus");


class bonus {
    constructor(cost, type, cookiesBySecond) {
        this.cost = cost;
        this.cookiesBySecond = cookiesBySecond;
        this.type = type;
    }

    bonusLevelUp() {
        this.cost = Math.round(this.cost * 1.15);
    }
}

var cursor = new bonus(50, 1, 1);
var grandMa = new bonus(100, 1, 2);
var Farm = new bonus(1000, 1, 8);
var bonusListe = [cursor, grandMa, Farm];


cookieDiv.addEventListener("click", function () {
    cookies++;
    scoreDiv.innerHTML = cookies;
    cookieBySecondDom.innerHTML = cookiesBySecond;
});

//Parcour le tableau divs(bonusDOM) et ajoute un événement click a chaque div(.bonus)
bonusDOM.forEach(function (bonus, index) {
    bonus.addEventListener("click", function () {
        if (cookies - bonusListe[index].cost >= 0) {
            cookies -= bonusListe[index].cost;
            //Augmentation du nombbre de cookies par seconde en fontion du bonus activé
            cookiesBySecond += Math.round(bonusListe[index].cookiesBySecond);
            //Level up du bonus qui entraine une augmentation du coût
            bonusListe[index].bonusLevelUp();
            //Insertion du coût, dans la div enfannt(.cost) du bonus(.bonus)
            this.children[0].innerHTML = bonusListe[index].cost;
            clearInterval(addCookiesEachSecond);
            //Appel de la fonction chaque seconde
            addCookiesEachSecond();
            setInterval(addCookiesEachSecond, 1000);
        }
    });
});


function addCookiesEachSecond() {
    cookies = cookies + cookiesBySecond;
    scoreDiv.innerHTML = cookies;
    cookieBySecondDom.innerHTML = cookiesBySecond;
}
