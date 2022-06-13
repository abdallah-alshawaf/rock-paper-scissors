const body = document.body;
const container = document.querySelector('.container')
const menu = document.querySelector('.menu');
const game = document.querySelector('.game');
const computerlist = document.getElementsByClassName('computer-list');
const bigwins = document.querySelector('.win-container1');
const bigloses = document.querySelector('.lose-container');

//computer choices
const rockbtnc = document.getElementById('rockbtnc');
const paperbtnc = document.getElementById('paperbtnc');
const scissorsbtnc = document.getElementById('scissorsbtnc');
const computer = document.getElementsByName('computer-choice');

//my choices
const rockbtnh = document.getElementById('rockbtnh');
const paperbtnh = document.getElementById('paperbtnh');
const scissorsbtnh = document.getElementById('scissorsbtnh');


let result = [];
let computerpick;
let mypick;

//Scores
const myscoretxt = document.getElementById('myscoretxt');
const compscoretxt = document.getElementById('compscoretxt');
let counterofrounds = -1;

let myscore = 0;
let compscore = 0;

myscoretxt.textContent = `${myscore}`;
compscoretxt.textContent = `${compscore}`;

//Audio
const winsound = document.getElementById('winaudio');
const sadsound = document.getElementById('sadaudio');
const correctsound = document.getElementById('correctaudio');
const wrongsound = document.getElementById('wrongaudio');
const drawsound = document.getElementById('drawaudio');


//Customize
const customizes = document.getElementById('customizelist');
const title1 = document.getElementById('title1');
const title2 = document.getElementById('title2');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const mainrock = document.getElementById('mainrock');
const mainpaper = document.getElementById('mainpaper');
const mainscissors = document.getElementById('mainscissors');

const secondrock = document.getElementById('secondrock');
const secondpaper = document.getElementById('secondpaper');
const secondscissors = document.getElementById('secondscissors');

const thirdrock = document.getElementById('thirdrock');
const thirdpaper = document.getElementById('thirdpaper');
const thirdscissors = document.getElementById('thirdscissors');



function plays() {
    menu.remove();
    game.removeAttribute('hidden');
}

function gamefun(player1, player2) {
    let choicesArray = ["rock", "paper", "scissors"];
    // This array is the equivalent of ["water", "wood", "fire"] so there's no need to change it in the functions bellow.
    let player1choice = choicesArray.indexOf(player1);
    let player2choice = choicesArray.indexOf(player2);
    
    if (player1choice == player2choice) {
        result.push("draw")
    } else if (player1choice == 0 && player2choice == 2) {
        result.push("win")
    } else if (player1choice == 2 && player2choice == 0) {
        result.push("lost")
    } else if (player1choice > player2choice /*This saves us 2 if statements*/) {
        result.push("win")
    } else {
        result.push("lost")
    }
    
    mypick = player1;
    return animation();
  }

function animation() {
    declare_my_choice();
    computer.forEach(choice => choice.classList.add('computer-choices-animation'));
    setTimeout(declare_computer_choice, 1700);

}

function declare_computer_choice() {
    computer.forEach(choice => choice.classList.remove('computer-choices-animation'));
    if (computerpick == "rock") {
        paperbtnc.style.display = "none";
        scissorsbtnc.style.display = "none";
    } else if (computerpick == "scissors") {
        rockbtnc.style.display = "none";
        paperbtnc.style.display = "none";
    } else if (computerpick == "paper") {
        rockbtnc.style.display = "none";
        scissorsbtnc.style.display = "none";
    }

    return declare_winner();
}

function declare_my_choice() {
    if (mypick == "rock") {
        paperbtnh.style.display = "none";
        scissorsbtnh.style.display = "none";
    } else if (mypick == "scissors") {
        rockbtnh.style.display = "none";
        paperbtnh.style.display = "none";
    } else if (mypick == "paper") {
        rockbtnh.style.display = "none";
        scissorsbtnh.style.display = "none";
    }
}

function declare_winner() {
        counterofrounds++;
        if (result[counterofrounds] == "win") {
            return youwon()
        } else if (result[counterofrounds] == "lost") {
            return youlost()
        } else {
            return draw()
        }
     
}


function computerplayer() {
    myArray = ["rock", "paper", "scissors"];
    computerpick = myArray[Math.floor(Math.random()*3)];
    return computerpick;
}

function cleanchoices() {
    paperbtnh.style.display = "inline-block";
    scissorsbtnh.style.display = "inline-block";
    rockbtnh.style.display = "inline-block";
    paperbtnc.style.display = "inline-block";
    scissorsbtnc.style.display = "inline-block";
    rockbtnc.style.display = "inline-block";
}


function youwon() {
    correctsound.play();
    myscore++;
    myscoretxt.textContent = `${myscore}`;
    if (myscore == 2) {
        return setTimeout(() => {
            bigwin();
            }, 400);
    }
    
    return setTimeout(() => {
        if (counterofrounds == 0) {
            alert("You WON this round. First to 2 wins the game!");
        }
        setTimeout(cleanchoices, 350)
        }, 400);
}

function youlost() {
    wrongsound.play();
    compscore++;
    compscoretxt.textContent = `${compscore}`;
    if (compscore == 2) {
        return setTimeout(() => {
            biglose();
            }, 400);
    }
    return setTimeout(() => {
        if (counterofrounds == 0) {
            alert("You LOST this round. First to 2 wins the game!");
        }
        setTimeout(cleanchoices, 350)
    }, 400); 
}


function draw(){
    drawsound.play();
    return setTimeout(() => {
        if (counterofrounds == 0) {
            alert("Draw! First to 2 wins the game!");
        }
        setTimeout(cleanchoices, 350)
    }, 400); 

}

function bigwin() {
    winsound.play();
    bigwins.style.display = "flex";

}

function biglose() {
    sadsound.play();
    bigloses.style.display = "flex";
}

function playagain() {
    bigwins.style.display = "none";
    bigloses.style.display = "none";

    winsound.pause();
    winsound.currentTime = 0; 

    sadsound.pause();
    sadsound.currentTime = 0; 

    cleanchoices();
    result = [];
    counterofrounds = -1;
    compscore = 0;
    myscore = 0;
    myscoretxt.textContent = `${myscore}`;
    compscoretxt.textContent = `${compscore}`;

}

function xclick() {
    customizes.style.display = "none"
}

function customize() {
    customizes.style.display = "flex";
}

function change() {
    if (choice2.checked) {
        title1.textContent = "Water, Wood, Fire!";
        title2.textContent = "Water, Wood, Fire!";
        mainrock.src = "./img/Water.png";
        mainpaper.src = "./img/wood.png";
        mainscissors.src = "./img/fire.png";

        secondrock.src = "./img/Water.png";
        secondpaper.src = "./img/wood.png";
        secondscissors.src = "./img/fire.png";

        thirdrock.src = "./img/Water.png";
        thirdpaper.src = "./img/wood.png";
        thirdscissors.src = "./img/fire.png";


    }

    if (choice1.checked) {
        title1.textContent = "Rock, Paper, Scissors!";
        title2.textContent = "Rock, Paper, Scissors!";
        mainrock.src = "./img/rock.png";
        mainpaper.src = "./img/paper.png";
        mainscissors.src = "./img/scissors.png"

        secondrock.src = "./img/rock.png";
        secondpaper.src = "./img/paper.png";
        secondscissors.src = "./img/scissors.png"

        thirdrock.src = "./img/rock.png";
        thirdpaper.src = "./img/paper.png";
        thirdscissors.src = "./img/scissors.png"

    }
}


    

  
