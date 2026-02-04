// SafeZone Universal Script

document.addEventListener('DOMContentLoaded', () => {
    // --- UI ELEMENTS ---
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    const navSearch = document.getElementById('navSearch');

    // --- MOBILE MENU TOGGLE ---
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('mobile-open');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== menuToggle) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }

    // --- NOTIFICATION TOGGLE ---
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (notifDropdown.classList.contains('active') && !notifDropdown.contains(e.target) && e.target !== notifBtn) {
                notifDropdown.classList.remove('active');
            }
        });
    }

    // --- SEARCH FILTERING (Demo) ---
    if (navSearch) {
        navSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('article, .card');

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- SOS BUTTON LOGIC ---
    const sosButtons = document.querySelectorAll('.sos');
    sosButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const confirmSOS = confirm('🚨 TRIGGER EMERGENCY SOS?\n\nThis will alert emergency services and share your live location with trusted contacts.');
            if (confirmSOS) {
                btn.style.animation = 'none';
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                setTimeout(() => {
                    alert('✅ SOS ALERT SENT!\n\nHelp is on the way. Stay in a well-lit area.');
                    btn.innerHTML = 'SOS';
                    btn.style.animation = 'pulse 2s infinite';
                }, 1500);
            }
        });
    });

    // --- MAP INITIALIZATION ---
    const mapElement = document.getElementById('map');
    if (mapElement && typeof L !== 'undefined') {
        window.myMap = L.map('map').setView([28.6139, 77.2090], 13);
        const map = window.myMap;

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors © CARTO'
        }).addTo(map);

        // Simulated data points
        const points = [
            { pos: [28.6129, 77.2295], color: '#ef4444', label: "<b>High Risk Area:</b> Frequent reports of pickpocketing." },
            { pos: [28.6200, 77.2100], color: '#f59e0b', label: "<b>Moderate Risk:</b> Low lighting reported in this block." },
            { pos: [28.6050, 77.1950], color: '#22c55e', label: "<b>Verified Safe Zone:</b> High police presence and well-lit." }
        ];

        points.forEach(pt => {
            L.circle(pt.pos, {
                color: pt.color,
                fillColor: pt.color,
                fillOpacity: 0.4,
                radius: 350
            }).addTo(map).bindPopup(pt.label);
        });

        // Locate Me Feature
        const locateBtn = document.getElementById('locateBtn');
        if (locateBtn) {
            locateBtn.addEventListener('click', () => {
                const originalContent = locateBtn.innerHTML;
                locateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';

                // Simulate geolocation
                setTimeout(() => {
                    const myPos = [28.6139, 77.2090]; // CP, Delhi
                    map.flyTo(myPos, 15, { animate: true, duration: 2 });

                    const userMarker = L.marker(myPos).addTo(map)
                        .bindPopup('<b>You are here</b><br>Currently in a Medium Risk zone.').openPopup();

                    locateBtn.innerHTML = '<i class="fas fa-check"></i> Found You';
                    setTimeout(() => {
                        locateBtn.innerHTML = originalContent;
                    }, 3000);
                }, 1500);
            });
        }
    }

    // --- REPORT FORM ---
    const reportForm = document.querySelector('.report-form');
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reportForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            btn.disabled = true;

            setTimeout(() => {
                alert('✅ Report submitted successfully!\n\nThank you for helping keep the community safe.');
                btn.innerHTML = originalText;
                btn.disabled = false;
                reportForm.reset();
            }, 1000);
        });
    }
    // --- REVEAL ON SCROLL ---
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Leaflet Fix: Invalidate size when map container becomes visible
                if (window.myMap && (entry.target.querySelector('#map') || entry.target.id === 'map')) {
                    setTimeout(() => {
                        window.myMap.invalidateSize();
                    }, 500);
                }
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
        revealObserver.observe(el);
    });

    // --- DYNAMIC LIVE SIMULATION ---
    function updateLiveStats() {
        const liveBadges = document.querySelectorAll('.status.live');
        liveBadges.forEach(badge => {
            // Find or create a counter span
            let counter = badge.querySelector('.count-badge');
            if (!counter) {
                counter = document.createElement('span');
                counter.className = 'count-badge';
                badge.appendChild(counter);
            }

            // Randomly update numbers
            const baseCount = badge.innerText.includes('Police') ? 12 : 85;
            const variance = Math.floor(Math.random() * 10) - 5;
            counter.innerText = `${Math.max(1, baseCount + variance)} Nearby`;
        });

        // Update ticker timestamps randomly
        const tickerSpans = document.querySelectorAll('.ticker-content span');
        if (tickerSpans.length > 0) {
            const index = Math.floor(Math.random() * tickerSpans.length);
            const originalText = tickerSpans[index].innerText;
            if (!originalText.includes(' (Just now)')) {
                tickerSpans.forEach(s => s.innerText = s.innerText.replace(' (Just now)', ''));
                tickerSpans[index].innerText += ' (Just now)';
            }
        }
    }

    // Initial run and then every 5 seconds
    updateLiveStats();
    setInterval(updateLiveStats, 5000);

    // --- SEARCH HIGHLIGHTING (Enhanced) ---
    if (navSearch) {
        navSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('article, .card');

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (query.length > 0 && text.includes(query)) {
                    card.style.display = 'block';
                    card.style.borderColor = 'var(--accent-color)';
                    card.style.background = 'rgba(239, 68, 68, 0.05)';
                } else if (query.length === 0) {
                    card.style.display = 'block';
                    card.style.borderColor = 'var(--border-color)';
                    card.style.background = 'var(--card-bg)';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
