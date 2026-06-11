<?php
define( 'WP_CACHE', true );

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u139416831_LcWk6' );

/** Database username */
define( 'DB_USER', 'u139416831_4dH8Q' );

/** Database password */
define( 'DB_PASSWORD', 'WyvCawpi1e' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'x 4Z+<L@=!$=RUPJnHDwT8?iUB%!Uj<PH4H=l&io]2md07IrQ%j+6jwfBOI<`E1?' );
define( 'SECURE_AUTH_KEY',   'Oj974x`pgSzBpH$g{z)R~^X<Y6Y2YfvP%jg+g^EG{Zp[$BZ=3}o=TP!;N@eMmD,z' );
define( 'LOGGED_IN_KEY',     'nkR;.%/Zx3)$._ub|&GNOl!xJ^H#*sa8S7n<@5Tgp6))8N8oGN%Q/57?{ToYairl' );
define( 'NONCE_KEY',         'y8$35/eMZ%f2_hobq$S-kN%HtSEIV>cX*2yxwr;~#hra:>k*uD2(pg|}x2VapR50' );
define( 'AUTH_SALT',         '!30=6we!FJ#9I>3$2.Ts@nM,B05=WPaK=Y&,o H[T:Y 3*7#O7u-pvT3QO*pR,|V' );
define( 'SECURE_AUTH_SALT',  '&pRR~/s~-@_<GoD#.@Z5.t#9NLJZa}n}LK}[Aa-jU7S$:4SZ/t0xi+1xaiv&*iJM' );
define( 'LOGGED_IN_SALT',    'yodM`:[q~[W<mfAEmYY+0FfgbnE*Q3vCLBB36(QGda2}2ie`.BA,i1V.ol^o,T=m' );
define( 'NONCE_SALT',        '+2!P3B=V?[UW4.cs7KA<&R[QomEM`-J*A]@a)cP5>=X,9|JKEBenyQ0:l5PWyWuX' );
define( 'WP_CACHE_KEY_SALT', '9f4.yYi,*cGA-(d`FM*{QN~4p4Cdjev:kya(5tu9OX[(sG#qd/}j>EeQA,-?;qm^' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', 'e714c73073e4c9725f05df6158bac689' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
