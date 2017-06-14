/*
 * adapt-animation-hotspot
 * License - 
 * Maintainers - Kunj B Sharma <kunjsharma@hotmail.com>
 */
define(function (require) {
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');
    var AnimationHotspot = ComponentView.extend({
        ele: {
            //Elements cache if required
        },

        vars: {
            m_nFadeInTime: 2000
        },

        events: {
            'click .hotspot':'onHotspotClick'
        },

        preRender: function() {
            // Checks to see if the animation hotspot should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);

                _.each(this.model.get('_hotspots'), function(item) {
                    item._isVisited = false;
                });
            }
        },

        postRender: function () {
            this.setReadyStatus();
            this.animateItems();
        },

        animateItems: function() {
            if (this.model.get('_animation') == false) {
                this.$(".animation-hotspot-item img").css({
                    "opacity": 1
                });
                this.initHotspots();
                return;
            }
            var _oThisLevel0 = this, _nDelay = Number(this.model.get('_delay')), _nTimeOutId;
            this.$(".animation-hotspot-widget").bind('inview', function (event, visible) {
                if (visible == true) {
                    var _oItem = $(this).find('.animation-hotspot-item img'), _nItems = _oItem.length;
                    _oItem.each(function (index) {
                        var _oThisLevel1 = this;
                        _nTimeOutId = setTimeout(function() {
                            $(_oThisLevel1).animate({
                                opacity: 1
                            }, {duration: _nDelay, queue: false, complete: function() {
                                if (index == (_nItems - 1)) {
                                    _oThisLevel0.initHotspots();
                                    clearTimeout(_nTimeOutId);
                                }
                            } });
                        }, _nDelay * (index/2))
                    });
                }
            });
        },

        initHotspots: function() {
            var _nHotspots = this.$('.animation-hotspot-hotspot .hotspot').length;
            if(_nHotspots>0) {
                if (this.model.get('_navigation') == 'linear') {
                    this.$('.animation-hotspot-hotspot .hotspot').eq(0).show();
                    this.$('.animation-hotspot-highlight img').eq(0).fadeIn(this.vars.m_nFadeInTime);
                    //this.$('.animation-hotspot-highlight img').eq(0).show().pulse({opacity : 0}, { pulses : 3 });
                } else {
                    this.$('.animation-hotspot-hotspot .hotspot').show();
                    this.$('.animation-hotspot-highlight img').fadeIn(this.vars.m_nFadeInTime);
                    //this.$('.animation-hotspot-highlight img').show().pulse({opacity : 0}, { pulses : 3 });
                }
            }else {
                this.setCompletionStatus();
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
            if (this.getVisitedItems().length == this.model.get('_hotspots').length) {
                this.setCompletionStatus();
                //Change instruction on interaction complete if required.
                this.$('.hotspot-instruction').html(this.$('.hotspot-instruction').data('next-instruction'));
                this.$('.animation-hotspot-inner').parent().parent().find('.hotspot-instruction').html(this.$('.animation-hotspot-inner').parent().parent().find('.hotspot-instruction').data('next-instruction'));
            }
        },

        getVisitedItems: function () {
            return _.filter(this.model.get('_hotspots'), function (item) {
                return item._isVisited;
            });
        }
    });

    Adapt.register("animation-hotspot", AnimationHotspot);

    return AnimationHotspot;

});