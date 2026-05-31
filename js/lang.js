const username = localStorage.getItem('username') || 'Eco User';

// 1. The Dictionary Object
const translations = {
  id: {
    // Navigation & General
    nav_home: "Home",
    nav_calc: "Calculator",
    nav_dash: "Dashboard",
    nav_about: "About Us",
    btn_login: "Login",
    btn_back: "Kembali",
    btn_next: "Selanjutnya →",
    ft_service: "Service",
    ft_contact: "Contact Us",
    
    // --- HOME & ABOUT (Kept from previous) ---
    home_hero_title: "Penasaran Berapa CO₂ Yang Anda Hasilkan?",
    home_hero_btn: "Hitung Emisi Karbon Kamu",
    home_hero_desc: "Mulai langkah kecilmu hari ini dan jadilah bagian dari generasi peduli lingkungan. Pahami dan kurangi jejak karbonmu dengan cara yang mudah dan interaktif!",
    home_impact_label: "Memang Benar Mengurangi Emisi Penting?",
    home_impact_title: "Inilah Yang Akan Terjadi Jika Emisi Terus Naik",
    home_impact_c1_title: "Pemanasan Global",
    home_impact_c1_desc: "Suhu Indonesia diperkirakan naik sekitar 1–1.5 °C pada 2050. Dampaknya adalah cuaca makin panas serta risiko banjir dan kekeringan yang lebih tinggi. Hal ini terjadi karena gas seperti CO₂ menahan panas di atmosfer dan memicu pemanasan global.",
    home_impact_c2_title: "Kualitas Udara",
    home_impact_c2_desc: "Kualitas udara diperkirakan akan semakin memburuk di masa depan. Dampaknya dapat berupa meningkatnya polusi udara, gangguan pernapasan, dan risiko kesehatan lainnya. Hal ini terjadi karena emisi dari kendaraan dan industri menghasilkan polutan serta gas rumah kaca yang mencemari atmosfer.",
    home_plan_title: "Rencananya Apa Dong?",
    home_plan_c1_title: "Emisi Pada 2025",
    home_plan_c1_desc: "Pada tahun 2025, emisi karbon Indonesia masih tergolong tinggi. Sektor transportasi dan energi menjadi penyumbang terbesar emisi karbon. Kendaraan bermotor, penggunaan bahan bakar fosil, dan aktivitas industri terus meningkatkan jumlah gas rumah kaca di atmosfer.",
    home_plan_c2_title: "Target Emisi",
    home_plan_c2_desc: "Indonesia menargetkan pengurangan emisi karbon secara bertahap menuju net zero emission pada tahun 2060. Pemerintah mulai meningkatkan penggunaan energi terbarukan serta mendorong penggunaan kendaraan listrik dan transportasi umum.",
    about_title: "Tentang EcoHabit",
    about_desc: "EcoHabit adalah platform edukasi lingkungan yang membantu masyarakat Indonesia memahami dan mengurangi jejak karbon mereka melalui cara yang mudah dan interaktif.",

    // --- CALCULATOR PAGE ---
    calc_title: "Kalkulator Emisi Karbon",
    calc_subtitle: "Hitung emisi karbon Anda hanya dalam 3 langkah!",
    
    // Calc Step 1
    calc_s1_title: "Langkah 1: Transportasi",
    calc_s1_progress: "0% Selesai",
    calc_s1_head: "Transportasi",
    calc_s1_desc: "Kendaraan apa saja yang Anda gunakan untuk bepergian?",
    calc_s1_label_dist: "Total Jarak Tempuh (km)",
    calc_s1_place_dist: "cth. 50",
    calc_s1_label_type: "Tipe Transportasi",
    calc_s1_opt_unpicked: "Pilih kendaraan",
    calc_s1_opt_motor: "Motor",
    calc_s1_opt_mobil: "Mobil Bensin",
    calc_s1_opt_diesel: "Mobil Diesel",
    calc_s1_opt_bus: "Bus Umum",
    calc_s1_opt_kereta: "Kereta",
    calc_s1_opt_pesawat: "Pesawat",
    calc_s1_opt_mobil_ev: "Mobil Listrik",
    calc_s1_opt_motor_ev: "Motor Listrik",
    calc_s1_btn_add: "+ Tambah Transportasi",

    // Calc Step 2
    calc_s2_title: "Langkah 2: Rumah Tangga",
    calc_s2_progress: "33% Selesai",
    calc_s2_head: "Rumah Tangga",
    calc_s2_desc: "Peralatan apa saja yang ada di rumah Anda?",
    calc_s2_label_app: "Perabotan-Perabotan",
    calc_s2_place_app: "cth. Lampu",
    calc_s2_place_qty: "Masukkan jumlah perabotan",
    calc_s2_btn_add: "+ Tambah Baris",
    calc_s2_label_bill: "Tagihan Listrik/Bulan (Rp)",
    calc_s2_place_bill: "cth. 300000",

    // Calc Step 3
    calc_s3_title: "Langkah 3: Makanan & Minuman",
    calc_s3_progress: "67% Selesai",
    calc_s3_head: "Makanan & Minuman",
    calc_s3_desc: "Bagaimana pola makan Anda sehari-hari?",
    calc_s3_label_diet: "Pola Makan",
    calc_s3_opt_vegan: "Vegan",
    calc_s3_opt_vege: "Vegetarian",
    calc_s3_opt_mixed: "Campuran",
    calc_s3_opt_meat: "Banyak Daging",
    calc_s3_label_meat: "Konsumsi Daging/Minggu (porsi)",
    calc_s3_place_meat: "cth. 7",
    calc_s3_label_local: "Konsumsi Makanan Lokal (%)",
    calc_s3_place_local: "cth. 60",
    calc_s3_btn_calc: "Hitung Emisi →",

    // Calc Result
    calc_res_title: "Hasil Estimasi Anda",
    calc_res_progress: "100% Selesai ✓",
    calc_res_head: "Emisi Karbon Anda",
    calc_res_desc: "Berdasarkan data yang Anda masukkan",
    calc_res_trans: "Transportasi\n(Ton CO₂/Tahun)",
    calc_res_house: "Rumah Tangga\n(Ton CO₂/Tahun)",
    calc_res_food: "Makanan\n(Ton CO₂/Tahun)",
    calc_res_btn_restart: "🔄 Hitung Ulang",
    
    // Calc Sidebar
    calc_side_title: "Estimasi Emisi Karbon",
    calc_side_trans: "Transportasi",
    calc_side_house: "Perabotan Rumah Tangga",
    calc_side_food: "Makanan & Minuman",

    // --- DASHBOARD PAGE ---
    dash_out_title: "Dashboard",
    dash_out_desc: "Login untuk melihat riwayat dan perkembangan emisi karbon Anda dari waktu ke waktu.",
    dash_out_btn: "Login Sekarang",
    
    dash_in_greet: `Halo, ${username}! 👋`,
    dash_in_sub: "Berikut adalah ringkasan jejak karbon Anda bulan ini.",
    dash_in_btn_new: "+ Hitung Emisi Baru",
    
    dash_c1_title: "Total Emisi",
    dash_c1_desc: "↑ 12% dari bulan lalu",
    dash_c2_title: "Penghasil Terbesar",
    dash_c2_val: "Transportasi",
    dash_c2_desc: "45% dari total emisi Anda",
    dash_c3_title: "Target Bulanan",
    dash_c3_val: "Tercapai!",
    dash_c3_desc: "Anda menghemat 0.5 Ton CO₂",
    
    dash_hist_title: "Riwayat Perhitungan Terakhir",
    dash_hist_cat1: "Transportasi & Rumah Tangga",
    dash_hist_cat2: "Semua Kategori",
    dash_hist_cat3: "Transportasi",
    dash_hist_mo1: "Mei 2026",
    dash_hist_mo2: "April 2026",
    dash_hist_mo3: "Maret 2026"
  },
  en: {
    // Navigation & General
    nav_home: "Home",
    nav_calc: "Calculator",
    nav_dash: "Dashboard",
    nav_about: "About Us",
    btn_login: "Login",
    btn_back: "Back",
    btn_next: "Next →",
    ft_service: "Service",
    ft_contact: "Contact Us",
    
    // --- HOME & ABOUT ---
    home_hero_title: "Curious About How Much CO₂ You Produce?",
    home_hero_btn: "Calculate Your Carbon Emission",
    home_hero_desc: "Start your small steps today and become part of an environmentally conscious generation. Understand and reduce your carbon footprint in an easy and interactive way!",
    home_impact_label: "Is Reducing Emissions Really That Important?",
    home_impact_title: "Here Is What Will Happen If Emissions Keep Rising",
    home_impact_c1_title: "Global Warming",
    home_impact_c1_desc: "Indonesia's temperature is projected to rise by around 1–1.5 °C by 2050. The impact will be increasingly hotter weather, as well as higher risks of floods and droughts. This happens because gases like CO₂ trap heat in the atmosphere, triggering global warming.",
    home_impact_c2_title: "Air Quality",
    home_impact_c2_desc: "Air quality is expected to worsen in the future. The impacts can include increased air pollution, respiratory disorders, and other health risks. This occurs because emissions from vehicles and industries produce pollutants and greenhouse gases that contaminate the atmosphere.",
    home_plan_title: "So, What's The Plan?",
    home_plan_c1_title: "Emissions in 2025",
    home_plan_c1_desc: "As of 2025, Indonesia's carbon emissions remain relatively high. The transportation and energy sectors are the largest contributors to carbon emissions. Motor vehicles, fossil fuel consumption, and industrial activities continue to increase the amount of greenhouse gases in the atmosphere.",
    home_plan_c2_title: "Emission Targets",
    home_plan_c2_desc: "Indonesia aims to gradually reduce carbon emissions towards net zero emissions by 2060. The government has started increasing the use of renewable energy and encouraging the adoption of electric vehicles and public transportation.",
    about_title: "About EcoHabit",
    about_desc: "EcoHabit is an environmental education platform that helps Indonesians understand and reduce their carbon footprint through an easy and interactive approach.",

    // --- CALCULATOR PAGE ---
    calc_title: "Carbon Emission Calculator",
    calc_subtitle: "Calculate your carbon emission in just 3 steps!",
    
    calc_s1_title: "Step 1: Transportation",
    calc_s1_progress: "0% Complete",
    calc_s1_head: "Transportation",
    calc_s1_desc: "What vehicles do you use to travel?",
    calc_s1_label_dist: "Total Distance (km)",
    calc_s1_place_dist: "e.g. 50",
    calc_s1_label_type: "Transportation Type",
    calc_s1_opt_unpicked: "Select vehicle",
    calc_s1_opt_motor: "Motorcycle",
    calc_s1_opt_mobil: "Gasoline Car",
    calc_s1_opt_diesel: "Diesel Car",
    calc_s1_opt_bus: "Public Bus",
    calc_s1_opt_kereta: "Train",
    calc_s1_opt_pesawat: "Airplane",
    calc_s1_opt_mobil_ev: "Electric Car",
    calc_s1_opt_motor_ev: "Electric Motorcycle",
    calc_s1_btn_add: "+ Add Transportation",

    calc_s2_title: "Step 2: Household",
    calc_s2_progress: "33% Complete",
    calc_s2_head: "Household",
    calc_s2_desc: "What appliances do you have at home?",
    calc_s2_label_app: "Appliances",
    calc_s2_place_app: "e.g. Lamp",
    calc_s2_place_qty: "Enter appliance quantity",
    calc_s2_btn_add: "+ Add Row",
    calc_s2_label_bill: "Monthly Electricity Bill (Rp)",
    calc_s2_place_bill: "e.g. 300000",

    calc_s3_title: "Step 3: Food & Beverage",
    calc_s3_progress: "67% Complete",
    calc_s3_head: "Food & Beverage",
    calc_s3_desc: "What is your daily diet?",
    calc_s3_label_diet: "Diet",
    calc_s3_opt_vegan: "Vegan",
    calc_s3_opt_vege: "Vegetarian",
    calc_s3_opt_mixed: "Mixed",
    calc_s3_opt_meat: "Meat-Heavy",
    calc_s3_label_meat: "Meat Consumption/Week (portions)",
    calc_s3_place_meat: "e.g. 7",
    calc_s3_label_local: "Local Food Consumption (%)",
    calc_s3_place_local: "e.g. 60",
    calc_s3_btn_calc: "Calculate Emission →",

    calc_res_title: "Your Estimation Result",
    calc_res_progress: "100% Complete ✓",
    calc_res_head: "Your Carbon Emission",
    calc_res_desc: "Based on the data you entered",
    calc_res_trans: "Transportation\n(Tons CO₂/Year)",
    calc_res_house: "Household\n(Tons CO₂/Year)",
    calc_res_food: "Food\n(Tons CO₂/Year)",
    calc_res_btn_restart: "🔄 Recalculate",

    calc_side_title: "Estimated Carbon Emission",
    calc_side_trans: "Transportation",
    calc_side_house: "Household Appliances",
    calc_side_food: "Food & Beverage",

    // --- DASHBOARD PAGE ---
    dash_out_title: "Dashboard",
    dash_out_desc: "Login to view your carbon emission history and progress over time.",
    dash_out_btn: "Login Now",
    
    dash_in_greet: `Hello, ${username}! 👋`,
    dash_in_sub: "Here is a summary of your carbon footprint this month.",
    dash_in_btn_new: "+ Calculate New Emission",
    
    dash_c1_title: "Total Emission",
    dash_c1_desc: "↑ 12% from last month",
    dash_c2_title: "Biggest Contributor",
    dash_c2_val: "Transportation",
    dash_c2_desc: "45% of your total emission",
    dash_c3_title: "Monthly Target",
    dash_c3_val: "Achieved!",
    dash_c3_desc: "You saved 0.5 Tons of CO₂",
    
    dash_hist_title: "Recent Calculation History",
    dash_hist_cat1: "Transportation & Household",
    dash_hist_cat2: "All Categories",
    dash_hist_cat3: "Transportation",
    dash_hist_mo1: "May 2026",
    dash_hist_mo2: "April 2026",
    dash_hist_mo3: "March 2026"
  }
};

