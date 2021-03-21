
var next_page ="";
var previus_page="";
var currentApiURL="";
var currentApiURL_2= [ ];
var htmlStyle = "";
var bandera= false;

function search()
{
    currentApiURL = "https://pokeapi.co/api/v2/pokemon";
    FindPokemons();
}

function search_2()
{
    FindAtributes()
}


function FindPokemons()
{
    //debugger;
    //document.getElementById("results").innerHTML=" ";

    fetch(currentApiURL)
        .then(function(response){
            response.json()
            .then(function(data){
                showApiPoke(data);
            })
        })   
}

function FindAtributes()
{
    //debugger;
    var i;
    document.getElementById("aspectos").innerHTML=" ";
    for(i=0;i<currentApiURL_2.length;i++)
    {
        fetch(currentApiURL_2[i])
        .then(function(response){
            response.json()
            .then(function(data1){
                showApiAtributos(data1);
            })
        })
    } 
}


function showApiPoke(data)
{
    //debugger;
    var i;
    var element = document.getElementById("results");
    var countingHtml = document.createElement("h4");
    countingHtml.style.color = "white";
    if(data.previous == null)
    {
        countingHtml.innerHTML = "Total de Pokemons:" + data.count;
    }
    
    element.appendChild(countingHtml);


    for(i=0; i < data.results.length; i++)
    {
        //debugger;
        var currentItem = data.results[i];
        //var pokemon = document.createElement('h3');
        //pokemon.style.color = "blue";
        

        currentApiURL_2 [i] = currentItem.url;
        //FindAtributes();
        //htmlStyle = "<hr/ > <strong>Nombre:" + currentItem.name + "<strong> <br/ >";

        //pokemon.innerHTML = htmlStyle;
        //document.getElementById('results').appendChild(pokemon);

    }
    bandera=true;
    
    if(bandera)
    {
        document.getElementById("buttonPokemons").style.display = "inline";
    }
    else
    {
        document.getElementById("buttonPokemons").style.display = "none";
    }

    if(data.next != null)
    {
        document.getElementById("buttonNext").style.display = "inline";
        next_page = data.next;
    }
    else
    {
        document.getElementById("buttonNext").style.display = "none";
    }

    if(data.previous != null)
    {
        document.getElementById("buttonBack").style.display = "inline";
        previus_page = data.previous;
    }
    else
    {
        document.getElementById("buttonBack").style.display = "none";

    }

    document.getElementById("buttonBuscar").style.display = "none";
}

function showApiAtributos(data1)
{
    //debugger;
    var i;
    var pokemon = document.createElement('h3');
    pokemon.style.color = "#0033FF";

    var img = document.createElement('img');
    img.src = data1.sprites.front_default;
    img.width = "200";
    img.height = "200";
    document.getElementById('img').appendChild(img);

    //var img = data1.sprites.front_default;
    var namepokemon = data1.species;
    htmlStyle = "<hr/ > <strong>Nombre:" + namepokemon.name + "<strong> <br/ >";

    //htmlStyle += img; 
    for(i=0;i<data1.types.length;i++)
    {
        var tipo_pokemon = data1.types[i]
        htmlStyle += "<br>Tipo:" +tipo_pokemon.type.name;
    }

    if(data1.types.length==1)
    {
        htmlStyle+="<br><br><br>";
    }
    else
    {   
        htmlStyle+="<br><br>";
    }
    pokemon.innerHTML = htmlStyle;
    document.getElementById('aspectos').appendChild(pokemon);

}


function next()
{
    currentApiURL = next_page;
    document.getElementById("buttonNext").style.display = "none";
    FindPokemons();
    document.getElementById('img').innerHTML="";
    document.getElementById('aspectos').innerHTML="";
}

function back()
{
    currentApiURL = previus_page;
    document.getElementById("buttonBack").style.display = "none";
    FindPokemons();
    document.getElementById('img').innerHTML="";
    document.getElementById('aspectos').innerHTML="";
}

(search_2)();

//https://www.youtube.com/watch?v=w0WdvXLs3y8