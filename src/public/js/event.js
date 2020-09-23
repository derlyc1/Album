window.addEventListener('load', function(){

    var time = setInterval(function(){
        console.log("set interval ejecutado");
    
        var title = document.querySelector("h1");
        if(title.style.fontSize == "50px"){
            title.style.fontSize = "70px";
        } else{
            title.style.fontSize = "50px";
        }
    }, 2000);

});

