if (document.querySelector('.videoOn')) {
    const vidEl = document.querySelector('video')
    getCamera(vidEl)
}

async function getCamera() {
    const camera = await navigator.mediaDevices.getUserMedia({
        video: {
        facingMode: {
            ideal: "environment"
            }
        },
        audio: false
    });
    const video = document.querySelector("video");
    video.srcObject = camera;
    await video.play();

    detectBarcode(video)
}

function detectBarcode(video) {
    const barcodeDetector = new BarcodeDetector();

    window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(video);
        if (barcodes.length <= 0) {
            return 
        } else {
            window.location.href = '/product/' + barcodes[0].rawValue;
        }
    }, 1000)
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js').then(function(reg) {
        console.log('Successfully registered service worker', reg);
    }).catch(function(err) {
        console.warn('Error whilst registering service worker', err);
    });
    }

// INSTALLATION

let deferredPrompt;
const addBtn = document.querySelector(".add-button");
addBtn.style.display = "none";


window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = "block";
  
    addBtn.addEventListener("click", (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = "none";
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  });