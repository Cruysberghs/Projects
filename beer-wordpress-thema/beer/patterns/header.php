<?php
/**
 * Title: Header
 * Slug: beer/header
 * Categories: beer
 * Inserter: no
 */
?>
<!-- wp:group {"className":"beer-header","align":"full","style":{"spacing":{"padding":{"top":"12px","bottom":"12px"}},"border":{"bottom":{"color":"var:preset|color|perzik","width":"1px"}}},"backgroundColor":"creme","layout":{"type":"constrained"}} -->
<div class="wp-block-group beer-header alignfull has-creme-background-color has-background" style="border-bottom-color:var(--wp--preset--color--perzik);border-bottom-width:1px;padding-top:12px;padding-bottom:12px"><!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
<div class="wp-block-group alignwide"><!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:image {"width":"42px","sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized"><a href="<?php echo beer_link( '' ); ?>"><img src="<?php echo beer_img( 'logo-beer.svg' ); ?>" alt="BEER." style="width:42px"/></a></figure>
<!-- /wp:image --><!-- wp:site-title {"level":0} /--></div>
<!-- /wp:group --><!-- wp:navigation {"overlayBackgroundColor":"creme","overlayTextColor":"tekst","layout":{"type":"flex","justifyContent":"right"}} -->
<?php echo beer_menu_links(); // phpcs:ignore ?>
<!-- /wp:navigation --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
