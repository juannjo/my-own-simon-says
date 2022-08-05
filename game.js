
const h1 = $('#level-title');
const rng = () => Math.floor(Math.random() * 4)
const colors = ['green', 'red', 'blue', 'yellow'];
let gamePattern = [];
let blue = new Audio('./sounds/blue.mp3');
let green= new Audio('./sounds/green.mp3');
let red = new Audio('./sounds/red.mp3');
let yellow = new Audio('./sounds/yellow.mp3');
let wrongAudio = new Audio('./sounds/wrong.mp3');
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(e => {
    if(!started) {
        $(h1).text(`Level ${level}`)
        nextSequence()
        started = true;
    }
}); 

const nextSequence = () => {
    level++
    $(h1).text(`Level ${level}`);
    userClickedPattern = []
    let randomNumber = rng();
    let randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
};

$(".btn").click (e => {
    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatedPress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

const playSound = (selected) => {
    switch(selected){
        case "blue":
            blue.play();
            break;
        case "red":
            red.play();
            break;
        case "yellow":
            yellow.play();
            break;
        case "green":
            green.play();
            break;
    }
}

const animatedPress = (selected) => {
    $(`#${selected}`).addClass('pressed');
    setTimeout(() => {
        $(`#${selected}`).removeClass('pressed');
    }, 100)
}

const checkAnswer = (currentLevel) => {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct")
        console.log(userClickedPattern)
        console.log(gamePattern)

        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } 
    else {
        $(h1).text(`You reach level ${level}, press any key to restart!`)
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

const startOver = () => {
    started = false;
    level = 0;
    gamePattern = [];
}