const dataPanel = document.getElementById('data-panel');
const dataUrl = 'https://thefinalnights.com/data.php';
const dataPanelFadeClass = document.querySelector('.data-panel-fade-in');
let countdownIntervalId = null;
let initialFetchTime = 0;
let initialElapsedDuration = 0;
const targetDurationSeconds = 10800;

function formatCountdown(totalSeconds) {
    if (totalSeconds <= 0) {
        return "The dawn has come...";
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const hoursStr = hours > 0 ? `${hours} ${hours === 1 ? 'hour, ' : 'hours, '}` : '';
    const minutesStr = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute, ' : 'minutes, '}` : '';
    const secondsStr = seconds > 0 ? `${seconds} ${seconds === 1 ? ' second until dawn' : ' seconds until dawn'}` : '';
    return `${hoursStr} ${minutesStr} ${secondsStr}`;
}

function updateCountdown() {
    const countdownSpan = document.getElementById('countdown-timer');
    if (!countdownSpan || initialFetchTime === 0) return;

    const secondsSinceFetch = Math.floor((Date.now() - initialFetchTime) / 1000);
    const currentElapsed = initialElapsedDuration + secondsSinceFetch;
    const currentTimeRemaining = targetDurationSeconds - currentElapsed;

    countdownSpan.textContent = formatCountdown(currentTimeRemaining);

    if (currentTimeRemaining <= 0 && countdownIntervalId) {
        clearInterval(countdownIntervalId);
    }
}

fetch(dataUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        initialFetchTime = Date.now();
        initialElapsedDuration = data.round_duration || 0;

        let htmlContent = '<ul class="space-y-1">';
        if (data.map_name !== undefined) { htmlContent += `<li>Live data from <span class="font-semibold text-white">${data.map_name}</span></li>`; }
        if (data.players !== undefined) { htmlContent += `<li><span class="font-semibold text-white">${data.players}</span> active players</li>`; }
        if (data.round_duration !== undefined) {
            const initialTimeRemaining = targetDurationSeconds - initialElapsedDuration;
            htmlContent += `<li><span id="countdown-timer">${formatCountdown(initialTimeRemaining)}</span></li>`;
        } else {
            htmlContent += `<li><span id="countdown-timer">The dawn has come...</span></li>`;
        }
        htmlContent += '</ul>';
        dataPanel.innerHTML = htmlContent;
        if (data.round_duration !== undefined) {
            if (countdownIntervalId) clearInterval(countdownIntervalId);
            countdownIntervalId = setInterval(updateCountdown, 1000);
        }
    })
    .catch(error => {
        if (countdownIntervalId) clearInterval(countdownIntervalId);
        fetch(dataUrl)
            .then(response => response.text())
            .then(textData => {
                dataPanel.innerHTML = `<strong>The dawn has come... (${error.message}). Raw:</strong><pre class="mt-2 whitespace-pre-wrap">${textData.length > 300 ? textData.substring(0, 300) + '...' : textData}</pre>`;
            })
            .catch(finalError => {
                dataPanel.innerHTML = `The dawn has come...<br/>(${error.message}).<br/>`;
            });
    });

if(dataPanelFadeClass) {
    dataPanelFadeClass.style.opacity = '1';
}

if(dataPanel) {
    dataPanel.style.opacity = '1';
}
