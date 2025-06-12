(() => {
  const formulaSelect = document.getElementById('formula-select');
  const forms = {
    luas_segitiga: document.getElementById('form-luas_segitiga'),
    luas_balok: document.getElementById('form-luas_balok'),
    luas_bola: document.getElementById('form-luas_bola'),
    luas_kerucut: document.getElementById('form-luas_kerucut'),
    hitung_kecepatan: document.getElementById('form-hitung_kecepatan'),
    hitung_jarak: document.getElementById('form-hitung_jarak'),
    hitung_waktu: document.getElementById('form-hitung_waktu'),
  };
  const resultDiv = document.getElementById('result');

  // Hide all forms
  function hideAllForms() {
    Object.values(forms).forEach(form => {
      form.classList.remove('active');
      form.setAttribute('aria-hidden', 'true');
      form.reset();
    });
    resultDiv.style.display = 'none';
    resultDiv.textContent = '';
  }

  // Show selected form
  function showForm(key) {
    if (forms[key]) {
      forms[key].classList.add('active');
      forms[key].setAttribute('aria-hidden', 'false');
    }
  }

  // Calculation functions
  function calculateLuasSegitiga(alas, tinggi) {
    return 0.5 * alas * tinggi;
  }
  function calculateLuasBalok(panjang, lebar, tinggi) {
    return 2 * (panjang * lebar) + 2 * (panjang * tinggi) + 2 * (lebar * tinggi);
  }
  function calculateLuasBola(r) {
    return 4 * Math.PI * r * r;
  }
  function calculateLuasKerucut(d, s) {
    const r = d / 2;
    return Math.PI * r * (s + r);
  }
  function calculateKecepatan(jarak, waktu) {
    return jarak / waktu;
  }
  function calculateJarak(kecepatan, waktu) {
    return kecepatan * waktu;
  }
  function calculateWaktu(jarak, kecepatan) {
    return jarak / kecepatan;
  }

  // Event: formula select change
  formulaSelect.addEventListener('change', e => {
    hideAllForms();
    resultDiv.style.display = 'none';
    resultDiv.textContent = '';
    const formula = e.target.value;
    showForm(formula);
  });

  // Form submissions
  Object.entries(forms).forEach(([key, form]) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      resultDiv.style.display = 'block';
      let resText = '';
      try {
        switch (key) {
          case 'luas_segitiga': {
            const alas = parseFloat(form.elements.namedItem('alas').value);
            const tinggi = parseFloat(form.elements.namedItem('tinggi').value);
            if (alas <= 0 || tinggi <= 0) throw 'Nilai harus lebih dari 0';
            const luas = calculateLuasSegitiga(alas, tinggi);
            resText = `Luas segitiga adalah: ${luas.toFixed(1)} cm`;
            break;
          }
          case 'luas_balok': {
            const panjang = parseFloat(form.elements.namedItem('panjang').value);
            const lebar = parseFloat(form.elements.namedItem('lebar').value);
            const tinggi = parseFloat(form.elements.namedItem('tinggi-balok').value);
            if (panjang <= 0 || lebar <= 0 || tinggi <= 0) throw 'Nilai harus lebih dari 0';
            const luas = calculateLuasBalok(panjang, lebar, tinggi);
            resText = `Luas balok adalah: ${luas.toFixed(1)} cm`;
            break;
          }
          case 'luas_bola': {
            const r = parseFloat(form.elements.namedItem('jari-jari-bola').value);
            if (r <= 0) throw 'Nilai harus lebih dari 0';
            const luas = calculateLuasBola(r);
            resText = `Luas bola adalah: ${luas.toFixed(1)} cm`;
            break;
          }
          case 'luas_kerucut': {
            const d = parseFloat(form.elements.namedItem('diameter-kerucut').value);
            const s = parseFloat(form.elements.namedItem('garis-pelukis').value);
            if (d <= 0 || s <= 0) throw 'Nilai harus lebih dari 0';
            const luas = calculateLuasKerucut(d, s);
            resText = `Jari-jari (r) = ${(d / 2).toFixed(1)}<br>Luas kerucut adalah: ${luas.toFixed(1)} cm`;
            break;
          }
          case 'hitung_kecepatan': {
            const jarak = parseFloat(form.elements.namedItem('jarak').value);
            const waktu = parseFloat(form.elements.namedItem('waktu').value);
            if (jarak < 0 || waktu <= 0) throw 'Jarak harus >= 0 dan waktu harus > 0';
            const kecepatan = calculateKecepatan(jarak, waktu);
            resText = `Kecepatan adalah: ${kecepatan.toFixed(1)} cm/jam`;
            break;
          }
          case 'hitung_jarak': {
            const kecepatan = parseFloat(form.elements.namedItem('kecepatan').value);
            const waktu = parseFloat(form.elements.namedItem('waktu').value);
            if (kecepatan < 0 || waktu < 0) throw 'Kecepatan dan waktu harus >= 0';
            const jarak = calculateJarak(kecepatan, waktu);
            resText = `Jarak adalah: ${jarak.toFixed(1)} cm`;
            break;
          }
          case 'hitung_waktu': {
            const jarak = parseFloat(form.elements.namedItem('jarak').value);
            const kecepatan = parseFloat(form.elements.namedItem('kecepatan').value);
            if (jarak < 0 || kecepatan <= 0) throw 'Jarak harus >= 0 dan kecepatan harus > 0';
            const waktu = calculateWaktu(jarak, kecepatan);
            resText = `Waktu adalah: ${waktu.toFixed(1)} menit`;
            break;
          }
          default:
            resText = 'Formula tidak dikenali.';
        }
      } catch (err) {
        resText = `Error: ${err}`;
      }
      resultDiv.innerHTML = resText;
      resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