// 2. The Language Switcher Function
function setLanguage(lang) {
  localStorage.setItem('preferredLang', lang);
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(element => {
    const translationKey = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][translationKey]) {
      
      // NEW: Check if the element is an input to update the placeholder instead
      if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
        element.placeholder = translations[lang][translationKey];
      } 
      // Update normal text content
      else {
        element.textContent = translations[lang][translationKey];
      }
    }
  });

  const btnId = document.getElementById('lang-id');
  const btnEn = document.getElementById('lang-en');
  
  if (btnId && btnEn) {
    if (lang === 'id') {
      btnId.classList.add('active');
      btnEn.classList.remove('active');
    } else {
      btnEn.classList.add('active');
      btnId.classList.remove('active');
    }
  }
}

// 3. Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Check if user has a saved language, default to 'id' if not
  const savedLang = localStorage.getItem('preferredLang') || 'id';
  setLanguage(savedLang);

  // Target the entire container instead of individual buttons
  const langContainer = document.querySelector('.lang-toggle');

  if (langContainer) {
    langContainer.addEventListener('click', () => {
      // Find the current language, and swap it to the other
      const currentLang = localStorage.getItem('preferredLang') || 'id';
      const newLang = currentLang === 'id' ? 'en' : 'id';
      
      setLanguage(newLang);
    });
  }
});