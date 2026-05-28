<?php
/**
 * AI Security Layers Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function ai_security_layers_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'html5', array(
        'search-form', 'comment-form', 'comment-list',
        'gallery', 'caption', 'style', 'script',
    ) );

    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'ai-security-layers' ),
    ) );
}
add_action( 'after_setup_theme', 'ai_security_layers_setup' );


function ai_security_layers_scripts() {
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'ai-security-layers-style',
        get_stylesheet_uri(),
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'ai-security-layers-js',
        get_theme_file_uri( '/assets/js/main.js' ),
        array(),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'ai_security_layers_scripts' );


function ai_security_layers_body_class( $classes ) {
    $classes[] = 'ai-security-theme';
    return $classes;
}
add_filter( 'body_class', 'ai_security_layers_body_class' );
