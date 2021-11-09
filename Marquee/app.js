let input = document.querySelector('.jsMarquee');

const console = 80; //largo del "letrero"
const speed = 100; //Velocidad de la marquesina
const text = 'Marquee in JS'; //Texto que se moverá por la pantalla
const char = '·'; //valor del sufijo y del prefijo
const colorIncrement = 0.5;

let prefix; //prefijo que irá empujando el texto
let sufix; //sufijo que irá desapareciendo
let prefixLength = 0; //contador de longitud del prefijo (serán puntos: ·)
let endIndex; //Contador para coger el substring deseado en los extremos
let printableText; //La string final
let i = 0; //contador del bucle
let color = 100;

eternity();
function eternity() {
  i = 0;
  while (i <= console) {
    marquesina(i);
    i++;
  }
}

function marquesina(i) {
  setTimeout(() => {
    // Valores iniciales
    color += colorIncrement;
    input.style.color = '#' + Math.floor(color);
    prefix = '';
    sufix = '';
    prefixLength++;
    // Reinicia el contador si el texto llega al final
    if (prefixLength >= console) {
      prefixLength = 0;
    }
    //   Cuenta los prefijos que debería haber en un ciclo concreto y los añade
    for (let i = 0; i < prefixLength - text.length; i++) {
      prefix += char;
    }
    //   Cuenta los sufijos que debería haber en un ciclo concreto y los añade
    for (let i = 0; i < console - prefixLength - text.length; i++) {
      sufix += char;
    }
    endIndex = console - prefixLength; //indica que cacho del texto será mostrado según donde se encuentre
    //   caso 1: aun no ha salido el texto por completo
    if (prefixLength < text.length) {
      endIndex = prefixLength;
      prefix = '';
      //se va mostrando el substring final hasta que el texto aparece por completo
      printableText = text.substring(text.length - endIndex, text.length);
      input.innerText = prefix + printableText + sufix;
      // caso 2: no se ha llegado al final
    } else if (endIndex > text.length) {
      endIndex = text.length;
      // Muestra el texto completo
      printableText = text.substring(0, endIndex);
      input.innerText = prefix + printableText + sufix;
      // caso 3: llegamos al final del "letrero" endIndex cada vez más pequeño
    } else if (endIndex < text.length) {
      //   el texto va desapareciendo desde el final
      printableText = text.substring(0, endIndex);
      input.innerText = prefix + printableText + sufix;
    }
    if (i == console) {
      eternity();
    }
  }, i * speed);
}
