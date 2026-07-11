alert("Halo, JS sudah tersambung!");
document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "id";

  const scrollProgress = document.getElementById("scrollProgress");
  function updateScrollProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + "%";
  }
  document.addEventListener("scroll", updateScrollProgress);

  const navbar = document.getElementById("navbar");
  const stickyCta = document.getElementById("stickyCta");
  const hero = document.getElementById("hero");

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      if (navbar) navbar.classList.toggle("scrolled", !entry.isIntersecting);
      if (stickyCta)
        stickyCta.classList.toggle("is-visible", !entry.isIntersecting);
    },
    { threshold: 0.1 },
  );

  if (hero) {
    heroObserver.observe(hero);
  }

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.style.display === "flex";
      navLinks.style.cssText = isOpen
        ? ""
        : "display:flex;position:absolute;top:60px;left:0;right:0;flex-direction:column;background:var(--surface);padding:1rem;border-radius:16px;border:1px solid var(--border);box-shadow:var(--shadow-soft);";
    });
  }

  const darkModeToggle = document.getElementById("darkModeToggle");
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem("kn-theme");
  if (savedTheme && htmlEl) htmlEl.setAttribute("data-theme", savedTheme);

  if (darkModeToggle && htmlEl) {
    darkModeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", next);
      localStorage.setItem("kn-theme", next);
    });
  }

  const langSwitch = document.getElementById("langSwitch");

  function applyLang(lang) {
    document.querySelectorAll("[data-id][data-en]").forEach((el) => {
      el.textContent =
        lang === "id" ? el.getAttribute("data-id") : el.getAttribute("data-en");
    });
    document.documentElement.lang = lang;
  }

  if (langSwitch) {
    langSwitch.addEventListener("click", () => {
      currentLang = currentLang === "id" ? "en" : "id";
      applyLang(currentLang);
      renderHeroHeadline();
      renderQuizQuestion();
    });
  }

  const heroTexts = {
    id: "Kampung yang Menjaga Waktu, Menjaga Bumi",
    en: "A Village That Guards Time, Guards the Earth",
  };

  function renderHeroHeadline() {
    const el = document.getElementById("heroHeadline");
    if (!el) return; // Mencegah error jika elemen heroHeadline tidak ada
    const words = heroTexts[currentLang].split(" ");
    el.innerHTML = words
      .map(
        (w, i) =>
          `<span class="word" style="animation-delay:${0.15 + i * 0.07}s">${w}&nbsp;</span>`,
      )
      .join("");
  }
  renderHeroHeadline();

  const revealElements = document.querySelectorAll(".reveal ");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  const aboutIllust = document.querySelector(".about-illustration");
  const illustObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) aboutIllust.classList.add("is-visible");
    },
    { threshold: 0.3 },
  );
  if (aboutIllust) illustObserver.observe(aboutIllust);

  const panelImageEl = document.getElementById("panelImage");
  const mapData = {
    rumah: {
      title: "Rumah Adat",
      tag: "Permukiman",
      image: "images/rumah-adat.jpg",
      desc: "Rumah adat dengan susunan dinding panggung khas Kampung Naga yang dibangun menggunakan bahan alami seperti bambu dan kayu.",
      fact: "Bentuk bangunan harus seragam menghadap ke arah utara atau selatan sesuai adat pikukuh.",
      rules: [
        "Tidak boleh menggunakan semen untuk dinding",
        "Atap wajib menggunakan ijuk atau rumbia",
      ],
      duration: "20 Menit",
    },
    masjid: {
      title: "Masjid Kampung",
      tag: "Tempat Ibadah",
      image: "images/Masjid-Kampung-naga.jpg",
      desc: "Pusat ibadah dan kegiatan keagamaan masyarakat Kampung Naga yang kental dengan nuansa gotong royong.",
      fact: "Arsitekturnya sangat bersahaja dan menyatu dengan alam tanpa kubah logam eksternal.",
      rules: [
        "Wajib menjaga kesucian lingkungan sekitar",
        "Berpakaian sopan dan tertib",
      ],
      duration: "15 Menit",
    },
    sungai: {
      title: "Sungai Ciwulan",
      tag: "Alam",
      image: "images/Sungai-Ciwulan.jpg",
      desc: "Aliran sungai jernih yang menjadi urat nadi kehidupan, sumber pengairan sawah, dan kebutuhan harian warga.",
      fact: "Warga menjaga kelestarian sungai tanpa mencemari dengan limbah kimia berbahaya.",
      rules: [
        "Dilarang membuang sampah jenis apa pun ke sungai",
        "Dilarang merusak ekosistem air",
      ],
      duration: "15 Menit",
    },
    sawah: {
      title: "Sawah Terasering",
      tag: "Pertanian",
      image: "images/sawah-terasaing.jpg",
      desc: "Sistem pertanian berundak yang indah dan diolah menggunakan kerbau atau alat tradisional tanpa mesin modern.",
      fact: "Siklus tanam diatur bersama untuk menjaga keseimbangan stok pangan dan kesuburan tanah.",
      rules: [
        "Dilarang merusak pematang sawah",
        "Gunakan jalur setapak yang disediakan",
      ],
      duration: "30 Menit",
    },
    hutan: {
      title: "Hutan Larangan",
      tag: "Kawasan Suci",
      image: "images/hutan-larangan.JPG",
      desc: "Area hutan sakral yang dijaga ketat kelestariannya dan menjadi daerah resapan air utama bagi kampung.",
      fact: "Pepohonan di dalam kawasan ini sama sekali tidak boleh ditebang atau dirusak sejak ratusan tahun lalu.",
      rules: [
        "Wisatawan dilarang keras memasuki area ini",
        "Dilarang mengambil apa pun dari batas hutan",
      ],
      duration: "10 Menit (Hanya dari batas luar)",
    },
    jalur: {
      title: "Tangga Seribu",
      tag: "Akses Utama",
      image: "images/Jalur-Wisata-Utama.jpg",
      desc: "Jalur setapak berupa ratusan anak tangga batu yang menjadi akses satu-satunya untuk masuk ke area pemukiman.",
      fact: "Tangga ini melatih fisik sekaligus kesabaran para pengunjung sebelum mencapai kedamaian di dalam kampung.",
      rules: [
        "Berjalan dengan hati-hati terutama saat hujan",
        "Utamakan warga lokal yang membawa beban berat",
      ],
      duration: "15 Menit",
    },
  };

