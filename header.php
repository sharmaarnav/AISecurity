<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Comprehensive guide to securing every layer of AI systems — from hardware to governance. Covering security risks, mitigations, and real-world examples.">
<meta property="og:title" content="AI Security Layers — AISecurity.arnav.au">
<meta property="og:description" content="A complete layer-by-layer guide to AI security: hardware, firmware, OS, network, data, training, inference, applications, identity, and governance.">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Scroll Progress Bar -->
<div id="scroll-progress"></div>

<!-- Search Overlay -->
<div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-label="Search">
    <button class="search-close" id="searchClose" aria-label="Close search">✕</button>
    <div class="search-box">
        <input type="text" id="searchInput" placeholder="Search layers, risks, attacks, mitigations…" autocomplete="off">
    </div>
    <div class="search-results" id="searchResults"></div>
</div>

<!-- Mobile Menu Overlay -->
<div class="mobile-menu-overlay" id="mobileMenu">
    <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">✕</button>
    <p class="sidebar-title" style="padding-left:0;margin-top:8px;">Navigate to Layer</p>
    <ul class="mobile-layers-list">
        <li><a href="#layer-hardware" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#ef4444"></span> 01 — Hardware</a></li>
        <li><a href="#layer-firmware" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#f97316"></span> 02 — Firmware / BIOS</a></li>
        <li><a href="#layer-os" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#eab308"></span> 03 — Operating System</a></li>
        <li><a href="#layer-virtualization" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#22c55e"></span> 04 — Virtualization &amp; Containers</a></li>
        <li><a href="#layer-network" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#06b6d4"></span> 05 — Network &amp; Infrastructure</a></li>
        <li><a href="#layer-data" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#3b82f6"></span> 06 — Data Pipeline</a></li>
        <li><a href="#layer-training" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#6366f1"></span> 07 — Model Training</a></li>
        <li><a href="#layer-inference" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#a855f7"></span> 08 — Model Inference</a></li>
        <li><a href="#layer-application" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#ec4899"></span> 09 — Application &amp; API</a></li>
        <li><a href="#layer-identity" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#14b8a6"></span> 10 — Identity &amp; Access</a></li>
        <li><a href="#layer-governance" onclick="closeMobileMenu()"><span class="mobile-layer-dot" style="background:#f59e0b"></span> 11 — Governance &amp; Ethics</a></li>
    </ul>
</div>

<!-- Top Navigation -->
<header class="site-header" role="banner">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav-brand" aria-label="AI Security Layers — Home">
        <div class="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
        </div>
        <span class="brand-text">AI <span>Security</span> Layers</span>
    </a>

    <nav class="nav-layers" aria-label="Layer navigation">
        <a href="#layer-hardware"       class="nav-layer-chip" style="--chip-color:#ef4444" data-layer="hardware"><span class="chip-dot" style="background:#ef4444"></span>Hardware</a>
        <a href="#layer-firmware"       class="nav-layer-chip" style="--chip-color:#f97316" data-layer="firmware"><span class="chip-dot" style="background:#f97316"></span>Firmware</a>
        <a href="#layer-os"             class="nav-layer-chip" style="--chip-color:#eab308" data-layer="os"><span class="chip-dot" style="background:#eab308"></span>OS</a>
        <a href="#layer-virtualization" class="nav-layer-chip" style="--chip-color:#22c55e" data-layer="virtualization"><span class="chip-dot" style="background:#22c55e"></span>Virtualization</a>
        <a href="#layer-network"        class="nav-layer-chip" style="--chip-color:#06b6d4" data-layer="network"><span class="chip-dot" style="background:#06b6d4"></span>Network</a>
        <a href="#layer-data"           class="nav-layer-chip" style="--chip-color:#3b82f6" data-layer="data"><span class="chip-dot" style="background:#3b82f6"></span>Data</a>
        <a href="#layer-training"       class="nav-layer-chip" style="--chip-color:#6366f1" data-layer="training"><span class="chip-dot" style="background:#6366f1"></span>Training</a>
        <a href="#layer-inference"      class="nav-layer-chip" style="--chip-color:#a855f7" data-layer="inference"><span class="chip-dot" style="background:#a855f7"></span>Inference</a>
        <a href="#layer-application"    class="nav-layer-chip" style="--chip-color:#ec4899" data-layer="application"><span class="chip-dot" style="background:#ec4899"></span>Application</a>
        <a href="#layer-identity"       class="nav-layer-chip" style="--chip-color:#14b8a6" data-layer="identity"><span class="chip-dot" style="background:#14b8a6"></span>Identity</a>
        <a href="#layer-governance"     class="nav-layer-chip" style="--chip-color:#f59e0b" data-layer="governance"><span class="chip-dot" style="background:#f59e0b"></span>Governance</a>
    </nav>

    <div class="nav-actions">
        <button class="btn-icon" id="searchToggle" aria-label="Search" title="Search (/)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
        </button>
        <button class="btn-icon hamburger" id="hamburgerBtn" aria-label="Open navigation menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
        </button>
    </div>
</header>
