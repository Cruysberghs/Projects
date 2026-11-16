<?php
/**
 * Title: Het complete knuffelpakket
 * Slug: beer/pakket
 * Categories: beer
 * Description: Pakketaanbieding: beer + geurtje + kloppend hartje + paspoort.
 */
?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide"><!-- wp:group {"className":"beer-pakket","layout":{"type":"constrained"}} -->
<div class="wp-block-group beer-pakket"><!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:group {"className":"beer-pakket-beeld","layout":{"type":"constrained"}} -->
<div class="wp-block-group beer-pakket-beeld"><!-- wp:image {"width":"200px","sizeSlug":"full","linkDestination":"none","align":"center"} -->
<figure class="wp-block-image aligncenter size-full is-resized"><img src="<?php echo beer_img( 'ill/beer-hart.webp' ); ?>" alt="" style="width:200px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:group --></div>
<!-- /wp:column --><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"className":"beer-pakket-label"} -->
<p class="beer-pakket-label">Meest gekozen</p>
<!-- /wp:paragraph --><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Het complete knuffelpakket</h3>
<!-- /wp:heading --><!-- wp:list {"className":"is-style-hartjes"} -->
<ul class="wp-block-list is-style-hartjes"><!-- wp:list-item -->
<li>Beer naar keuze</li>
<!-- /wp:list-item --><!-- wp:list-item -->
<li>Geurtje naar keuze</li>
<!-- /wp:list-item --><!-- wp:list-item -->
<li>Kloppend hartje</li>
<!-- /wp:list-item --><!-- wp:list-item -->
<li>Eigen berenpaspoort</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --><!-- wp:paragraph {"className":"beer-pakket-prijs"} -->
<p class="beer-pakket-prijs">Vanaf <strong>€ 27,95</strong> <s>€ 30,40</s></p>
<!-- /wp:paragraph --><!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"beer-koop"} -->
<div class="wp-block-button beer-koop"><a class="wp-block-button__link wp-element-button" href="<?php echo beer_link( 'samenstellen' ); ?>">Stel je pakket samen →</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
