'use strict'
window.onload = function() {
    var overlay = document.getElementById("overlay");
    var gallery = document.getElementById("gallery");
    var bigImage = document.getElementById("big-image");
    var body = document.getElementsByTagName("BODY")[0];
    var html = document.getElementsByTagName("HTML")[0];
    //made into an array for use of indexOf
    var images = Array.prototype.slice.call(gallery.getElementsByTagName('img'));
    var scrollTop = 0;
    var currentImage;

    function enableScrolling() {
        body.className = "";
        html.className = "";
    }

    function disableScrolling() {
        body.className = "disable-scroll";
        html.className = "disable-scroll";
    }

    function openOverlay(img) {
        currentImage = img;
        overlay.style.display = "block";
        disableScrolling();
        bigImage.src = img.src;
        var size = getNewImgSize(bigImage);
        window.size = size;
        bigImage.style.width = size.width + "px";
        bigImage.style.height = size.height + "px";
        var topOffset = window.innerHeight * ((1 - (size.height / window.innerHeight)) / 2);
        var leftOffset = window.innerWidth * ((1 - (size.width / window.innerWidth)) / 2);
        bigImage.style.top = posTop() + topOffset + "px";
        bigImage.style.left = leftOffset + "px";
    }

    function imageClick(e) {
        if (e.target.nodeName == "IMG") {
            openOverlay(e.target);
        }
    }

    function nextImage(img) {
        var nextImage = images[mod((images.indexOf(img) + 1), images.length)];
        return nextImage;
    }

    function prevImage(img) {
        return images[mod((images.indexOf(img) - 1), images.length)];
    }

    //used because javascript remainder operator doesn't play well with negative numbers
    function mod(number, mod) {
        var remainder = number % mod;
        return Math.floor(remainder >= 0 ? remainder : remainder + mod);
    }

    function closeOverlay() {
        overlay.style.display = "none";
        enableScrolling();
    }

    function handleInput(e) {
        //e.which is the ESC key
        if (e.which == 27 || e.target.id == "overlay") {
            closeOverlay()
        }
        if (e.which == 39) {
            openOverlay(nextImage(currentImage));
        }
        if (e.which == 37) {
            openOverlay(prevImage(currentImage));
        }
    }

    window.posTop = function() {
        return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
    }

    function getNewImgSize(img) {
        var originalHeight = img.height;
        var originalWidth = img.width;
        var newWidth = window.innerWidth * .6;
        var newHeight = (originalHeight / originalWidth) * newWidth;
        return {
            "originalHeight": img.height,
            "originalWidth": img.width,
            "width": newWidth,
            "height": newHeight
        };
    }
    gallery.addEventListener("click", imageClick);
    document.addEventListener("keyup", handleInput);
    document.addEventListener("click", handleInput);
}