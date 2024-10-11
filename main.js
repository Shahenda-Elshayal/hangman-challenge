let letters = "abcdefghijklmnopqrstuvwxyz";
let letterContainer = document.querySelector(".letters");

let alpha = Array.from(letters);

alpha.forEach(e => {
    let span = document.createElement("span");
    span.innerHTML = e;
    span.className = "letter-box";
    letterContainer.append(span);
})

let words = {
    programming: ["HTML", "JavaScript", "CSS", "C++", "PHP", "Laravel", "Python", "Ruby", "React", "Node"],
    country: ["Egypt", "Syria", "France", "Germany", "Italy", "USA", "Qatar", "Brazil", "Japan", "Australia"],
    fruits: ["Apple", "Banana", "Cherry", "Mango", "Pineapple", "Strawberry", "Watermelon", "Orange", "Grapes", "Peach"],
    sports: ["Basketball", "Tennis", "Cricket", "Baseball", "Hockey", "Swimming", "Golf", "Cycling"],
    cities: ["London", "Paris", "New York", "Tokyo", "Cairo", "Sydney", "Dubai", "Berlin", "Rome", "Toronto"],
    vehicles: ["Bicycle", "Motorcycle", "Car", "Bus", "Train", "Airplane", "Helicopter", "Boat", "Truck"]
};

// get all keys of the object
let keys = Object.keys(words);

// get random number based on keys length
let randomNumKey = Math.floor(Math.random() * keys.length);

// get the category name
let randomPropName = keys[randomNumKey];
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// *********************************************************************

// get the category values or words
let randomPropValues = words[randomPropName];

// get random number for words of category
let randomNumValue = Math.floor(Math.random() * randomPropValues.length);

// get a random value of the category
let randomValueValue = randomPropValues[randomNumValue];

console.log(randomValueValue);


// Putting the letters in the div
let lettersGuessContainer = document.querySelector(".letters-guess");
let choosenWord = Array.from(randomValueValue);

choosenWord.forEach(e => {
    let spanWord = document.createElement("span");
    // spanWord.innerHTML = e;

    if (e === " ") {
        spanWord.className = "has-space";
    }
    lettersGuessContainer.append(spanWord);
})

let allSpans = document.querySelectorAll(".letters-guess span");
let theStatus = false;

// get the hangman-draw
let theDraw = document.querySelector(".hangman-draw")
let wrongAttempts = 0;

// get the Audio
let success = document.querySelector("#success");
let fail = document.querySelector("#fail");
let gameOver = document.querySelector("#gameover");
let victory = document.querySelector("#victory");


document.addEventListener("click", e => {
    if (e.target.className == "letter-box") {
        e.target.classList.add("clicked")
        let letterClicked = e.target.innerHTML.toLowerCase();

        // console.log(e.target.innerHTML);
        theStatus = false;
        choosenWord.forEach((letterWord, indexWord) => {
            if (letterClicked === letterWord.toLowerCase()) {
                // console.log(indexWord);
                theStatus = true;
                allSpans.forEach((rightLetter, rightIndex) => {

                    if (indexWord == rightIndex) {
                        rightLetter.innerHTML = letterClicked;
                    }
                })
            }
        })

        // ####################################

        let allGuessed = Array.from(allSpans).every(span => {
            return span.className === "has-space" || span.innerHTML !== ""; // Check if spans are filled
        });

        if (allGuessed) {
            displayVictoryMessage(); // Call function to display victory message
        }

        // ####################################

        // console.log(theStatus);
        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            fail.play();
            if (wrongAttempts === 8) {
                console.log("failed");

                letterContainer.classList.add("finished");
                popup();

            }
        }
        else {
            success.play();
        }

        // console.log(wrongAttempts)

    }
})

// get the layout
let total = document.querySelector(".total");

function popup() {
    let div = document.createElement("div");
    div.innerHTML = `Whoops! It seems your brain went on vacation 🌴 and forgot to take you along! Better luck next time! 🤣 the word was "${choosenWord.join("")}"`;
    div.className = "pop";
    document.body.append(div);
    total.style.display = "block";
    gameOver.play();
}

function displayVictoryMessage() {
    let victoryDiv = document.createElement("div");
    victoryDiv.innerHTML = `🎉 You did it! Who knew your brain was hiding so much genius? Time to celebrate with some pizza! 🍕😋`;
    victoryDiv.className = "victory-message";
    document.body.append(victoryDiv);
    total.style.display = "block";
    victory.play();
}