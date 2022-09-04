const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}
func();

const btn = document.getElementById('leftImages');
const filePathElement = document.getElementById('filePath');
const leftFileContainer = document.getElementById('leftFiles');

btn.addEventListener('click', async () => {
  console.log("seelcte1");
  const { dir, files } = await window.main.selectFolder();
  console.log("file path ui: " + files);
  filePathElement.innerText = dir;
  leftFileContainer.innerHTML = "";
  for (let file of files) {
    const innerDiv = document.createElement("div");
    innerDiv.innerText = file;
    leftFileContainer.append(innerDiv);
  }
})