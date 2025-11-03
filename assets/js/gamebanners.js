//const url = "https://tgstation13.org/serverinfo.json";
// Use data.php to bypass file permission issues
const url = "/data.php";
async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    let players = 0;
    
    // Handle both formats: single server object or array of servers
    if (Array.isArray(data.servers)) {
      // Original format: { servers: [...] }
      data.servers.forEach((server) => {
        players += updateBanners(server);
      });
    } else if (data.identifier) {
      // Single server object format
      players += updateBanners(data);
    }
    
    updatePlayerCount(players);
  } catch (error) {
    console.error("getData error:", error);
  }
}

function updateBanners(server) {
  const banner = document.getElementById(`${server.identifier}`);
  let errortext = "Connection Error!";
  
  // Handle both nested format (server.data) and flat format (server directly contains game data)
  const gameData = server.data || server;
  
  // Check if we have valid data
  if (!gameData || gameData.hasOwnProperty("ERROR")) {
    if (gameData && gameData.errortext) {
      errortext = gameData.errortext;
    }
    setBannerToErrorMode(banner, errortext);
    return 0;
  }
  
  // Verify required fields exist
  if (!gameData.hasOwnProperty("players") || !gameData.hasOwnProperty("version")) {
    setBannerToErrorMode(banner, errortext);
    return 0;
  }

  state2class(gameData.gamestate, banner);
  setRevision(gameData.revision, banner);
  setVersion(gameData, banner);
  setMap(gameData.map_name, banner);
  setTtl(gameData, banner);
  setIcons(
    gameData,
    banner.querySelector(`#${server.identifier}-hub`),
    banner.querySelector(`#${server.identifier}-bunker`)
  );
  setBannerToErrorMode(banner, "", true);
  return gameData.players || 0;
}

function setRevision(revision, banner) {
  banner.querySelector(".revision").textContent = revision.substr(0, 7);
}

function setVersion(data, banner) {
  let modestr = "Playing /tg/Station 13";
  if (data.hasOwnProperty("version")) modestr = "Playing " + data.version;
  if (data.hasOwnProperty("custom_event")) {
    modestr = "Playing Event " + data.custom_event;
  } else if (data.hasOwnProperty("mode")) {
    modestr += ' mode "' + data.mode + '"';
  }
  banner.querySelector(".version").textContent = modestr;
}

function setMap(map, banner) {
  banner.querySelector(".map").textContent = `The map is: ${map}`;
}

function setTtl(data, banner) {
  let ttl = "";
  ttl += data.players;
  let popcap = popcapstring(data);
  if (popcap) ttl += "/" + popcap;
  if (Number(data.round_duration))
    ttl += " " + secondsToTime(Number(data.round_duration));
  if (data.hasOwnProperty("shuttle_mode") && Number(data.shuttle_timer))
    ttl += " " + shuttleTime(data.shuttle_mode, Number(data.shuttle_timer));

  banner.querySelector(".status").textContent = ttl;
}

function popcapstring(serverdata) {
  let string = "∞";
  let popcap = Number(serverdata.popcap);
  let hpopcap = Number(serverdata.hard_popcap);
  let epopcap = Number(serverdata.extreme_popcap);
  if (epopcap) {
    if (hpopcap && hpopcap < epopcap) return hpopcap + "(" + epopcap + ")";
    string = epopcap;
  } else if (hpopcap) return hpopcap;
  else if (popcap) return popcap;
  return string;
}

function secondsToTime(seconds) {
  let output = "";
  if (seconds >= 86400) output += Math.floor(seconds / 86400) + ":";

  if (seconds >= 3600) output += pad(Math.floor(seconds / 3600) % 24, 2) + ":";

  output +=
    pad(Math.floor((seconds / 60) % 60), 2) +
    ":" +
    pad(Math.floor(seconds) % 60, 2);
  return output;
}

function shuttleTime(shuttlemode, shuttletime) {
  switch (shuttlemode) {
    case "igniting":
      return "IGN " + secondsToTime(shuttletime);
    case "recalled":
      return "RCL " + secondsToTime(shuttletime);
    case "called":
      return "ETA " + secondsToTime(shuttletime);
    case "docked":
      return "ETD " + secondsToTime(shuttletime);
    case "escape":
      return "ESC " + secondsToTime(shuttletime);
    case "stranded":
      return "ERR --:--";
    case "endgame: game over":
      return "FIN 00:00";
  }
  return "";
}

function state2class(state, target) {
  target.classList.remove("loading");
  switch (Number(state)) {
    case 2:
    case 3:
      target.classList.add("underway");
      target.classList.remove("lobby", "end");
      break;
    case 4:
      target.classList.add("end");
      target.classList.remove("underway", "lobby");
      break;
    default:
      target.classList.add("lobby");
      target.classList.remove("underway", "end");
  }
}

function setIcons(data, hub, bunker) {
  if (data.hasOwnProperty("hub") && true === data.hub) {
    hub.classList.remove("hidden");
  } else {
    hub.classList.add("hidden");
  }
  if (data.hasOwnProperty("bunkered") && true === data.bunkered) {
    bunker.classList.remove("hidden");
  } else {
    bunker.classList.add("hidden");
  }
}

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function setBannerToErrorMode(banner, errorText, undo = false) {
  if (!undo) {
    banner.classList.add("error");
    banner.classList.remove("underway", "lobby", "end");
    banner.querySelector(".version").textContent = errorText;
  } else {
  }
}

function updatePlayerCount(players) {
  const el = document.querySelector(".playercount");
  el.textContent = `${players} players online`;
  el.classList.remove("hidden");
}

getData();

setInterval(function () {
  getData();
}, 4000);
