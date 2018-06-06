document.getElementById("heightText").value = document.getElementById("hRange").value + " m";
document.getElementById("hRange").addEventListener("mousemove", function () {
    document.getElementById("heightText").value = document.getElementById("hRange").value + " m";
})

document.getElementById("weightText").value = document.getElementById("wRange").value + " t";
document.getElementById("wRange").addEventListener("mousemove", function () {
    document.getElementById("weightText").value = document.getElementById("wRange").value + " t";
})
