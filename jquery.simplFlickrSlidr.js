/*global window,document,jQuery */

/*!
* simplFlickrSlidr : client friendly NivoSlider without a CMS
* @author: Pablo de la Peña (hellopablo)
* @url: http://hellopablo.github.io/simple-flickr-slidr
* @documentation: http://hellopablo.github.io/simple-flickr-slidr
* @published: 14/09/2011
* @updated: 30/05/2015
* @license MIT
*/
if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			simplFlickrSlidr: function( options, nivo_options ) {
				var settings = $.extend({}, $.fn.simplFlickrSlidr.defaults, options);
				var nivo_settings = $.extend({}, $.fn.simplFlickrSlidr.nivo_defaults, nivo_options);

				var log = function(message) {
					if (typeof window.console === 'object') {
						console.log(message);
					}
				}

				return this.each(function ()
				{
					var $$	= $(this),
						o	= $.metadata ? $.extend({}, settings, $$.metadata()) : settings;

					log( 'simplFlickrSlidr: Starting...' );
					log( 'simplFlickrSlidr: Setting api_key: ' + settings.api_key );
					if ( ! settings.api_key )
					{
						console.warn( 'Error: you must define your Flicker api_key.' );
						return;
					}

					log( 'simplFlickrSlidr: Setting object_id: ' + settings.object_id );
					if ( ! settings.object_id )
					{
						console.warn( 'Error: you must define an object_id.' );
						return;
					}

					switch ( settings.method )
					{
						//	Using Photosets
						case 'flickr.photosets.getPhotos' :

							log( 'simplFlickrSlidr: Using photoset' );
							$.getJSON(

								settings.src + '?jsoncallback=?',
								{
									'method'		: settings.method,
									'api_key'		: settings.api_key,
									'photoset_id'	: settings.object_id,
									'media'			: 'photos',
									'format'		: 'json',
									'extras'		: 'url_o'

								},
								function ( data )
								{
									if ( data.stat != 'ok' )
									{
										console.warn( 'simplFlickrSlidr: ' + data.message );
										return;
									}

									//	Build HTML
									var html = '<div>';

									for ( i = 0; i< data.photoset.photo.length; i++ )
									{
										html += '<img src="' + data.photoset.photo[i].url_o + '" />'
									}

									html += '</div>';
									$$.html( html );

									//	Start Slider
									$$.find('div').nivoSlider( nivo_settings );
								}
							);

						break;

						//	Using Galleries
						case 'flickr.galleries.getPhotos' :

							log( 'simplFlickrSlidr: Using gallery' );
							$.getJSON(

								settings.src + '?jsoncallback=?',
								{
									'method'		: settings.method,
									'api_key'		: settings.api_key,
									'gallery_id'	: settings.object_id,
									'media'			: 'photos',
									'format'		: 'json',
									'extras'		: 'url_o'

								},
								function ( data )
								{
									if ( data.stat != 'ok' )
									{
										console.warn( 'simplFlickrSlidr: ' + data.message );
										return;
									}

									//	Build HTML
									var html = '<div>';

									for ( i = 0; i< data.gallery.photo.length; i++ )
									{
										html += '<img src="' + data.gallery.photo[i].url_o + '" />'
									}

									html += '</div>';
									$$.html( html );

									//	Start Slider
									$$.find('div').nivoSlider( nivo_settings );
								}
							);

						break;

						default:

							console.warn( 'simplFlickrSlidr: method "' + settings.method + '" not currently supported' );
							return;

						break;
					}
				});
			}
		});

		/**
		* simplFlickrSlidr defaults
		*/
		$.fn.simplFlickrSlidr.defaults = {
			src:		'https://api.flickr.com/services/rest/',
			method:		'flickr.photosets.getPhotos',
			object_id:	false,
			api_key:	false,
		};

		/**
		* nivoSlider defaults
		*/
		$.fn.simplFlickrSlidr.nivo_defaults = {
		};

	}(jQuery));
}