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
// Note: calcTransport is overridden later in the file for dynamic rows, but kept here for fallback
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

function updateSidebar(t, h, f) {
  const total = t + h + f;
  document.getElementById('total-display').textContent =
    total > 0 ? total.toFixed(2) + ' Ton CO₂ / Tahun' : '??? Ton CO₂ / Tahun';
  const pct = Math.min(total / 20 * 100, 100);
  document.getElementById('sidebar-bar').style.width = pct + '%';
}

// ─── FUNGSI NAVIGASI LANGKAH (STEPS) ───
function getValid(currentStep) {
  let isValid = true;
  if (currentStep === 1) {
    // Modified to validate dynamic rows instead of single fields
    const rows = document.querySelectorAll('.transport-row');
    rows.forEach(row => {
        const distanceInput = row.querySelector('.trans-distance');
        const vehicleInput = row.querySelector('.trans-type');
        if (!distanceInput.value || distanceInput.value.trim() === "") isValid = false;
        if (vehicleInput.value === "unpicked") isValid = false;
    });
    if(!isValid) alert("Pastikan semua jarak dan tipe kendaraan dipilih!");
  }

  if (currentStep === 2) {
    let billInput = document.getElementById("electric-bill");
    if(billInput.value.trim() === "") {
      isValid = false;
      alert("Text input is empty!");
    }
  }
  if (currentStep === 3) {
    let meatInput = document.getElementById("meat-portions");
    let localInput = document.getElementById("local-food");

    if(meatInput.value.trim() === "") {
      isValid = false;
      alert("Text input is empty!");
    }
    if(localInput.value.trim() === "") {
      isValid = false;
      alert("Text input is empty!");
    }
  }

  return isValid;
}

function goStep(n) {
  let isValid = true;
  if (currentStep >= 1) {
    emissions.transport = calcTransport(); // Uses dynamic row version below
    isValid = getValid(currentStep);
    if (!isValid) return;
  }
 
  if (currentStep >= 2) emissions.house = calcHouse();
  updateSidebar(emissions.transport, emissions.house, 0);

  document.getElementById('step' + currentStep).style.display = 'none';
  currentStep = n;
  document.getElementById('step' + currentStep).style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menampilkan Hasil Akhir Kalkulator
function showResult() {
  const meatInput = document.getElementById('meat-portions');
  const localFoodInput = document.getElementById('local-food');

  const meatValueRaw = meatInput.value.trim();
  const localFoodValueRaw = localFoodInput.value.trim();
  
  const meatPortions = parseFloat(meatValueRaw);
  const localFood = parseFloat(localFoodValueRaw);

  if (meatValueRaw === "" || localFoodValueRaw === "") {
    alert("⚠️ Mohon isi semua bidang input pada Langkah 3 terlebih dahulu.");
    return;
  }
  if (meatPortions < 0) {
    alert("⚠️ Konsumsi daging tidak boleh bernilai negatif.");
    meatInput.focus();
    return;
  }
  if (localFood < 0 || localFood > 100) {
    alert("⚠️ Persentase makanan lokal harus berada di antara 0% hingga 100%.");
    localFoodInput.focus();
    return;
  }

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
  if (total < 5) tip = '🌟 Luar biasa! Emisi Anda jauh di bawah rata-rata nasional. Terus pertahankan gaya hidup ramah lingkungan ini!';
  else if (total < 10) tip = '✅ Emisi Anda tergolong sedang. Coba kurangi penggunaan kendaraan pribadi dan pilih lebih banyak makanan lokal untuk hasil yang lebih baik.';
  else if (total < 20) tip = '⚠️ Emisi Anda cukup tinggi. Pertimbangkan beralih ke transportasi umum, menghemat listrik, dan mengurangi konsumsi daging.';
  else tip = '🚨 Emisi Anda sangat tinggi. Prioritaskan pengurangan perjalanan udara, beralih ke energi terbarukan, dan ubah pola makan Anda.';

  document.getElementById('result-tip').innerHTML = '<strong>Rekomendasi:</strong> ' + tip;
  currentStep = 4;
}

function restart() {
  document.getElementById('step-result').style.display = 'none';
  document.getElementById('step1').style.display = 'block';
  currentStep = 1;
  emissions.transport = emissions.house = emissions.food = 0;
  updateSidebar(0, 0, 0);
  ['electric-bill', 'meat-portions', 'local-food'].forEach(id => document.getElementById(id).value = '');
  document.querySelectorAll('.trans-distance').forEach(el => el.value = '');
  document.querySelectorAll('.trans-type').forEach(el => el.value = 'unpicked');
}

// ─── PENGELOLAAN FORMAT PERABOTAN RUMAH TANGGA ───
function addAppliance() {
  const list = document.getElementById('appliance-list');
  const row = document.createElement('div');
  row.className = 'appliance-row';
  row.innerHTML = `
    <input type="text" placeholder="cth. AC" class="app-name" />
    <input type="number" placeholder="Jumlah" class="app-qty" min="0" />
    <button class="btn-remove" onclick="removeAppliance(this)">×</button>
  `;
  list.appendChild(row);
}

function removeAppliance(btn) {
  const list = document.getElementById('appliance-list');
  if (list.children.length > 1) {
    btn.closest('.appliance-row').remove();
  }
}

// ─── PENGELOLAAN TRANSPORTASI DINAMIS ───
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

function addTransport() {
  const list = document.getElementById('transport-list');
  const row = document.createElement('div');
  row.className = 'form-row transport-row';
  row.style.marginBottom = '16px';
  row.style.alignItems = 'flex-end';
  
  row.innerHTML = `
    <div class="form-group" style="flex: 1;">
      <label>Total Jarak Tempuh (km)</label>
      <input type="number" class="trans-distance" placeholder="cth. 50" min="0" />
    </div>
    <div class="form-group" style="flex: 1;">
      <label>Tipe Transportasi</label>
      <select class="trans-type">
        <option value="unpicked">Pilih kendaraan</option>
        <option value="motor">Motor</option>
        <option value="mobil">Mobil Bensin</option>
        <option value="mobil-diesel">Mobil Diesel</option>
        <option value="bus">Bus Umum</option>
        <option value="kereta">Kereta</option>
        <option value="pesawat">Pesawat</option>
        <option value="mobil-listrik">Mobil Listrik</option>
        <option value="motor-listrik">Motor Listrik</option>
      </select>
    </div>
    <button class="btn-remove" type="button" onclick="removeTransport(this)" style="margin-bottom: 6px; padding: 10px 14px;">×</button>
  `;
  list.appendChild(row);
}

function removeTransport(btn) {
  const list = document.getElementById('transport-list');
  if (list.children.length > 1) {
    btn.closest('.transport-row').remove();
    emissions.transport = calcTransport();
    updateSidebar(emissions.transport, emissions.house, 0);
  } else {
    alert("⚠️ Minimal harus ada satu input transportasi.");
  }
}