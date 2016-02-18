/*! jсarouselFade - v0.1.0 - 2016-02-16
 * Copyright (c) 2016 Evgeniy Pelmenev; Licensed MIT */
(function($) {
    'use strict';
    var animating = false;

    $.jcarousel.fn.fade = function(target, animate, callback) {
        var parsedTarget = $.jCarousel.parseTarget(target);
        var currentTarget = this._target;
        var animationOptions;
        var transitionsOptions = this._options.transitions;
        var oldComplete;
        var nextTarget;
        var itemsCount, index;
        var instance = this;
        var styleBackup;

        if (this._visible.length > 1) {
            // fallback to default method if visible slides more than one
            this.scroll(target, animate, callback);
            return this;
        }

        animate = animate === undefined ? true : animate;
        callback = callback || $.noop;

        if ($.isFunction(animate)) {
            callback = animate;
            animate  = true;
        }

        if (parsedTarget.relative) {
            itemsCount = this.items().length;
            index = this.index(this._target) + parsedTarget.target;

            if (this._options.wrap === 'last' && index < 0) {
                index = 0;
            } else if (this._options.wrap === 'first' && index >= itemsCount) {
                index = itemsCount - 1;
            } else if (!this._options.wrap) {
                index = Math.max(0, Math.min(index, itemsCount - 1));
            } else {
                index = index % itemsCount;
            }

            nextTarget = this.items().eq(index);
        } else {
            nextTarget = $.isNumeric(parsedTarget.target) ? this.items().eq(parsedTarget.target) : parsedTarget.target;
        }

        if (currentTarget.is(nextTarget) || animating) {
            if ($.isFunction(callback)) {
                callback.call(this, false);
            }

            return this;
        }

        if (false === this._trigger('scroll', null, [target, animate])) {
            return this;
        }

        if ($.isPlainObject(this._options.animation)) {
            animationOptions = $.extend({}, this._options.animation);
        } else {
            animationOptions = {
                duration: this._options.animation
            };
        }

        if (animationOptions.complete) {
            oldComplete = this._options.animation.complete;
        }

        animationOptions.complete = function() {
            currentTarget.removeAttr('style');
            if (styleBackup) {
                currentTarget.attr('style', styleBackup);
            }
            animating = false;
            if ($.isFunction(oldComplete)) oldComplete();
            instance._trigger('animateend');
            callback.call(this, true);
        };

        this._prepare(nextTarget);

        _animate();

        this._trigger('scrollend');

        function _animate() {
            var css = {
                position: 'relative'
            };

            if (false === instance._trigger('animate')) {
                callback.call(instance, false);
                return this;
            }

            styleBackup = currentTarget.attr('style');

            _setListPosition(nextTarget.position()[instance.lt] * -1);

            if (!animate) {
                animationOptions.duration = 0;
            }

            css[instance.lt] = (currentTarget.position()[instance.lt] + instance.list().position()[instance.lt]) * -1 + 'px';
            currentTarget.css(css);

            animating = true;
            if (!transitionsOptions) {
                currentTarget.animate({opacity: 0}, animationOptions);
            } else {
                currentTarget
                    .one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', animationOptions.complete)
                    .css({
                        transitionDuration: (animationOptions.duration / 1000) + 's',
                        transitionTimingFunction: transitionsOptions.easing || animationOptions.easing,
                        transitionProperty: 'opacity',
                        opacity: 0
                    });
            }
        }

        function _setListPosition(position) {
            var option       = instance.options('transitions');
            var transforms   = !!option.transforms;
            var transforms3d = !!option.transforms3d;
            var css = {};
            var isLeft = instance.lt === 'left';
            position = position || 0;

            if (transforms3d) {
                css.transform = 'translate3d(' + (isLeft ? position : 0) + 'px, ' + (isLeft ? 0 : position) + 'px, 0)';
            } else if (transforms) {
                css.transform = 'translate(' + (isLeft ? position : 0) + 'px ,' + (isLeft ? 0 : position) + 'px)';
            } else {
                css[instance.lt] = position;
            }

            instance.list().css(css);
        }
    };
}(jQuery));
