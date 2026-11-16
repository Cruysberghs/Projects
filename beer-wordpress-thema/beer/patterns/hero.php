<?php
/**
 * Title: Welkom (hero)
 * Slug: beer/hero
 * Categories: beer
 * Description: Grote welkomstbanner met beer en knop.
 */
?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"gradient":"zacht","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-zacht-gradient-background has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide"><!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"className":"beer-bovenkop"} -->
<p class="beer-bovenkop">Een knuffel met een verhaal</p>
<!-- /wp:paragraph --><!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Welkom bij<br><span style="font-size:1.55em;font-weight:600">BEER.</span></h1>
<!-- /wp:heading --><!-- wp:paragraph {"fontSize":"large"} -->
<p class="has-large-font-size">Niet zomaar een knuffel. Een vriendje dat je zelf kiest, vult en helemaal van jou maakt.</p>
<!-- /wp:paragraph --><!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"beer-koop"} -->
<div class="wp-block-button beer-koop"><a class="wp-block-button__link wp-element-button" href="<?php echo beer_link( 'samenstellen' ); ?>">Stel jouw BEER. samen →</a></div>
<!-- /wp:button --><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="<?php echo beer_link( 'shop' ); ?>">Bekijk de knuffels</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --><!-- wp:paragraph {"className":"beer-hero-klein","fontSize":"small"} -->
<p class="beer-hero-klein has-small-font-size">Vanaf € 22,95 · Gratis verzending vanaf € 40</p>
<!-- /wp:paragraph --><!-- wp:paragraph {"className":"beer-hero-snel"} -->
<p class="beer-hero-snel">Liever samen knutselen? <a href="<?php echo beer_link( 'workshops' ); ?>">Workshops</a> <a href="<?php echo beer_link( 'kinderfeestjes' ); ?>">Kinderfeestjes</a> <a href="<?php echo beer_link( 'kampjes' ); ?>">Kampjes</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:group {"className":"beer-hero-beeld","layout":{"type":"constrained"}} -->
<div class="wp-block-group beer-hero-beeld"><!-- wp:image {"width":"460px","sizeSlug":"full","linkDestination":"none","align":"center","className":"is-style-wiebel"} -->
<figure class="wp-block-image aligncenter size-full is-resized is-style-wiebel"><img src="<?php echo beer_img( 'ill/groot-hero.webp' ); ?>" alt="Een grote beer knuffelt een kleine beer" style="width:460px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
