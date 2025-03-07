import { db } from "./firebase-config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadDailySummary() {
    const selectedDate = document.getElementById("datePicker").value;
    if (!selectedDate) {
        alert("Please select a date.");
        return;
    }
    
    const summaryDiv = document.getElementById("summary");
    summaryDiv.innerHTML = "Loading...";
    
    const statsQuery = query(collection(db, "gameStats"), where("date", "==", selectedDate));
    const statsSnapshot = await getDocs(statsQuery);
    
    let summaryHTML = "<h2>Summary for " + selectedDate + "</h2><ul>";
    statsSnapshot.forEach(doc => {
        const data = doc.data();
        summaryHTML += `<li>${data.playerName}: Goals: ${data.goals}, Assists: ${data.assists}, Defense: ${data.defense}</li>`;
    });
    summaryHTML += "</ul>";
    
    summaryDiv.innerHTML = summaryHTML;
}

window.loadDailySummary = loadDailySummary;