const mapPins = document.querySelectorAll(".map-pin");
const mapListItems = document.querySelectorAll(".map-list-item");
const mapPanel = document.getElementById("mapPanel");
const closeMapPanel = document.getElementById("closeMapPanel");
const panelTag = document.getElementById("panelTag");
const panelTitle = document.getElementById("panelTitle");
const panelDesc = document.getElementById("panelDesc");
const panelFact = document.getElementById("panelFact");
const panelDuration = document.getElementById("panelDuration");
const panelRules = document.getElementById("panelRules");

function openLocation(loc) {
  const data = mapData[loc];
  if (!data) return;

  if (panelImageEl) {
    if (data.image) {
      panelImageEl.src = data.image;
      panelImageEl.style.display = "block";
    } else {
      panelImageEl.style.display = "none";
    }
  }

  panelTag.textContent = data.tag;
  panelTitle.textContent = data.title;
  panelDesc.textContent = data.desc;
  panelFact.textContent = data.fact;
  panelDuration.textContent = data.duration;
  panelRules.innerHTML = data.rules.map((r) => `<li>${r}</li>`).join("");

  mapPanel.classList.add("is-open");

  mapPins.forEach((p) => p.classList.toggle("active", p.getAttribute("data-loc") === loc));
  mapListItems.forEach((item) => item.classList.toggle("active", item.getAttribute("data-loc") === loc));
}

mapPins.forEach((pin) => {
  pin.addEventListener("click", () => openLocation(pin.getAttribute("data-loc")));
});

mapListItems.forEach((item) => {
  item.addEventListener("click", () => openLocation(item.getAttribute("data-loc")));
});

