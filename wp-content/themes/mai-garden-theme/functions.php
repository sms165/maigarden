<?php
function maigarden_enqueue_assets() {
    // 1. Enqueue Main CSS Theme File
    wp_enqueue_style('maigarden-main-styles', get_stylesheet_uri(), array(), '1.2.0');
    
    // 2. Enqueue Custom Modular Javascript Asset in Footer (Audio/Scroll)
    wp_enqueue_script(
        'maigarden-interactions', 
        get_template_directory_uri() . '/js/scroll-audio-control.js', 
        array(), 
        '1.2.0', 
        true // True tells WordPress to drop the file right before the </body> tag for optimization
    );

    // 3. Enqueue the Parallax Effect Animation Script
    wp_enqueue_script(
        'maigarden-parallax', 
        get_template_directory_uri() . '/js/parallax.js', 
        array(), 
        '1.2.0', 
        true // Also loads in the footer so your layout is already on screen when it runs
    );

    // 4. Enqueue the Expandable Card Menu Popover Overlay Script
    wp_enqueue_script(
        'maigarden-menu-toggle', 
        get_template_directory_uri() . '/js/menu-toggle.js', 
        array(), 
        '1.2.0', 
        true // Loads in footer alongside your interactivity stack
    );

    // 5. Enqueue the Expandable Drinks Menu Script
    wp_enqueue_script(
        'maigarden-drink-toggle', 
        get_template_directory_uri() . '/js/drink-toggle.js', 
        array(), 
        '1.2.0', 
        true // Ensures drink selection clicks are intercepted seamlessly on desktop/mobile
    );

    // 6. Enqueue the Interactive Drag & Click Reviews Carousel Engine
    wp_enqueue_script(
        'maigarden-reviews-carousel', 
        get_template_directory_uri() . '/js/carousel.js', 
        array(), 
        '1.2.0', 
        true // Loads in footer to seamlessly hook onto #reviewsTrack DOM nodes after parsing
    );

    // 7. Enqueue the Dynamic Scroll-Activated Sticky Navigation Bar
    wp_enqueue_script(
        'maigarden-navbar', 
        get_template_directory_uri() . '/js/navbar.js', 
        array(), 
        '1.2.0', 
        true // Appends inside the footer stack so the document renders without delay
    );
}
add_action('wp_enqueue_scripts', 'maigarden_enqueue_assets');