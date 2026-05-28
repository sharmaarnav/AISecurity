<?php
/**
 * Main Index Template
 * Falls back to front-page content; renders standard WordPress loop if needed.
 */
get_header(); ?>

<main class="site-main" style="display:block;max-width:var(--content-max);margin:40px auto;padding:0 20px;">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article <?php post_class(); ?> style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:var(--radius-lg);padding:32px;margin-bottom:24px;">
            <h2 style="font-size:1.4rem;font-weight:700;margin-bottom:12px;">
                <a href="<?php the_permalink(); ?>" style="color:var(--text-primary);text-decoration:none;"><?php the_title(); ?></a>
            </h2>
            <div style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7;">
                <?php the_excerpt(); ?>
            </div>
        </article>
    <?php endwhile; else : ?>
        <div style="text-align:center;padding:80px 20px;color:var(--text-secondary);">
            <div style="font-size:3rem;margin-bottom:16px;">🛡️</div>
            <h2 style="font-size:1.5rem;margin-bottom:8px;color:var(--text-primary);">No content found</h2>
            <p>Visit the <a href="<?php echo esc_url( home_url( '/' ) ); ?>">homepage</a> to explore AI Security Layers.</p>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
