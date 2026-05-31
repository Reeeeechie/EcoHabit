// ─── STATE & VARIABEL GLOBAL ───
let currentStep = 1;
const emissions = { transport: 0, house: 0, food: 0 };

// Faktor Konversi Emisi Karbon
const vehicleFactors = {
  motor: 0.09, 
  mobil: 0.21, 
  'mobil-diesel': 0.27,
  bus: 0.08, 
  kereta: 0.04, 
  pesawat: 0.25, 
  'mobil-listrik': 0.12,
  'motor-listrik': 0.04,
  unpicked: 0
};

const dietFactors = { 
  vegan: 2, 
  vegetarian: 1, 
  mixed: 3, 
  'meat-heavy': 5
};

// ─── FUNGSI KALKULASI INTERNAL ───
function calcHouse() {
  const bill = parseFloat(document.getElementById('electric-bill').value) || 0;
  return +(bill * 0.000002 * 4).toFixed(2);
}

function calcFood() {
  const diet = document.getElementById('diet').value;
  const meat = parseFloat(document.getElementById('meat-portions').value) || 0;
  const local = parseFloat(document.getElementById('local-food').value) || 50;
  const base = dietFactors[diet];
  const localFactor = 1 - (local / 200);
  return +((base + meat * 0.01) * localFactor).toFixed(2);
}

function calcTransport() {
  const rows = document.querySelectorAll('.transport-row');
  let totalTransportEmission = 0;

  rows.forEach(row => {
    const distanceInput = row.querySelector('.trans-distance').value;
    const vehicleType = row.querySelector('.trans-type').value;
    const d = parseFloat(distanceInput) || 0;
    const fac = vehicleFactors[vehicleType] || 0; 
    totalTransportEmission += (d * fac);
  });
  return +totalTransportEmission.toFixed(2);
}

function updateSidebar(t, h, f) {
  const total = t + h + f;
  document.getElementById('total-display').textContent =
    total > 0 ? total.toFixed(2) + ' Ton CO₂ / Tahun' : '??? Ton CO₂ / Tahun';
  
  let pctTrans = (t / total) * 100;
  let pctHouse = (h / total) * 100;
  let pctFood = (f / total) * 100;

  // If they exceed 100%, scale them down proportionally so the bar stays full but accurate
  const totalPct = pctTrans + pctHouse + pctFood;
  if (totalPct > 100) {
    const scale = 100 / totalPct;
    pctTrans *= scale;
    pctHouse *= scale;
    pctFood *= scale;
  }

  const barTrans = document.getElementById('bar-trans');
  const barHouse = document.getElementById('bar-house');
  const barFood = document.getElementById('bar-food');
  
  if (barTrans) barTrans.style.width = pctTrans + '%';
  if (barHouse) barHouse.style.width = pctHouse + '%';
  if (barFood) barFood.style.width = pctFood + '%';
}

// ─── FORM VALIDATION LOGIC ───

// Helper function to inject individual error messages
function markError(el, customMsg) {
  el.classList.add('error-border');
  
  let msg = el.nextElementSibling;
  if (!msg || !msg.classList.contains('error-message')) {
    msg = document.createElement('div');
    msg.className = 'error-message';
    el.parentNode.insertBefore(msg, el.nextSibling);
  }
  
  const lang = localStorage.getItem('preferredLang') || 'id';
  msg.textContent = customMsg || (lang === 'en' ? 'This field is required' : 'Input ini wajib diisi');
}

// Global listener: Clear errors when focused (clicked or tabbed into)
document.addEventListener('focusin', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
    e.target.classList.remove('error-border');
    
    // Clear individual error
    const errorMsg = e.target.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message') && !errorMsg.classList.contains('row-error-msg')) {
      errorMsg.remove();
    }

    // Clear row-level error
    const row = e.target.closest('.transport-row, .appliance-row');
    if (row) {
      const rowMsg = row.querySelector('.row-error-msg');
      if (rowMsg) rowMsg.remove();
    }
  }
});

