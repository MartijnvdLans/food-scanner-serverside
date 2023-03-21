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