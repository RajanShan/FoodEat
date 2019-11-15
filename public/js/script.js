//function is called when user scrolls
window.onscroll = function () {
    setsticky();
};
//features
//to select feature class
var features = document.querySelector(".features");
//to select nav bar
var navigation = document.querySelector("nav");
function setsticky() {
    //Distance of feature section from top
    var dftop = features.offsetTop;
    //user has scrolled passed features section top
    if (window.pageYOffset +10> dftop) {
        navigation.classList.add("sticky");
    } else if (window.pageYOffset < dftop) {
        navigation.classList.remove("sticky");
    }
}
