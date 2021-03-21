
var next_page ="";
var previus_page="";
var currentApiURL="";
var currentApiURL_2= [ ];
var htmlStyle = "";
var bandera= false;
var x=true;


function search()
{
    currentApiURL = "https://pokeapi.co/api/v2/pokemon";
    FindPokemons();
}

function search_2()
{
    FindAtributes()
}

//Función donde se encuetra la primera llamada Fetch
function FindPokemons()
{
    fetch(currentApiURL)
        .then(function(response){
            response.json()
            .then(function(data){
                showApiPoke(data);
            })
        })   
}


//Función donde se encuetra la segunda llamada Fetch 
function FindAtributes()  
{  
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

//Función en la cual obtenemos los URL de la primera api.Los url de los pokemons con sus caracteristicas.
function showApiPoke(data)
{
    var i;
    var element = document.getElementById("results");
    var countingHtml = document.createElement("h4");
    countingHtml.style.color = "white";
    //If que nos ayuda a que el total de pokemons aparezca solo una vez y no se cicle 
    if(x)
    {
        countingHtml.innerHTML = "Total de Pokemons:" + data.count;
    }
    
    element.appendChild(countingHtml);


    for(i=0; i < data.results.length; i++)
    {
        var currentItem = data.results[i];      //Asiganamos los datos de la Api que son nombre y URL del pokemon

        currentApiURL_2 [i] = currentItem.url;  //Hacemos un arreglo donde se guarden todas las URL con las caracteristicas especificas del Pokemon
    }
    bandera=true;
    
    if(bandera)         //If que nos ayuda a que no se muestre el botton el de Buscar Pokemons segun se carga la pagina
    {
        document.getElementById("buttonPokemons").style.display = "inline";
    }
    else
    {
        document.getElementById("buttonPokemons").style.display = "none";
    }

    //Secuencia de if y else para los botones de pagina siguiente y pagina anterior
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
    x=false;                                                                //Afiganos el valor False a la variable para que ya no aparezca el total de pokemons repetdio
}

//Funcion que nos mostrar todos los datos de de nuestra segunda api
function showApiAtributos(data1)
{
    var i;
    var pokemon = document.createElement('h3');
    pokemon.style.color = "#0033FF";

    var img = document.createElement('img');
    img.src = data1.sprites.front_default;
    img.width = "200";
    img.height = "200";
    document.getElementById('img').appendChild(img);

    var namepokemon = data1.species;
    htmlStyle = "<hr/ > <strong>Nombre:" + namepokemon.name + "<strong> <br/ >";

    for(i=0;i<data1.types.length;i++)
    {
        var tipo_pokemon = data1.types[i]
        htmlStyle += "<br>Tipo:" +tipo_pokemon.type.name;
    }

    //If y else que nos ayuda a que los espacion sean correctos entres los tetxto y las imagenes 
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

    document.getElementById("buttonPokemons").style.display = "none";//Nos ayuda a ocultar el boton de Buscar Pokemons después de seleccionarlo 
}

//Funcion para poder pasar a la siguiente pagina
function next()
{
    currentApiURL = next_page;
    FindPokemons();
    document.getElementById('img').innerHTML="";
    document.getElementById('aspectos').innerHTML="";
}

//Funcion para poder pasar a la pagina anterior
function back()
{
    currentApiURL = previus_page;
    FindPokemons();
    document.getElementById('img').innerHTML="";
    document.getElementById('aspectos').innerHTML="";
}
