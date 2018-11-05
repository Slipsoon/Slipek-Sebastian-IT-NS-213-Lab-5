/*document.querySelector('#plik')
.addEventListener('change', (e)=>{
    console.log(e)
})*/

//Wtyczka life server

let canva = document.querySelector('#canva')
let ctx = canva.getContext('2d')
const imgPath = './krakow.jpeg'

let img = new Image()
img.addEventListener('load', () => {

ctx.drawImage(img, 0, 0, canva.width, canva.height)

})
img.src = imgPath

document.querySelector('#btn')
.addEventListener('click', ()=>{
    // pobieramy dane z canvas
    let imageData = ctx.getImageData(0,0, canva.width, canva.height)
    console.log(imageData)
    // modyfikacja tablicy pikseli
    for(let i=0; i<imageData.data.length; i+=4){
        //R
        imageData.data[i] = Math.min(255, imageData.data[i] + 30)
        //G
        imageData.data[i+1] = Math.min(255, imageData.data[i] + 30)
        //B
        imageData.data[i+2] = Math.min(255, imageData.data[i] + 30)
    }
    //wpisujemy pixele do canvas
    ctx.putImageData(imageData, 0, 0)
})