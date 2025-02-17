( function ( $, undefined ) {
	var Notice = acf.Model.extend( {
		data: {
			text: '',
			type: '',
			timeout: 0,
			dismiss: true,
			target: false,
			location: 'before',
			close: function () {},
		},

		events: {
			'click .acf-notice-dismiss': 'onClickClose',
		},

		tmpl: function () {
			return '<div class="acf-notice"></div>';
		},

		setup: function ( props ) {
			$.extend( this.data, props );
			this.$el = $( this.tmpl() );
		},

		initialize: function () {
			// render
			this.render();

			// show
			this.show();
		},

		render: function () {
			// class
			this.type( this.get( 'type' ) );

			// text
			this.html( '<p>' + this.get( 'text' ) + '</p>' );

			// close
			if ( this.get( 'dismiss' ) ) {
				this.$el.append( '<a href="#" class="acf-notice-dismiss acf-icon -cancel small"></a>' );
				this.$el.addClass( '-dismiss' );
			}

			// timeout
			var timeout = this.get( 'timeout' );
			if ( timeout ) {
				this.away( timeout );
			}
		},

		update: function ( props ) {
			// update
			$.extend( this.data, props );

			// re-initialize
			this.initialize();

			// refresh events
			this.removeEvents();
			this.addEvents();
		},

		show: function () {
			var $target = this.get( 'target' );
			var location = this.get( 'location' );
			if ( $target ) {
				if ( location === 'after' ) {
					$target.append( this.$el );
				} else {
					$target.prepend( this.$el );
				}
			}
		},

		hide: function () {
			this.$el.remove();
		},

		away: function ( timeout ) {
			this.setTimeout( function () {
				acf.remove( this.$el );
			}, timeout );
		},

		type: function ( type ) {
			// remove prev type
			var prevType = this.get( 'type' );
			if ( prevType ) {
				this.$el.removeClass( '-' + prevType );
			}

			// add new type
			this.$el.addClass( '-' + type );

			// backwards compatibility
			if ( type == 'error' ) {
				this.$el.addClass( 'acf-error-message' );
			}
		},

		html: function ( html ) {
			this.$el.html( acf.escHtml( html ) );
		},

		text: function ( text ) {
			this.$( 'p' ).html( acf.escHtml( text ) );
		},

		onClickClose: function ( e, $el ) {
			e.preventDefault();
			this.get( 'close' ).apply( this, arguments );
			this.remove();
		},
	} );

	acf.newNotice = function ( props ) {
		// ensure object
		if ( typeof props !== 'object' ) {
			props = { text: props };
		}

		// instantiate
		return new Notice( props );
	};

	var noticeManager = new acf.Model( {
		wait: 'prepare',
		priority: 1,
		initialize: function () {
			const $notices = $( '.acf-admin-notice' );

			$notices.each( function () {
				if ( $( this ).data( 'persisted' ) ) {
					let dismissed = acf.getPreference( 'dismissed-notices' );

					if (
						dismissed &&
						typeof dismissed == 'object' &&
						dismissed.includes( $( this ).data( 'persist-id' ) )
					) {
						$( this ).remove();
					} else {
						$( this ).show();
						$( this ).on( 'click', '.notice-dismiss', function ( e ) {
							dismissed = acf.getPreference( 'dismissed-notices' );
							if ( ! dismissed || typeof dismissed != 'object' ) {
								dismissed = [];
							}
							dismissed.push( $( this ).closest( '.acf-admin-notice' ).data( 'persist-id' ) );
							acf.setPreference( 'dismissed-notices', dismissed );
						} );
					}
				}
			} );
		},
	} );
} )( jQuery );
