document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const loggedOutView = document.getElementById('loggedOutView');
  const loggedInView = document.getElementById('loggedInView');

  if (loggedOutView && loggedInView) {
    if (!isLoggedIn) {
      loggedOutView.style.display = 'block';
      loggedInView.style.display = 'none';
      return;
    }
    
    loggedOutView.style.display = 'none';
    loggedInView.style.display = 'block';
    
    // --- Load saved data ---
    const history = JSON.parse(localStorage.getItem('emissionHistory')) || [];
    
    if (history.length > 0) {
      const latest = history[0]; // The most recent calculation
      const lang = localStorage.getItem('preferredLang') || 'id';
      
      // 1. Update Total Output
      const totalEl = document.getElementById('dash-total-val');
      if (totalEl) totalEl.textContent = latest.total;
      
      // 2. Find and update the Biggest Contributor
      const vals = {
        'transport': parseFloat(latest.transport),
        'house': parseFloat(latest.house),
        'food': parseFloat(latest.food)
      };
      const biggestKey = Object.keys(vals).reduce((a, b) => vals[a] > vals[b] ? a : b);
      const biggestEl = document.getElementById('dash-biggest-val');
      
      if (biggestEl && vals[biggestKey] > 0) {
        if (biggestKey === 'transport') {
          biggestEl.setAttribute('data-i18n', 'calc_side_trans');
          biggestEl.textContent = lang === 'en' ? 'Transportation' : 'Transportasi';
        } else if (biggestKey === 'house') {
          biggestEl.setAttribute('data-i18n', 'calc_side_house');
          biggestEl.textContent = lang === 'en' ? 'Household Appliances' : 'Perabotan Rumah Tangga';
        } else if (biggestKey === 'food') {
          biggestEl.setAttribute('data-i18n', 'calc_side_food');
          biggestEl.textContent = lang === 'en' ? 'Food & Beverage' : 'Makanan & Minuman';
        }
      }

      // 3. Update History List (Render up to 3 recent calculations)
      const historyListEl = document.getElementById('dash-history-list');
      if (historyListEl) {
        historyListEl.innerHTML = ''; // Clear out the hardcoded HTML
        
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
    }

  }
});