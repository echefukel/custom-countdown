const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button')







let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;




const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24 ;







// set Date Input min with todays date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// populate countdown / complete UI
const updateDOM = () =>{
    countdownActive = setInterval(() =>{
        const now = new Date().getTime();
        const distance = countdownValue - now;
    
        const days = Math.floor( distance / day);
        const hours = Math.floor((distance % day)/hour);
        const minutes = Math.floor((distance % hour)/minute);
        const seconds = Math.floor((distance % minute)/second);
          // hide input container
            inputContainer.hidden = true;

            // if the countdown has ended, show complete
    if(distance < 0){
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
    }else{
        // show countdown in progress
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`
        timeElements[1].textContent = `${hours}`
        timeElements[2].textContent = `${minutes}`
        timeElements[3].textContent = `${seconds}`
        completeEl.hidden = true;
        countdownEl.hidden = false;
    }
        
    },1000)

}

// reset all values
const reset = () =>{
    //Hide countdowns and show input
    countdownEl.hidden = true;
    completeEl.hidden= true;
    inputContainer.hidden = false;

    // stop the countdown
    clearInterval(countdownActive);
    // reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown')
}


// take values from form input
const updateCountdown = (e)=>{
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }
    console.log(savedCountdown)
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));

//    check if date has a value
if(countdownDate === ''){
    alert('please input valid date')
} else{
     // Get number version of current date
     countdownValue = new Date(countdownDate).getTime();
     updateDOM();
}
}
function restorePreviousCountdown(){
    // Get countdown from Localstorage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();

    }
}

// event Listeners
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click', reset)

// on load check local storage
restorePreviousCountdown();
