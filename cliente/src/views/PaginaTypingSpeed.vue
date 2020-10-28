<template>

<section class="test-area">
            <div id="origin-text">
                <p id="eo"> hola</p>
            </div><!-- #origin-text -->

            <div class="test-wrapper">
                <textarea id="test-aarea" name="textarea" rows="6" placeholder="The clock starts when you start typing."></textarea>
            </div><!-- .test-wrapper -->

            <div class="meta">
                <section id="clock">
                    <div class="timer">00:00:00</div>
                </section>

                <button id="reset">Start over</button>
            </div><!-- .meta -->
</section><!-- .test-area -->

</template>

<script>

const testWrapper = require('jquery')
const testArea = require('jquery')
const originText = require('jquery')
const resetButton = require('jquery')
const theTimer = require('jquery')

global.testWrapper = document.querySelector(".test-wrapper");
global.testArea = document.querySelector("#test-aarea");
global.originText = document.querySelector("#eo");
global.resetButton = document.querySelector("#reset");
global.theTimer = document.querySelector(".timer");


var timer = [0,0,0,0];
var interval;
var timerRunning = false;


function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}


function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;


    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0]* 60));
    timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0] * 6000));
}


function spellCheck() {
    let textEntered = document.getElementById("test-aarea").value;
    let originTextMatch = document.getElementById("eo").innerHTML.substring(0, textEntered.length);

    if(textEntered == document.getElementById("eo").innerHTML) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if(textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

    console.log(textEntered);
}

function start() {
    let textEnteredLength = document.getElementById("test-aarea").value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

}




document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("test-aarea").addEventListener("keypress", start, false);
  document.getElementById("test-aarea").addEventListener("keyup", spellCheck, false);
  document.getElementById("reset").addEventListener("click", reset, false);
});

</script>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
	clear: both;
}

p {
	margin-bottom: 1.5em;
}

b,
strong {
	font-weight: bold;
}

dfn,
cite,
em,
i {
	font-style: italic;
}

blockquote {
	margin: 0 1.5em;
}

address {
	margin: 0 0 1.5em;
}

pre {
	background: #eee;
	font-family: "Courier 10 Pitch", Courier, monospace;
	font-size: 15px;
	font-size: 1.5rem;
	line-height: 1.6;
	margin-bottom: 1.6em;
	max-width: 100%;
	overflow: auto;
	padding: 1.6em;
}

code,
kbd,
tt,
var {
	font: 15px Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
}

abbr,
acronym {
	border-bottom: 1px dotted #666;
	cursor: help;
}

mark,
ins {
	background: #fff9c0;
	text-decoration: none;
}

sup,
sub {
	font-size: 75%;
	height: 0;
	line-height: 0;
	position: relative;
	vertical-align: baseline;
}

sup {
	bottom: 1ex;
}

sub {
	top: .5ex;
}

small {
	font-size: 75%;
}

big {
	font-size: 125%;
}

/*--------------------------------------------------------------
Layout
--------------------------------------------------------------*/
body {
    margin: 0;
    padding: 0;
}

.masthead {
    padding: 1em 2em;
    background-color: #2e0d1a;
    color: white;
}

.masthead h1 {
    text-align: center;
}

.intro {
    padding: 2em 2em;
    color: #ffffff;
    background: #985d42;
}


.intro p,
.test-area {
    margin: 0 auto;
    max-width: 550px;
}

.test-area {
    margin-bottom: 4em;
    padding: 0 2em;
}

.test-wrapper {
    border: 10px solid grey;
    border-radius: 10px;
}

#origin-text {
    margin: 1em 0;
    padding: 1em 1em 0;
    background-color: #ededed;
}

#origin-text p {
    margin: 0;
    padding-bottom: 1em;
}

.test-wrapper {
    display: flex;
}

.test-wrapper textarea {
    flex: 1;
}

.meta {
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.timer {
    font-size: 3em;
    font-weight: bold;
}

#reset {
    padding: .5em 1em;
    font-size: 1.2em;
    font-weight: bold;
    color: #E95D0F;
    background: white ;
    border: 10px solid #E95D0F;
}

#reset:hover {
    color: white;
    background-color: #E95D0F;
}

.credits {
  text-align: center;
  font-size: 0.8em;
}
</style>
