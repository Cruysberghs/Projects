<?php
/**
 * BEER. thema – functies.
 *
 * @package beer
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Stijlen laden (op de site én in de editor).
 */
function beer_setup() {
	add_theme_support( 'wp-block-styles' );
	add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'beer_setup' );

function beer_styles() {
	wp_enqueue_style( 'beer-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'beer_styles' );

/**
 * Extra blokstijlen die je in de editor kan kiezen (rechts, onder "Stijlen").
 */
function beer_block_styles() {
	register_block_style( 'core/group', array( 'name' => 'kaart', 'label' => 'Kaart' ) );
	register_block_style( 'core/group', array( 'name' => 'prijs-badge', 'label' => 'Prijsbadge' ) );
	register_block_style( 'core/list', array( 'name' => 'hartjes', 'label' => 'Hartjes' ) );
	register_block_style( 'core/image', array( 'name' => 'wiebel', 'label' => 'Wiebelen' ) );

	register_block_pattern_category( 'beer', array( 'label' => 'BEER.' ) );
}
add_action( 'init', 'beer_block_styles' );

/**
 * Hulpje voor patronen: link naar een pagina en afbeelding uit het thema.
 */
function beer_link( $slug = '' ) {
	return esc_url( home_url( $slug ? "/$slug/" : '/' ) );
}
function beer_img( $file ) {
	return esc_url( get_theme_file_uri( "assets/img/$file" ) );
}

/**
 * De pagina's die het thema bij activatie aanmaakt.
 * slug => array( titel, patronen die de inhoud vormen )
 */
function beer_paginas() {
	return array(
		'home'           => array( 'Home', array( 'hero', 'kenmerken', 'knuffels', 'samenstellen-cta', 'samen-beleven', 'beloftes' ) ),
		'shop'           => array( 'Shop', array( 'knuffels', 'beloftes' ) ),
		'samenstellen'   => array( 'Stel jouw BEER. samen', array( 'stappen', 'beloftes' ) ),
		'workshops'      => array( 'Workshops', array( 'workshops', 'beloftes' ) ),
		'kinderfeestjes' => array( 'Kinderfeestjes', array( 'kinderfeestjes', 'beloftes' ) ),
		'kampjes'        => array( 'Kampjes', array( 'kampjes', 'beloftes' ) ),
		'ons-verhaal'    => array( 'Ons verhaal', array( 'ons-verhaal', 'beloftes' ) ),
		'faq'            => array( 'FAQ', array( 'faq' ) ),
		'contact'        => array( 'Contact', array( 'contact' ) ),
	);
}

/**
 * Inhoud van een patroonbestand ophalen als blokken.
 */
function beer_patroon( $naam ) {
	$bestand = get_theme_file_path( "patterns/$naam.php" );
	if ( ! file_exists( $bestand ) ) {
		return '';
	}
	ob_start();
	include $bestand;
	return trim( ob_get_clean() );
}

/**
 * Bij het activeren van het thema: ontbrekende pagina's aanmaken en
 * "Home" als startpagina instellen. Bestaande pagina's worden nooit overschreven.
 */
function beer_maak_paginas() {
	$volgorde = 0;
	foreach ( beer_paginas() as $slug => list( $titel, $patronen ) ) {
		$volgorde++;
		$bestaand = get_page_by_path( $slug );
		if ( $bestaand ) {
			$id = $bestaand->ID;
		} else {
			$id = wp_insert_post(
				array(
					'post_type'    => 'page',
					'post_status'  => 'publish',
					'post_title'   => $titel,
					'post_name'    => $slug,
					'menu_order'   => $volgorde,
					'post_content' => implode( "\n\n", array_map( 'beer_patroon', $patronen ) ),
					'page_template' => 'page-zonder-titel',
				)
			);
		}
		if ( 'home' === $slug && $id && ! is_wp_error( $id ) && ! get_option( 'page_on_front' ) ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $id );
		}
	}

	// Sitenaam en slogan invullen als ze nog op de standaardwaarde staan.
	$standaard_namen = array( '', 'WordPress', 'My WordPress Website', 'Mijn WordPress website', 'Mijn WordPress-website', 'Mijn site', 'My Site' );
	if ( in_array( get_option( 'blogname' ), $standaard_namen, true ) ) {
		update_option( 'blogname', 'BEER.' );
		update_option( 'blogdescription', 'Jouw knuffel, jouw verhaal.' );
	}

	// De standaard "Voorbeeldpagina" van WordPress weghalen (enkel als ze nooit bewerkt werd),
	// anders verschijnt ze in het menu.
	foreach ( array( 'sample-page', 'voorbeeld-pagina', 'voorbeeldpagina' ) as $voorbeeld_slug ) {
		$voorbeeld = get_page_by_path( $voorbeeld_slug );
		if ( $voorbeeld && $voorbeeld->post_modified === $voorbeeld->post_date ) {
			wp_trash_post( $voorbeeld->ID );
		}
	}

	// Mooie links (/workshops/ i.p.v. ?page_id=12) zodat de knoppen werken.
	if ( ! get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
		flush_rewrite_rules();
	}
}
add_action( 'after_switch_theme', 'beer_maak_paginas' );