function getValid(step) {
  let isValid = true;
  const lang = localStorage.getItem('preferredLang') || 'id';
  
  if (step === 1) {
    const rows = document.querySelectorAll('.transport-row');
    rows.forEach(row => {
        const distanceInput = row.querySelector('.trans-distance');
        const vehicleInput = row.querySelector('.trans-type');
        let rowError = false;
        
        if (!distanceInput.value || distanceInput.value.trim() === "") {
          distanceInput.classList.add('error-border');
          rowError = true;
          isValid = false;
        }
        if (vehicleInput.value === "unpicked") {
          vehicleInput.classList.add('error-border');
          rowError = true;
          isValid = false;
        }

        // Apply ONE error message per row to maintain grid layout
        if (rowError) {
          let msg = row.querySelector('.row-error-msg');
          if (!msg) {
            msg = document.createElement('div');
            msg.className = 'error-message row-error-msg';
            row.appendChild(msg);
          }
          msg.textContent = lang === 'en' ? 'Please fill in all transport fields' : 'Pastikan semua jarak dan tipe kendaraan diisi';
        }
    });
  }

  if (step === 2) {
    document.querySelectorAll('.appliance-row').forEach(row => {
      const nameInput = row.querySelector('.app-name');
      const qtyInput = row.querySelector('.app-qty');
      let rowError = false;
      
      if (!nameInput.value || nameInput.value.trim() === "") {
        nameInput.classList.add('error-border');
        rowError = true;
        isValid = false;
      }
      if (!qtyInput.value || qtyInput.value.trim() === "") {
        qtyInput.classList.add('error-border');
        rowError = true;
        isValid = false;
      }

      // Apply ONE error message per row to maintain grid layout
      if (rowError) {
        let msg = row.querySelector('.row-error-msg');
        if (!msg) {
          msg = document.createElement('div');
          msg.className = 'error-message row-error-msg';
          row.appendChild(msg);
        }
        msg.textContent = lang === 'en' ? 'Please fill in all appliance fields' : 'Mohon isi semua bidang perabotan';
      }
    });

    let billInput = document.getElementById("electric-bill");
    if(billInput.value.trim() === "") {
      markError(billInput);
      isValid = false;
    }
  }

  return isValid;
}

