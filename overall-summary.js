import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadOverallSummary() {
    const summaryDiv = document.getElementById("summary");
    summaryDiv.innerHTML = "Loading...";
    
    const statsSnapshot = await getDocs(collection(db, "gameStats"));
    
    let playerStats = {};
    statsSnapshot.forEach(doc => {
        const data = doc.data();
        if (!playerStats[data.playerName]) {
            playerStats[data.playerName] = { goals: 0, assists: 0, defense: 0 };
        }
        playerStats[data.playerName].goals += data.goals;
        playerStats[data.playerName].assists += data.assists;
        playerStats[data.playerName].defense += data.defense;
    });
    
    let summaryHTML = "<h2>Overall Summary</h2><ul>";
    for (const player in playerStats) {
        summaryHTML += `<li>${player}: Goals: ${playerStats[player].goals}, Assists: ${playerStats[player].assists}, Defense: ${playerStats[player].defense}</li>`;
    }
    summaryHTML += "</ul>";
    
    summaryDiv.innerHTML = summaryHTML;
}

window.onload = loadOverallSummary;
