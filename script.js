    //Get canva
let canva = document.querySelector('#canva');
let ctx = canva.getContext('2d');

    //Load default img to canva
let img = new Image();
let imgPath = './krakow.jpeg';
img.src = imgPath;

img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0, canva.width, canva.height);
});

    //Upload new image to canva function
function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
        img.onload = function(){
            ctx.drawImage(img, 0, 0, canva.width, canva.height);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

    //Upload new image to canva
let uploadImg = document.querySelector('#newImg');
uploadImg.addEventListener('change', (e) => {
    handleImage(e);
});

    //Brightness
    
document.querySelector('#brightnessDown').addEventListener('click', () => {
    // pobieramy dane z canvas
    let imageData = ctx.getImageData(0,0, canva.width, canva.height)
    // modyfikacja tablicy pikseli
    for (let i = 0; i < imageData.data.length; i += 4){
        //R
        imageData.data[i] = Math.min(255, imageData.data[i] - 30)
        //G
        imageData.data[i+1] = Math.min(255, imageData.data[i] - 30)
        //B
        imageData.data[i+2] = Math.min(255, imageData.data[i] - 30)
    }
    //wpisujemy pixele do canvas
    ctx.putImageData(imageData, 0, 0)
})

    //Testing
let slideOldVal;

slider.addEventListener("mousemove", () => {
    if (slider.value !== slideOldVal) {
      setBrightness(Number(slider.value));
    }
    val.textContent = slider.value;
    slideOldVal = Number(slider.value);
  });

function setBrightness(value) {
  ctx.filter = `brightness(${value + 100}%)`;
  ctx.drawImage(img, 0, 0, canva.width, canva.height);
}


document.querySelector('#brightnessUp').addEventListener('click', () => {
    let imageData = ctx.getImageData(0,0, canva.width, canva.height)
    for (let i = 0; i < imageData.data.length; i += 4){
        imageData.data[i] = Math.min(255, imageData.data[i] + 0)
        imageData.data[i+1] = Math.min(255, imageData.data[i] + 0)
        imageData.data[i+2] = Math.min(255, imageData.data[i] + 0)
    }
    ctx.putImageData(imageData, 0, 0)
})

    document.querySelector('#R').addEventListener('click', () => {
    let imageData = ctx.getImageData(0, 0, canva.width, canva.height);
        for (let i = 0; i < imageData.data.length; i += 4){
            imageData.data[i] = Math.min(255, imageData.data[i] + 30)
        }
        ctx.putImageData(imageData, 0, 0);        
    })

    document.querySelector('#G').addEventListener('click', ()=>{
        // pobieramy dane z canvas
        let imageData = ctx.getImageData(0, 0, canva.width, canva.height)
        // modyfikacja tablicy pikseli
        for (let i = 0; i < imageData.data.length; i += 4){
            //G
            imageData.data[i+1] = Math.min(255, imageData.data[i] + 30)
        }
        //wpisujemy pixele do canvas
        ctx.putImageData(imageData, 0, 0)
    })

    document.querySelector('#B').addEventListener('click', ()=>{
        // pobieramy dane z canvas
        let imageData = ctx.getImageData(0, 0, canva.width, canva.height)
        // modyfikacja tablicy pikseli
        for (let i = 0; i < imageData.data.length; i += 4){
            //B
            imageData.data[i+2] = Math.min(255, imageData.data[i] + 30)
        }
        //wpisujemy pixele do canvas
        ctx.putImageData(imageData, 0, 0)
    })



    /*
    Stwórz aplikację, która w minimalnym wymaganiach:

Wczytuje grafikę do elementu <canvas>
Pozwala "live" zmieniać jasność, kontrast i nasycenie grafiki na canvasie (np. przyciskami. suwakami, przesuwaniem kursora myszy po canvasie etc)
Wersja bardziej rozbudowana:

możliwość rysowania po canvasie z użyciem myszy
dodatkowe filtry (sepia, rozmycie, wyostrzenie, koloryzacje - np. postarzanie, ocieplanie barw etc)
inwencja własna
Projekt ma mieć przyjazny i estetyczny interfejs użytkownika (TIP: domyślne przyciski formularzy  i białe tło są be.)
*/