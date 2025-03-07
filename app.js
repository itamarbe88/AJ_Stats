import { db } from "./firebase-config.js";
import { doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function addPlayer() {
    const playerName = document.getElementById("newPlayerName").value.trim();
    if (!playerName) return;
    
    const playerRef = doc(db, "players", playerName);
    await setDoc(playerRef, { name: playerName }, { merge: true });
    
    document.getElementById("newPlayerName").value = "";
    loadPlayers();
}

async function loadPlayers() {
    const playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
    
    const playersRef = collection(db, "players");
    const snapshot = await getDocs(playersRef);
    snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().name;
        playerList.appendChild(li);
    });
}

async function updateStat(playerName, statType, change) {
    const selectedDate = document.getElementById("datePicker").value;
    if (!selectedDate) {
        alert("Please select a date before updating stats.");
        return;
    }
    
    const playerRef = doc(db, "gameStats", `${playerName}_${selectedDate}`);
    const playerDoc = await getDoc(playerRef);
    
    let newData = {
        playerName: playerName,
        date: selectedDate,
        goals: 0,
        assists: 0,
        defense: 0
    };
    
    if (playerDoc.exists()) {
        newData = playerDoc.data();
    }
    
    newData[statType] = (newData[statType] || 0) + change;
    if (newData[statType] < 0) newData[statType] = 0;
    
    await setDoc(playerRef, newData);
}

window.addPlayer = addPlayer;
window.loadPlayers = loadPlayers;
window.updateStat = updateStat;
window.onload = loadPlayers;
