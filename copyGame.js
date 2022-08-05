

$(document).keydown(e => gameStart(e.key, randomGen()));

const randomGen = () => Math.floor(Math.random() * 4);

const colorsArray = ["red", "blue", "green", "yellow"];

const allText = $("#level-title");

const gameStart = (key, number) => {
    if(key === "a"){
        counter++;
        setColors(number);
    } 
}

const setColors = (number) => {
    let counter;
    
    let actualColor = $(`#${colorsArray[number]}`);
    allText.text(`Level ${counter}`)
    actualColor.addClass("pressed");
    
    $(document).click(f => {
        if(f.target.id === colorsArray[number]) {
            nextLevel(actualColor)
        }
        else {
            counter = 0;
            youLost(actualColor);
        }
    })
}

const nextLevel= (actualColor) => {
    actualColor.removeClass("pressed")
    setColors(randomGen());
    console.log(counter)
};


const youLost = (actualColor) => {
    actualColor.removeClass("pressed")
    allText.text("Game Over, press any key to continue!");
    $(document).keydown(e => {
        gameStart("a", randomGen())
    })
};