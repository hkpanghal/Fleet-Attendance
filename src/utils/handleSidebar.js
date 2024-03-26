
let display = window.innerWidth <= 700?false:true;

function checkDisplay(){
    return display;
}
function setDisplay(){
    display = !display;
}
export {checkDisplay,setDisplay}