window.onload = function() {
    console.log("loaded");
    var overlay = document.getElementById("overlay");
    var gallery = document.getElementById("gallery");
    var bigImage = document.getElementById("big-image");
    var closeOverlayBtn = document.getElementById("close-overlay-btn");
    var body = document.getElementsByTagName("BODY")[0];
    var html = document.getElementsByTagName("HTML")[0];
    var scrollTop = 0;

    function enableScrolling() {
        body.className = "";
        html.className = "";
    }

    function disableScrolling() {
        body.className = "disable-scroll";
        html.className = "disable-scroll";
    }

    function openOverlay(imgSrc) {
        overlay.style.display = "block";
        disableScrolling();
        bigImage.src = imgSrc;
        var size = getNewImgSize(bigImage);
        window.size = size;
        bigImage.style.width = size.width + "px";
        bigImage.style.height = size.height + "px";
        var topOffset = window.innerHeight * ((1 -(size.height / window.innerHeight)) / 2);
        var leftOffset = window.innerWidth * ((1 -(size.width / window.innerWidth)) / 2);
        bigImage.style.top = posTop() + topOffset + "px";
        bigImage.style.left = leftOffset + "px";
    }

    function imageClick(e) {
        if (e.target.nodeName == "IMG") {
            openOverlay(e.target.src);
        }
    }

    function closeOverlay(e) {
        if (e.key == "Escape" || e.target.id == closeOverlayBtn.id || e.target.id == "overlay") {
            overlay.style.display = "none";
            enableScrolling();
        }
    }

    window.posTop = function() {
        return typeof window.pageYOffset != 'undefined' ? window.pageYOffset: document.documentElement.scrollTop ? document.documentElement.scrollTop: document.body.scrollTop? document.body.scrollTop:0;
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
    document.addEventListener("keyup", closeOverlay);
    document.addEventListener("click", closeOverlay);
    closeOverlayBtn.addEventListener("click", closeOverlay);
}