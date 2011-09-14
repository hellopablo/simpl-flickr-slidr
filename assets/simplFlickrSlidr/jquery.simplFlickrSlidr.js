/*global window,document,jQuery */

/*!
* simplFlickrSlidr : client friendly NivoSlider without a CMS
* @author: Pablo de la Peña (hellopablo)
* @url: http://jquery.hellopablo.co.uk/simplFlickrSlidr/assets/jquery.simplFlickrSlidr.js
* @documentation: http://jquery.hellopablo.co.uk/simplFlickrSlidr/
* @published: 14/09/2011
* @updated: 14/09/2011
* @license Creative Commons Attribution Non-Commercial Share Alike 3.0 Licence
*		   http://creativecommons.org/licenses/by-nc-sa/3.0/
*/
if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			simplFlickrSlidr: function( options, nivo_options ) {
				var settings = $.extend({}, $.fn.simplFlickrSlidr.defaults, options);
				var nivo_settings = $.extend({}, $.fn.simplFlickrSlidr.nivo_defaults, nivo_options);
				
				return this.each(function ()
				{
					var $$	= $(this),
						o	= $.metadata ? $.extend({}, settings, $$.metadata()) : settings;
					
					console.log( 'simplFlickrSlidr: Starting...' );
					console.log( 'simplFlickrSlidr: Setting api_key: ' + settings.api_key );
					if ( ! settings.api_key )
					{
						console.warn( 'Error: you must define your Flicker api_key.' );
						return;
					}
					
					console.log( 'simplFlickrSlidr: Setting object_id: ' + settings.object_id );
					if ( ! settings.object_id )
					{
						console.warn( 'Error: you must define an object_id.' );
						return;
					}
					
					switch ( settings.method )
					{
						//	Using Photosets
						case 'flickr.photosets.getPhotos' : 
						
							console.log( 'simplFlickrSlidr: Using photoset' );
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
						
							console.log( 'simplFlickrSlidr: Using gallery' );
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
			src:		'http://api.flickr.com/services/rest/',
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