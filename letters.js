document.addEventListener("DOMContentLoaded", function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        getElementById('full-container').style.display = 'none';
        document.createElement("P").innerHTML = "😢 please use your desktop browser to open this site";
    }

    let textContainer = document.getElementById("title");
    let textTitle = document.getElementById("content");
    var inst = setInterval(change, 5000);
    let instructions = ['Move your head to change color', 'Open and close your mouth to control diameter', 'Click on the image to stop', 'Right click + Save Image to save your work'];
    var counter = 0;

    function change() {
        textTitle.innerHTML = instructions[counter];
        counter ++;
        if (counter >= instructions.length) {
            counter = 0;
        }
    }
});