// --- GO TO NEXT STEP ---
function goStep(n) {
  // ONLY validate if moving forward
  if (n > currentStep) {
    let isValid = getValid(currentStep);
    if (!isValid) return; 
  }
 
  if (currentStep >= 1) emissions.transport = calcTransport(); 
  if (currentStep >= 2) emissions.house = calcHouse();
  updateSidebar(emissions.transport, emissions.house, 0);

  document.getElementById('step' + currentStep).style.display = 'none';
  currentStep = n;
  document.getElementById('step' + currentStep).style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── ADD ITEM FUNCTIONS ───
function addAppliance() {
  const list = document.getElementById('appliance-list');
  const row = document.createElement('div');
  row.className = 'appliance-row';
  row.innerHTML = `
    <input type="text" data-i18n="calc_s2_place_app" placeholder="cth. Lampu" class="app-name" />
    <input type="number" data-i18n="calc_s2_place_qty" placeholder="Masukkan jumlah perabotan" class="app-qty" min="0" />
    <button class="btn-remove" onclick="removeAppliance(this)">×</button>
  `;
  list.appendChild(row);
  
  if (typeof setLanguage === 'function') setLanguage(localStorage.getItem('preferredLang') || 'id');
}

function addTransport() {
  const list = document.getElementById('transport-list');
  const row = document.createElement('div');
  row.className = 'form-row transport-row';
  row.style.marginBottom = '16px';
  row.style.alignItems = 'flex-end';
  
  row.innerHTML = `
    <div class="form-group" style="flex: 1;">
      <label data-i18n="calc_s1_label_dist">Total Jarak Tempuh (km)</label>
      <input type="number" class="trans-distance" data-i18n="calc_s1_place_dist" placeholder="cth. 50" min="0" />
    </div>
    <div class="form-group" style="flex: 1;">
      <label data-i18n="calc_s1_label_type">Tipe Transportasi</label>
      <select class="trans-type">
        <option value="unpicked" data-i18n="calc_s1_opt_unpicked">Pilih kendaraan</option>
        <option value="motor" data-i18n="calc_s1_opt_motor">Motor</option>
        <option value="mobil" data-i18n="calc_s1_opt_mobil">Mobil Bensin</option>
        <option value="mobil-diesel" data-i18n="calc_s1_opt_diesel">Mobil Diesel</option>
        <option value="bus" data-i18n="calc_s1_opt_bus">Bus Umum</option>
        <option value="kereta" data-i18n="calc_s1_opt_kereta">Kereta</option>
        <option value="pesawat" data-i18n="calc_s1_opt_pesawat">Pesawat</option>
        <option value="mobil-listrik" data-i18n="calc_s1_opt_mobil_ev">Mobil Listrik</option>
        <option value="motor-listrik" data-i18n="calc_s1_opt_motor_ev">Motor Listrik</option>
      </select>
    </div>
    <button class="btn-remove" type="button" onclick="removeTransport(this)" style="margin-bottom: 6px; padding: 10px 14px;">×</button>
  `;
  list.appendChild(row);
  
  if (typeof setLanguage === 'function') setLanguage(localStorage.getItem('preferredLang') || 'id');
}

// ─── REMOVE ITEM FUNCTIONS ───
function removeAppliance(btn) {
  const list = document.getElementById('appliance-list');
  if (list.children.length > 1) {
    btn.closest('.appliance-row').remove();
  }
}

function removeTransport(btn) {
  const list = document.getElementById('transport-list');
  const lang = localStorage.getItem('preferredLang') || 'id';
  
  if (list.children.length > 1) {
    btn.closest('.transport-row').remove();
    emissions.transport = calcTransport();
    updateSidebar(emissions.transport, emissions.house, 0);
  } else {
    alert(lang === 'en' ? "⚠️ You must have at least one transportation input." : "⚠️ Minimal harus ada satu input transportasi.");
  }
}

// Menampilkan Hasil Akhir Kalkulator
function showResult() {
  const meatInput = document.getElementById('meat-portions');
  const localFoodInput = document.getElementById('local-food');

  const meatValueRaw = meatInput.value.trim();
  const localFoodValueRaw = localFoodInput.value.trim();
  
  const meatPortions = parseFloat(meatValueRaw);
  const localFood = parseFloat(localFoodValueRaw);

  const lang = localStorage.getItem('preferredLang') || 'id';
  let isValid = true;

  if (meatValueRaw === "") {
    markError(meatInput);
    isValid = false;
  } else if (meatPortions < 0) {
    markError(meatInput, lang === 'en' ? 'Cannot be negative' : 'Tidak boleh negatif');
    isValid = false;
  }

  if (localFoodValueRaw === "") {
    markError(localFoodInput);
    isValid = false;
  } else if (localFood < 0 || localFood > 100) {
    markError(localFoodInput, lang === 'en' ? 'Must be 0-100%' : 'Harus antara 0-100%');
    isValid = false;
  }

  if (!isValid) return;

  emissions.transport = calcTransport();
  emissions.house = calcHouse();
  emissions.food = calcFood();
  const total = emissions.transport + emissions.house + emissions.food;

  document.getElementById('step' + currentStep).style.display = 'none';
  document.getElementById('step-result').style.display = 'block';

  document.getElementById('res-transport').textContent = emissions.transport.toFixed(2);
  document.getElementById('res-house').textContent = emissions.house.toFixed(2);
  document.getElementById('res-food').textContent = emissions.food.toFixed(2);
  updateSidebar(emissions.transport, emissions.house, emissions.food);

  let tip = '';
  if (total < 5) tip = lang === 'en' 
    ? '🌟 Excellent! Your emissions are well below average. Keep up this eco-friendly lifestyle!' 
    : '🌟 Luar biasa! Emisi Anda jauh di bawah rata-rata nasional. Terus pertahankan gaya hidup ramah lingkungan ini!';
  else if (total < 10) tip = lang === 'en'
    ? '✅ Your emissions are moderate. Try reducing private vehicle use and choosing more local foods.'
    : '✅ Emisi Anda tergolong sedang. Coba kurangi penggunaan kendaraan pribadi dan pilih lebih banyak makanan lokal.';
  else if (total < 20) tip = lang === 'en'
    ? '⚠️ Your emissions are quite high. Consider public transport, saving electricity, and reducing meat consumption.'
    : '⚠️ Emisi Anda cukup tinggi. Pertimbangkan beralih ke transportasi umum, menghemat listrik, dan mengurangi konsumsi daging.';
  else tip = lang === 'en'
    ? '🚨 Your emissions are very high. Prioritize reducing air travel, switching to renewables, and altering your diet.'
    : '🚨 Emisi Anda sangat tinggi. Prioritaskan pengurangan perjalanan udara, beralih ke energi terbarukan, dan ubah pola makan Anda.';

  const recText = lang === 'en' ? 'Recommendation:' : 'Rekomendasi:';
  document.getElementById('result-tip').innerHTML = `<strong>${recText}</strong> ${tip}`;

  // --- SAVE DATA ---
  const emissionData = {
    total: total.toFixed(2),
    transport: emissions.transport.toFixed(2),
    house: emissions.house.toFixed(2),
    food: emissions.food.toFixed(2),
    date: new Date().toISOString()
  };
  
  // Get existing history array, insert newest at the beginning, and save
  let history = JSON.parse(localStorage.getItem('emissionHistory')) || [];
  history.unshift(emissionData); 
  localStorage.setItem('emissionHistory', JSON.stringify(history));

  currentStep = 4;
}

function restart() {
  document.getElementById('step-result').style.display = 'none';
  document.getElementById('step1').style.display = 'block';
  currentStep = 1;
  emissions.transport = emissions.house = emissions.food = 0;
  updateSidebar(0, 0, 0);
  
  document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  
  ['electric-bill', 'meat-portions', 'local-food'].forEach(id => document.getElementById(id).value = '');
  document.querySelectorAll('.trans-distance').forEach(el => el.value = '');
  document.querySelectorAll('.trans-type').forEach(el => el.value = 'unpicked');
  document.querySelectorAll('.app-name').forEach(el => el.value = '');
  document.querySelectorAll('.app-qty').forEach(el => el.value = '');
}