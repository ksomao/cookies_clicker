var cookies = 0;
var cookiesBySecond = 0;
var cookiesByClick = 1;
var cookieDiv = document.querySelector(".button");
var scoreDiv = document.querySelector("#score");
var cookieBySecondDom = document.querySelector("#cookieBySecond");
var bonusDOM = document.querySelectorAll(".bonus");
var bonus2DOM = document.querySelectorAll(".bonus2");
var body = document.querySelector("body");

cookieDiv.addEventListener("click", function (e) {
console.log(cookies);
var x = document.createElement("div");
x.innerHTML = "+" + cookiesByClick;
body.appendChild(x);
x.style.position = "absolute";
x.style.top = (e.clientY-50) + "px";
x.style.left = e.clientX + "px";
x.classList.add("test");
setTimeout(function () {
body.removeChild(x);
}, 2000)
});

//Bonus par seconde
class bonusSecond {
    constructor(cost, type, cookiesBySecond) {
        this.cost = cost;
        this.cookiesBySecond = cookiesBySecond;
        this.type = type;
    }

    bonusLevelUp() {
        this.cost = Math.round(this.cost * 1.15);
    }
}

var cursor = new bonusSecond(50, 1, 1);
var grandMa = new bonusSecond(100, 1, 2);
var Farm = new bonusSecond(1000, 1, 8);
var bonusListeSecond = [cursor, grandMa, Farm]

cookieDiv.addEventListener("click", function () {
    cookies += cookiesByClick;
    scoreDiv.innerHTML = cookies;
    cookieBySecondDom.innerHTML = cookiesBySecond;
    console.log(cookiesByClick);
});

//Bonus par click
class bonusClick {
    constructor(cost, type, cookiesByClick) {
        this.cost = cost;
        this.cookiesByClick = cookiesByClick;
        this.type = type;
    }

    bonusLevelUp() {
        this.cost = Math.round(this.cost * 1.15);
    }
}
var upClick = new bonusClick(15, 2, 4);
var upClick2 = new bonusClick(20, 2, 5);
var upClick3 = new bonusClick(25, 2, 10);
var bonusListeClick = [upClick, upClick2, upClick3];

//Parcour le tableau divs(bonusDOM) et ajoute un événement click a chaque div(.bonus)
bonusDOM.forEach(function (bonus, index) {
    bonus.addEventListener("click", function () {
        if (cookies - bonusListeSecond[index].cost >= 0) {
            cookies -= bonusListeSecond[index].cost;
            //Augmentation du nombre de cookies par seconde en fontion du bonus activé
            cookiesBySecond += Math.round(bonusListeSecond[index].cookiesBySecond);
            //Level up du bonus qui entraine une augmentation du coût
            bonusListeSecond[index].bonusLevelUp();
            //Insertion du coût, dans la div enfannt(.cost) du bonus(.bonus)
            this.children[0].innerHTML = bonusListeSecond[index].cost;
            clearInterval(addCookiesEachSecond);
            //Appel de la fonction chaque seconde
            addCookiesEachSecond();
            setInterval(addCookiesEachSecond, 1000);
        }
    });
});

bonus2DOM.forEach(function (bonus, index) {
    bonus.addEventListener("click", function () {
      if (cookies - bonusListeClick[index].cost >= 0) {
            cookies -= bonusListeClick[index].cost;
            cookiesByClick += bonusListeClick[index].cookiesByClick;
            //Level up du bonus qui entraine une augmentation du coût
            bonusListeClick[index].bonusLevelUp();
            scoreDiv.innerHTML = cookies;

          }
    });
});


function addCookiesEachSecond() {
    cookies = cookies + cookiesBySecond;
    scoreDiv.innerHTML = cookies;
    cookieBySecondDom.innerHTML = cookiesBySecond;
}