closeMapPanel.addEventListener("click", () => {
  mapPanel.classList.remove("is-open");
  mapPins.forEach((p) => p.classList.remove("active"));
  mapListItems.forEach((item) => item.classList.remove("active"));
});

  const checkItems = document.querySelectorAll(".check-item");
  const progressFill = document.getElementById("progressFill");
  const progressPercent = document.getElementById("progressPercent");
  const badgeModal = document.getElementById("badgeModal");
  const closeBadgeModal = document.getElementById("closeBadgeModal");
  const CIRCUMFERENCE = 163; // 2 * PI * r(26)
  let badgeShown = false;

  function updateChecklistProgress() {
    const total = checkItems.length;
    const checked = document.querySelectorAll(".check-item.checked").length;
    const percent = Math.round((checked / total) * 100);
    progressPercent.textContent = percent + "%";
    const offset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;
    progressFill.style.strokeDashoffset = offset;

    if (percent === 100 && !badgeShown) {
      badgeShown = true;
      setTimeout(() => badgeModal.classList.add("is-open"), 300);
    }
    if (percent < 100) badgeShown = false;
  }

  checkItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("checked");
      updateChecklistProgress();
    });
  });
  closeBadgeModal.addEventListener("click", () =>
    badgeModal.classList.remove("is-open"),
  );
  badgeModal.addEventListener("click", (e) => {
    if (e.target === badgeModal) badgeModal.classList.remove("is-open");
  });

  const filterChips = document.querySelectorAll(".filter-chip");
  const productCards = document.querySelectorAll(".product-card");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.getAttribute("data-filter");
      productCards.forEach((card) => {
        const match =
          filter === "all" || card.getAttribute("data-cat") === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });

  const statNums = document.querySelectorAll(".stat-card .num");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  statNums.forEach((el) => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString("id-ID") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const quizData = [
    {
      q: {
        id: "Apa yang sebaiknya kamu lakukan jika menemukan sampah di sawah warga?",
        en: "What should you do if you find trash in a resident's rice field?",
      },
      options: [
        {
          id: "Membiarkannya, bukan urusan saya",
          en: "Leave it, it's not my business",
          correct: false,
        },
        {
          id: "Mengambil dan membuangnya di tempat sampah terdekat",
          en: "Pick it up and dispose of it at the nearest bin",
          correct: true,
        },
        {
          id: "Menendangnya ke pinggir jalan",
          en: "Kick it to the roadside",
          correct: false,
        },
      ],
    },
    {
      q: {
        id: "Bolehkah menggunakan drone tanpa izin di area kampung?",
        en: "Is it okay to use a drone without permission in the village?",
      },
      options: [
        {
          id: "Boleh, tidak ada aturan khusus",
          en: "Yes, there's no special rule",
          correct: false,
        },
        {
          id: "Tidak boleh, perlu izin tetua adat",
          en: "No, permission from village elders is required",
          correct: true,
        },
        {
          id: "Boleh asal malam hari",
          en: "Yes, as long as it’s at night",
          correct: false,
        },
      ],
    },
    {
      q: {
        id: "Bagaimana cara terbaik mendukung ekonomi warga saat berkunjung?",
        en: "What's the best way to support residents' economy when visiting?",
      },
      options: [
        {
          id: "Membeli produk UMKM lokal",
          en: "Buying local UMKM products",
          correct: true,
        },
        {
          id: "Membawa bekal dari luar dan tidak membeli apapun",
          en: "Bringing outside food and buying nothing",
          correct: false,
        },
        {
          id: "Menawar harga serendah mungkin",
          en: "Haggling the price as low as possible",
          correct: false,
        },
      ],
    },
    {
      q: {
        id: "Apa fungsi utama hutan larangan bagi kampung?",
        en: "What is the main function of the forbidden forest for the village?",
      },
      options: [
        {
          id: "Sekadar dekorasi pemandangan",
          en: "Just scenic decoration",
          correct: false,
        },
        {
          id: "Menjaga sumber air dan ekosistem",
          en: "Preserving water sources and ecosystem",
          correct: true,
        },
        {
          id: "Tempat berkemah wisatawan",
          en: "A campsite for tourists",
          correct: false,
        },
      ],
    },
  ];

  let quizIndex = 0;
  let quizScore = 0;
  const quizContainer = document.getElementById("quizContainer");
  const quizProgressFill = document.getElementById("quizProgressFill");

  function renderQuizQuestion() {
    if (!quizContainer) return;
    quizProgressFill.style.width = (quizIndex / quizData.length) * 100 + "%";

    if (quizIndex >= quizData.length) {
      renderQuizResult();
      return;
    }
    const item = quizData[quizIndex];
    quizContainer.innerHTML = `
      <div class="quiz-question">
        <h4>${quizIndex + 1}. ${item.q[currentLang]}</h4>
        ${item.options.map((opt, i) => `<button class="quiz-option" data-index="${i}">${opt[currentLang]}</button>`).join("")}
      </div>
    `;
    quizContainer.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => handleQuizAnswer(btn, item));
    });
  }

  function handleQuizAnswer(btn, item) {
    const idx = parseInt(btn.getAttribute("data-index"), 10);
    const correct = item.options[idx].correct;
    quizContainer.querySelectorAll(".quiz-option").forEach((b, i) => {
      b.style.pointerEvents = "none";
      if (item.options[i].correct) b.classList.add("correct");
      else if (i === idx) b.classList.add("wrong");
    });
    if (correct) quizScore++;
    setTimeout(() => {
      quizIndex++;
      renderQuizQuestion();
    }, 800);
  }

  function renderQuizResult() {
    quizProgressFill.style.width = "100%";
    const percent = Math.round((quizScore / quizData.length) * 100);
    let badge = { id: "Eco Explorer", en: "Eco Explorer" };
    if (percent >= 90) badge = { id: "Eco Champion", en: "Eco Champion" };
    else if (percent >= 60) badge = { id: "Eco Guardian", en: "Eco Guardian" };

    const tips = {
      id: "Ingat: setiap tindakan kecil — dari membawa botol sendiri hingga membeli produk lokal — membantu menjaga Kampung Naga untuk generasi berikutnya.",
      en: "Remember: every small action — from bringing your own bottle to buying local products — helps preserve Kampung Naga for the next generation.",
    };

    quizContainer.innerHTML = `
      <div class="quiz-result">
        <div class="score">${percent}</div>
        <p style="color:var(--text-soft);margin-bottom:0.6rem;">Eco Score</p>
        <h4 style="margin-bottom:0.8rem;color:var(--accent-dark);">🏅 ${badge[currentLang]}</h4>
        <p style="font-size:0.9rem;color:var(--text-soft);margin-bottom:1.2rem;">${tips[currentLang]}</p>
        <button class="btn btn-dark" id="quizRetry">${currentLang === "id" ? "Ulangi Quiz" : "Retry Quiz"}</button>
      </div>
    `;
    document.getElementById("quizRetry").addEventListener("click", () => {
      quizIndex = 0;
      quizScore = 0;
      renderQuizQuestion();
    });
  }
  renderQuizQuestion();

  const panoramaElement = document.getElementById("panorama-tour");

  if (panoramaElement) {
    pannellum.viewer("panorama-tour", {
      type: "equirectangular",
      autoLoad: true,
      autoRotate: -1.5,
      compass: true,
      title: "Kampung Naga 360°",
      author: "Eco Journey",
    });
  }

  const calendarGrid = document.getElementById("calendarGrid");
  const eventsThisMonth = {
    5: "festival",
    12: "workshop",
    18: "gotong",
    22: "edukasi",
    27: "workshop",
  };
  function renderCalendar() {
    const daysInMonth = 31; // Juli
    const firstDayOffset = 3; // contoh: bulan dimulai hari Rabu
    let html = "";
    for (let i = 0; i < firstDayOffset; i++)
      html += `<div class="cal-cell empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const type = eventsThisMonth[d];
      html += `<div class="cal-cell ${type ? "has-event" : ""}">
        <div class="date-num">${d}</div>
        ${type ? `<div class="dots"><span class="dot ${type}"></span></div>` : ""}
      </div>`;
    }
    calendarGrid.innerHTML = html;
  }
  renderCalendar();

  const personCountEl = document.getElementById("personCount");
  let personCount = 2;
  document.getElementById("increasePerson").addEventListener("click", () => {
    personCount++;
    personCountEl.textContent = personCount;
    updateSummary();
  });
  document.getElementById("decreasePerson").addEventListener("click", () => {
    if (personCount > 1) personCount--;
    personCountEl.textContent = personCount;
    updateSummary();
  });

  const activityChips = document.querySelectorAll("#activityChips .chip");
  activityChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      updateSummary();
    });
  });

  const originCitySelect = document.getElementById("originCity");
  originCitySelect.addEventListener("change", updateSummary);

  function formatRupiah(num) {
    return "Rp " + num.toLocaleString("id-ID");
  }

  function updateSummary() {
    const guideFee = 100000;
    let activityTotal = 0;
    document.querySelectorAll("#activityChips .chip.active").forEach((chip) => {
      activityTotal += parseInt(chip.getAttribute("data-price"), 10);
    });
    const total = guideFee + activityTotal * personCount;

    document.getElementById("summaryActivity").textContent = formatRupiah(
      activityTotal * personCount,
    );
    document.getElementById("summaryPeople").textContent = personCount;
    document.getElementById("summaryTotal").textContent = formatRupiah(total);

    // Estimasi jejak karbon: ~0.12 kg CO2 per km per orang (mobil pribadi, dibagi jumlah penumpang asumsi rata2)
    const distanceKm = parseInt(originCitySelect.value, 10);
    const carbonPerPerson = (distanceKm * 2 * 0.12).toFixed(1); // pulang-pergi
    const carbonTotal = (carbonPerPerson * personCount).toFixed(1);
    document.getElementById("carbonEstimate").textContent =
      `${carbonTotal} kg CO₂`;
  }
  updateSummary();

  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
