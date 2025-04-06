//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages(imageList) {
  loading.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const promises = imageList.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then(images => {
      images.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      errorDiv.textContent = error;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

btn.addEventListener("click", () => {
  downloadImages(images);
});
