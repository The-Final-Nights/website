const backgroundImages = [
    { url: 'jordan-grimmer-thhfgh.jpg', artist: 'Jordan Grimmer' },
    { url: 'jordan-grimmer-jordan-grimmer-fdoigjhfdigdg.jpg', artist: 'Jordan Grimmer' },
    { url: 'johannes-bohm-bh-scr-annouce-batch1-redlight-3840x2160px-copy.jpg', artist: 'Johannes Bohm' },
    { url: 'leon-holmes-winter-streets.jpg', artist: 'Leon Holmes'},
    { url: 'toby-hunt-alley.jpg', artist: 'Toby Hunt'},
    { url: 'toby-hunt-dd1-citscape-concept.jpg', artist: 'Toby Hunt'}
];
const bgDiv = document.querySelector('.bg-fade-in');
const artCreditElement = document.getElementById('art-credit-text');
const randomIndex = Math.floor(Math.random() * backgroundImages.length);
const selectedImageData = backgroundImages[randomIndex];
const selectedImageUrl = selectedImageData.url;
const selectedArtistName = selectedImageData.artist;

bgDiv.style.backgroundImage = `url('${selectedImageUrl}')`;
if(artCreditElement) {
    artCreditElement.textContent = `Art by ${selectedArtistName}`;
}

const img = new Image();
img.src = selectedImageUrl;
img.onerror = function() {
    bgDiv.style.backgroundImage = '';
    bgDiv.style.backgroundColor = '#f0f0f0';
    if(artCreditElement) {
        artCreditElement.textContent = 'Art Credit: N/A';
    }
};
