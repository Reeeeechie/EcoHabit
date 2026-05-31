document.addEventListener('DOMContentLoaded', () => {
  const loggedOutView = document.getElementById('loggedOutView');
  const loggedInView = document.getElementById('loggedInView');

  if (!loggedOutView || !loggedInView) return;

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    loggedOutView.style.display = 'block';
    loggedInView.style.display = 'none';
    return;
  }

  // --- user is logged in ---
  loggedOutView.style.display = 'none';
  loggedInView.style.display = 'block';
  
  const history = JSON.parse(localStorage.getItem('emissionHistory')) || [];
  
  if (history.length === 0) return;

  const latest = history[0]; 
  const lang = localStorage.getItem('preferredLang') || 'id';
  
  // 1. Update Total Output
  const totalEl = document.getElementById('dash-total-val');
  if (totalEl) totalEl.textContent = latest.total;
  
  // 2. Find and update the Biggest Contributor & its Description
  // 2. Find and update the Biggest Contributor & its Description
  const vals = {
    'transport': parseFloat(latest.transport),
    'house': parseFloat(latest.house),
    'food': parseFloat(latest.food)
  };
  
  const biggestKey = Object.keys(vals).reduce((a, b) => vals[a] > vals[b] ? a : b);
  const biggestEl = document.getElementById('dash-biggest-val');
  const biggestDescEl = document.getElementById('dash-biggest-desc');
  
  if (biggestEl && biggestDescEl && vals[biggestKey] > 0) {
    
    // A. Set the SMALL text (description) to the category name
    if (biggestKey === 'transport') {
      biggestDescEl.setAttribute('data-i18n', 'calc_side_trans');
      biggestDescEl.textContent = lang === 'en' ? 'Transportation' : 'Transportasi';
    } else if (biggestKey === 'house') {
      biggestDescEl.setAttribute('data-i18n', 'calc_side_house');
      biggestDescEl.textContent = lang === 'en' ? 'Household Appliances' : 'Perabotan Rumah Tangga';
    } else if (biggestKey === 'food') {
      biggestDescEl.setAttribute('data-i18n', 'calc_side_food');
      biggestDescEl.textContent = lang === 'en' ? 'Food & Beverage' : 'Makanan & Minuman';
    }

    // B. Set the BIG text (main card value) to the Percentage and Tons
    if (latest.total > 0) {
      const pct = Math.round((vals[biggestKey] / latest.total) * 100);
      const tons = vals[biggestKey].toFixed(2);
      
      // Inject the percentage, and wrap the tons in a span so it matches your existing CSS sizing
      biggestEl.innerHTML = `${pct}% <span>(${tons} Ton CO₂)</span>`;
      
      // Prevent the lang.js dictionary from overwriting our new math string
      biggestEl.removeAttribute('data-i18n'); 
    }
  }

  // 3. Update Target and Difference Descriptions (Comparing to previous entry)
  const totalDescEl = document.getElementById('dash-total-desc');
  const targetValEl = document.getElementById('dash-target-val');
  const targetDescEl = document.getElementById('dash-target-desc');

  if (history.length > 1) {
    const prev = history[1];
    const diff = latest.total - prev.total;
    const diffAbs = Math.abs(diff).toFixed(2);

    // Update Total Emission Description (% change)
    if (totalDescEl && prev.total > 0) {
      const diffPct = Math.abs(Math.round((diff / prev.total) * 100));
      if (diff > 0) {
        totalDescEl.textContent = lang === 'en' ? `↑ ${diffPct}% from last calculation` : `↑ ${diffPct}% dari hitungan lalu`;
        totalDescEl.className = 'card-desc text-danger';
      } else if (diff < 0) {
        totalDescEl.textContent = lang === 'en' ? `↓ ${diffPct}% from last calculation` : `↓ ${diffPct}% dari hitungan lalu`;
        totalDescEl.className = 'card-desc text-success';
      } else {
        totalDescEl.textContent = lang === 'en' ? 'No change' : 'Tidak ada perubahan';
        totalDescEl.className = 'card-desc';
      }
      totalDescEl.removeAttribute('data-i18n');
    }

    // Update Target Description (Saved or Missed)
    if (targetValEl && targetDescEl) {
      if (diff <= 0) {
        targetValEl.textContent = lang === 'en' ? 'Achieved!' : 'Tercapai!';
        targetValEl.style.color = '#198754'; // Success green
        targetDescEl.textContent = lang === 'en' ? `You saved ${diffAbs} Tons of CO₂` : `Anda menghemat ${diffAbs} Ton CO₂`;
        targetDescEl.className = 'card-desc text-success';
      } else {
        targetValEl.textContent = lang === 'en' ? 'Missed' : 'Belum Tercapai';
        targetValEl.style.color = '#dc3545'; // Danger red
        targetDescEl.textContent = lang === 'en' ? `Increased by ${diffAbs} Tons of CO₂` : `Meningkat sebesar ${diffAbs} Ton CO₂`;
        targetDescEl.className = 'card-desc text-danger';
      }
      targetValEl.removeAttribute('data-i18n');
      targetDescEl.removeAttribute('data-i18n');
    }

  } else {
    // If there is only ONE calculation history (no previous data to compare to)
    if (totalDescEl) {
      totalDescEl.textContent = lang === 'en' ? 'First calculation' : 'Perhitungan pertama';
      totalDescEl.className = 'card-desc';
      totalDescEl.removeAttribute('data-i18n');
    }
    if (targetValEl && targetDescEl) {
      targetValEl.textContent = '-';
      targetValEl.style.color = 'inherit';
      targetDescEl.textContent = lang === 'en' ? 'Calculate again later to track progress!' : 'Hitung lagi nanti untuk melihat progres!';
      targetDescEl.className = 'card-desc';
      targetValEl.removeAttribute('data-i18n');
      targetDescEl.removeAttribute('data-i18n');
    }
  }

  // 4. Update History List (Render up to 3 recent calculations)
  const historyListEl = document.getElementById('dash-history-list');
  if (historyListEl) {
    historyListEl.innerHTML = ''; 
    
    const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    history.slice(0, 3).forEach(item => {
      const d = new Date(item.date);
      const monthName = lang === 'en' ? monthsEn[d.getMonth()] : monthsId[d.getMonth()];
      const dateStr = `${monthName} ${d.getFullYear()}`;
      
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="hist-info">
          <strong>${dateStr}</strong>
          <span>${lang === 'en' ? 'Calculated Result' : 'Hasil Perhitungan'}</span>
        </div>
        <div class="hist-score">${item.total} Ton CO₂</div>
      `;
      historyListEl.appendChild(div);
    });
  }
});