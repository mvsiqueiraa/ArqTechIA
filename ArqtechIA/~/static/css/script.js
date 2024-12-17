document.addEventListener('DOMContentLoaded', function() {
    const startCameraButton = document.getElementById('start-camera');
    const camera = document.getElementById('camera');
    const snapshotCanvas = document.getElementById('snapshot');
    const captureButton = document.getElementById('capture-photo');
    const uploadButton = document.getElementById('upload-photo');

    let mediaStream;

    // Função para iniciar a câmera
    async function startCamera() {
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            camera.srcObject = mediaStream;
            camera.style.display = 'block';
            snapshotCanvas.style.display = 'none';
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    }

    // Função para capturar a imagem
    captureButton.addEventListener('click', function() {
        const context = snapshotCanvas.getContext('2d');
        snapshotCanvas.width = camera.videoWidth;
        snapshotCanvas.height = camera.videoHeight;
        context.drawImage(camera, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
        snapshotCanvas.style.display = 'block';
    });

    // Função para enviar o arquivo ao servidor
    uploadButton.addEventListener('click', async function() {
        const formData = new FormData();
        formData.append('image', snapshotCanvas.toDataURL('image/jpeg'));

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            alert(`Classificação: ${result.classification}`);
        } catch (err) {
            console.error('Error uploading image:', err);
        }
    });

    startCameraButton.addEventListener('click', startCamera);
});
