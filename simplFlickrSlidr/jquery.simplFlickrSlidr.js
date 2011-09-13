/*global window,document,jQuery */

/*!
* simplFlickrSlidr: a jQuery Plugin
* @author: Trevor Morris (trovster)
* @url: http://www.trovster.com/lab/code/plugins/jquery.simplFlickrSlidr.js
* @documentation: http://www.trovster.com/lab/plugins/simplFlickrSlidr/
* @published: 11/09/2008
* @updated: 26/02/2011
* @license Creative Commons Attribution Non-Commercial Share Alike 3.0 Licence
*		   http://creativecommons.org/licenses/by-nc-sa/3.0/
*/
if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			simplFlickrSlidr: function( options, nivo_options ) {
				var settings = $.extend({}, $.fn.simplFlickrSlidr.defaults, options);
				var nivo_settings = $.extend({}, $.fn.simplFlickrSlidr.nivo_defaults, nivo_options);
			
				return this.each(function () {
					var $$	= $(this),
						o	= $.metadata ? $.extend({}, settings, $$.metadata()) : settings;

					console.log( 'Starting simplFlickrSlidr...' );
					
					console.log( 'key: ' + settings.key );
					if ( ! settings.key ) {
					
						alert( 'You must define the Flickr API key.' );
						return;
					
					}
					
					console.log( 'setID: ' + settings.setID );
					if ( ! settings.setID ) {
					
						alert( 'You must define the Flickr Set ID.' );
						return;
					
					}
					
					console.log( 'Width: ' + settings.width );
					if ( ! settings.width ) {
					
						alert( 'You must define a width.' );
						return;
					
					}
					
					console.log( 'Height: ' + settings.height );
					if ( ! settings.height ) {
					
						alert( 'You must define a height.' );
						return;
					
					}
					
					$.getJSON(
						
						settings.src + '?jsoncallback=?',
						{
							method:settings.method,
							api_key:settings.key,
							photoset_id:settings.setID,
							media:'photos',
							format:'json',
							extras:'url_m'
							
						},
						function ( data )
						{
							if ( data.stat != 'ok' ) {
							
								alert( data.message );
							
							}
							
							
							//	Build HTML
							var html = '<div style="width:' + settings.width + 'px;height:' + settings.width + 'px;">';
							
							for ( i = 0; i< data.photoset.photo.length; i++ )
							{
								html += '<img src="' + data.photoset.photo[i].url_m + '" />'
							}
							
							html += '</div>';
							$$.html( html );
							
							//	Start Slider
							$$.find('div').nivoSlider( nivo_settings );
						}
					);
				});
			}
		});
		
		/**
		* Set your Plugin Defaults Here!
		*/
		$.fn.simplFlickrSlidr.defaults = {
			//library:	'nivo',
			src:		'http://api.flickr.com/services/rest/',
			method:		'flickr.photosets.getPhotos',
			setID:		false,
			key:		false,
			width:		false,
			height:		false
		};
		$.fn.simplFlickrSlidr.nivo_defaults = {
		};
		
	}(jQuery));
}