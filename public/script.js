const outputDiv = document.getElementById('output');
var savedImages = JSON.parse('<%-JSON.stringify(images)%>');


if(savedImages){
  savedImages.forEach((image, index) => {
    console.log(image)
    const img = new Image();
    img.src = "http://localhost:3000/uploads/" + image;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";

    const imageContainer = document.createElement('div'); // Create a new div for the image container
    imageContainer.classList.add('image'); // Add a class for styling
    imageContainer.appendChild(span); // Append span to the container
    imageContainer.appendChild(img); // Append the image to the container
    outputDiv.appendChild(imageContainer); // Append the image container to the output div
    saveImages();
  })
}

function convertToImage() {
    const fileInput = document.querySelector("input");
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        const imageContainer = document.createElement('div'); // Create a new div for the image container
        imageContainer.classList.add('image'); // Add a class for styling
        imageContainer.appendChild(span); // Append span to the container
        imageContainer.appendChild(img); // Append the image to the container
        outputDiv.appendChild(imageContainer); // Append the image container to the output div
        saveImages();
        fileInput.value = null;
      }
      reader.readAsDataURL(file);
    }
    
  }




outputDiv.addEventListener("click", function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveImages();
    }
}, false);

function saveImages() {
    localStorage.setItem("images" , outputDiv.innerHTML);
}

function showImages(){
    outputDiv.innerHTML = localStorage.getItem("images");
}


showImages();

