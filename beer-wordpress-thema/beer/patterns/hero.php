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
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Welkom bij<br><span style="font-size:1.5em;font-weight:600">BEER.</span></h1>
<!-- /wp:heading --><!-- wp:paragraph {"fontSize":"large"} -->
<p class="has-large-font-size">Jouw knuffel, jouw verhaal.</p>
<!-- /wp:paragraph --><!-- wp:paragraph -->
<p>Kies je beer, een geurtje en een kloppend hartje, en geef hem een eigen paspoort.</p>
<!-- /wp:paragraph --><!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo beer_link( 'samenstellen' ); ?>">Stel jouw beer samen →</a></div>
<!-- /wp:button --><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="<?php echo beer_link( 'shop' ); ?>">Bekijk de knuffels</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --><!-- wp:paragraph {"className":"beer-hero-klein","fontSize":"small"} -->
<p class="beer-hero-klein has-small-font-size">Vanaf € 22,95 · Klaar in 5 stappen · Gratis verzending vanaf € 40</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:group {"className":"beer-hero-beeld","layout":{"type":"constrained"}} -->
<div class="wp-block-group beer-hero-beeld"><!-- wp:image {"sizeSlug":"full","linkDestination":"none","className":"beer-krul"} -->
<figure class="wp-block-image size-full beer-krul"><img src="<?php echo beer_img( 'ill/doodle-golflijn.png' ); ?>" alt=""/></figure>
<!-- /wp:image --><!-- wp:paragraph {"className":"beer-hand beer-hart-hint"} -->
<p class="beer-hand beer-hart-hint">voel je<br>zijn hartje?<br><img src="<?php echo beer_img( 'ill/doodle-pijl.png' ); ?>" alt=""></p>
<!-- /wp:paragraph --><!-- wp:image {"width":"400px","sizeSlug":"full","linkDestination":"none","align":"center","className":"beer-klop"} -->
<figure class="wp-block-image aligncenter size-full is-resized beer-klop"><img src="<?php echo beer_img( 'ill/beer-hart.png' ); ?>" alt="Een zachte knuffelbeer met een groot hart" style="width:400px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
