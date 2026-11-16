<?php
/**
 * Title: Seizoensbalk
 * Slug: beer/seizoensbalk
 * Categories: beer
 * Inserter: no
 */
?>
<?php
// Pas de teksten en data (maand-dag) hier aan. De eerste die past, wordt getoond.
$beer_seizoenen = array(
	array( '11-01', '12-02', 'Bestel vóór 2 december en je beer is op tijd bij de Sint', 'shop', 'Naar de shop' ),
	array( '12-03', '12-19', 'Bestel vóór 19 december en je beer ligt op tijd onder de kerstboom', 'shop', 'Naar de shop' ),
	array( '12-20', '12-31', 'Te laat voor een pakje? Een cadeaubon kan je meteen geven', 'cadeaubon', 'Cadeaubon' ),
);
$beer_s = array( '', '', 'Gratis verzending in België vanaf € 40', 'shop', 'Naar de shop' );
foreach ( $beer_seizoenen as $beer_rij ) {
	if ( wp_date( 'm-d' ) >= $beer_rij[0] && wp_date( 'm-d' ) <= $beer_rij[1] ) { $beer_s = $beer_rij; break; }
}
?>
<!-- wp:group {"className":"beer-seizoensbalk","align":"full","style":{"spacing":{"padding":{"top":"8px","bottom":"8px"}}},"backgroundColor":"bruin","layout":{"type":"constrained"}} -->
<div class="wp-block-group beer-seizoensbalk alignfull has-bruin-background-color has-background" style="padding-top:8px;padding-bottom:8px"><!-- wp:paragraph {"align":"center","fontSize":"small"} -->
<p class="has-text-align-center has-small-font-size"><?php echo esc_html( $beer_s[2] ); ?> <a href="<?php echo beer_link( $beer_s[3] ); ?>"><?php echo esc_html( $beer_s[4] ); ?> →</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->
