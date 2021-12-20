let fotos_aleatorias = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;
let pregunta;
let posibles_respuestas;
btn_correspondiente = 
[
  select_id("bn1"),
  select_id("bn2"),
  select_id("bn3"),
  select_id("bn4")
];
let nfoto = [];
window.onload = function () 
{
    base_foto = readText("base-foto.json");
    interprete_bp = JSON.parse(base_foto);
    escogerfotoAleatoria();
};
let foto_hechas = 0;
let foto_correctas = 0;
function escogerfotoAleatoria() 
{
    let n;
    if (fotos_aleatorias) 
    {
        n = Math.floor(Math.random() * interprete_bp.length);
    } else 
    {
        n = 0;
    }
    while (nfoto.includes(n)) 
    {
        n++;
        if (n >= interprete_bp.length) 
        {
            n = 0;
        }
    }
  nfoto.push(n);
  foto_hechas++;
  escogerfoto(n);
}
function escogerfoto(n) 
{
    foto = interprete_bp[n];
    select_id("categoria").innerHTML = foto.categoria;
    select_id("foto").innerHTML = foto.foto;
    select_id("numero").innerHTML = n;
    style("imagen").objectFit = foto.objectFit;
    desordenarRespuestas(foto);
        if (foto.imagen) 
        {
            select_id("imagen").setAttribute("src", foto.imagen);
            style("imagen").height = "200px";
            style("imagen").width = "100%";
        } 
        else
        {
            style("imagen").height = "0px";
            style("imagen").width = "0px";
            setTimeout(() => {
                select_id("imagen").setAttribute("src", "");
            }, 500);
        }
}
function desordenarRespuestas(foto) 
{
  posibles_respuestas = [
    foto.respuesta,
    foto.incorrecta1,
    foto.incorrecta2,
    foto.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}
let suspender_botones = false;
function oprimir_btn(i) 
{
  if (suspender_botones) 
  {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i]==foto.respuesta) 
  {
    foto_correctas++;
    btn_correspondiente[i].style.background = "lightgreen";
  } 
  else 
  {
    btn_correspondiente[i].style.background = "pink";
  }
  for (let j = 0; j < 4; j++) 
  {
    if (posibles_respuestas[j]==foto.respuesta) 
    {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
}
function reiniciar() 
{
    for (const btn of btn_correspondiente)
    {
        btn.style.background = "white";
    }
    escogerfotoAleatoria();
}
function select_id(id)
{
    return document.getElementById(id);
}
