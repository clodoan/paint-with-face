document.addEventListener("DOMContentLoaded", function() {
    let textContainer = document.getElementById("title");
    let textTitle = document.getElementById("content");
    var inst = setInterval(change, 5000);
    let instructions = ['Move your head to change color', 'Open and close your mouth to control diameter', 'Click on the image to stop', 'Right click + Save Image to save your work'];
    var counter = 1;
    
    
    function change() {
        // console.log(textContainer); 
        textTitle.innerHTML = instructions[counter];
        counter ++;
        if (counter >= instructions.length) {
            counter = 0;
        }
    }

});

