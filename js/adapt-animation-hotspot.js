/*
 * adapt-animation-hotspot
 * License - 
 * Maintainers - Kunj B Sharma <kunjsharma@hotmail.com>
 */
define(function (require) {
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');
    var Handlebars = require('handlebars');
    var AnimationHotspot = ComponentView.extend({
        ele: {

        },
        vars: {
            m_nFadeInTime: 2000
        },
        preRender: function () {
            
        },
        events: {
            'click .hotspot':'onHotspotClick'
        },
        postRender: function () {
            this.setReadyStatus();
            if (this.model.get('_animation') == false) {
                this.$(".animation-hotspot-item img").css({
                    "opacity": 1
                });
                this.initHotspots();
                return;
            }
            var _oThisLevel0 = this, _nDelay = Number(this.model.get('_delay')), _nSetTimeOutId;
            this.$(".animation-hotspot-widget").bind('inview', function (event, visible) {
                if (visible == true) {
                    var $item = $(this).find('.animation-hotspot-item img');
                    //var $item = $('.animation-hotspot-item');
                    var _nItems = $item.length;
                    $item.each(function (index) {
                        var _oThisLevel1 = this;
                        _nSetTimeOutId = setTimeout(function() {
                            $(_oThisLevel1).animate({
                                opacity: 1
                            }, {duration: _nDelay, queue: false, complete: function() {
                                if (index == (_nItems - 1)) {
                                    _oThisLevel0.initHotspots();
                                    clearTimeout(_nSetTimeOutId);
                                }
                            } });
                        }, _nDelay * (index/2))
                    });
                }
            });
        },
        initHotspots: function() {
            if (this.model.get('_navigation') == 'linear') {
                this.$('.animation-hotspot-hotspot .hotspot').eq(0).show();
                this.$('.animation-hotspot-highlight img').eq(0).fadeIn(this.vars.m_nFadeInTime);
                //this.$('.animation-hotspot-highlight img').eq(0).show().pulse({opacity : 0}, { pulses : 3 });
            } else {
                this.$('.animation-hotspot-hotspot .hotspot').show();
                this.$('.animation-hotspot-highlight img').fadeIn(this.vars.m_nFadeInTime);
                //this.$('.animation-hotspot-highlight img').show().pulse({opacity : 0}, { pulses : 3 });
            }
        },
        onHotspotClick: function(event) {
            var _oTarget = $(event.currentTarget), _nIndex = _oTarget.index(), _oPopup;

            if(this.model.get('_navigation') == 'linear') {
                if(!_oTarget.hasClass('visited')) {
                    this.$('.animation-hotspot-highlight img').eq(_nIndex+1).fadeIn(this.vars.m_nFadeInTime);
                    //this.$('.animation-hotspot-highlight img').eq(_nIndex+1).show().pulse({opacity : 0}, { pulses : 3 });
                    this.$('.animation-hotspot-hotspot .hotspot').eq(_nIndex+1).show();
                }
            }
            
            _oTarget.addClass('visited');
            this.$('.animation-hotspot-highlight img').eq(_nIndex).fadeOut(200);

            _oPopup = {
                title: "",
                body: this.model.get('_feedback')[_nIndex]
            };

            Adapt.trigger('notify:popup', _oPopup);
            this.setVisited(_nIndex);
        },
        setVisited: function (index) {
            var item = this.model.get('_hotspots')[index];
            item._isVisited = true;
            this.checkCompletionStatus();
        },
        checkCompletionStatus: function () {
            //if (!this.model.get('_isComplete')) {
            if (this.getVisitedItems().length == this.model.get('_hotspots').length) {
                this.setCompletionStatus();
                //Change instruction on interaction complete if required.
                this.$('.hotspot-instruction').html(this.$('.hotspot-instruction').data('next-instruction'));
            }
            //}
        },
        getVisitedItems: function () {
            return _.filter(this.model.get('_hotspots'), function (item) {
                return item._isVisited;
            });
        }
    });
    Adapt.register("animation-hotspot", AnimationHotspot);
});


/*global jQuery*/
/*jshint curly:false*/

;(function ( $, window) {
  "use strict";

  var defaults = {
      pulses   : 5,
      interval : 100,
      duration : 1550
    };

  $.fn.pulse = function(properties, options, callback) {
    // $(...).pulse('destroy');
    var stop = properties === 'destroy';

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    options = $.extend({}, defaults, options);

    if (!(options.interval >= 0))    options.interval = 0;
    if (!(options.returnDelay >= 0)) options.returnDelay = 0;
    if (!(options.duration >= 0))    options.duration = 500;
    if (!(options.pulses >= -1))     options.pulses = 1;
    if (typeof callback !== 'function') callback = function(){};

    return this.each(function () {
      var el = $(this),
          property,
          original = {};

      var data = el.data('pulse') || {};
      data.stop = stop;
      el.data('pulse', data);

      for (property in properties) {
        if (properties.hasOwnProperty(property)) original[property] = el.css(property);
      }

      var timesPulsed = 0;

      var fromOptions = $.extend({}, options);
      fromOptions.duration = options.duration / 2;
      fromOptions.complete = function() {
        window.setTimeout(animate, options.interval);
      };

      var toOptions = $.extend({}, options);
      toOptions.duration = options.duration / 2;
      toOptions.complete = function(){
        window.setTimeout(function(){
          el.animate(original, fromOptions);
        },options.returnDelay);
      };

      function animate() {
        if (typeof el.data('pulse') === 'undefined') return;
        if (el.data('pulse').stop) return;
        if (options.pulses > -1 && ++timesPulsed > options.pulses) return callback.apply(el);
        el.animate(
          properties,
          toOptions
        );
      }

      animate();
    });
  };

})( jQuery, window, document );