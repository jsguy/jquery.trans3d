;(function($){
    // Transition 3d plugin
    $.fn.trans3d = function (obj, callback, time) {
        // Grab transform3d values
        // Ref: http://stackoverflow.com/a/31433156
        var getTransform = function (el) {
            var results = $(el).css('transform').match(/matrix(?:(3d)\(-{0,1}\d+\.?\d*(?:, -{0,1}\d+\.?\d*)*(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*)), -{0,1}\d+\.?\d*\)|\(-{0,1}\d+\.?\d*(?:, -{0,1}\d+\.?\d*)*(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*))\))/)

            if (!results) return [0, 0, 0];
            if (results[1] == '3d') return results.slice(2, 5);

            results.push(0);
            return results.slice(5, 8);
        };

        // Apply any given transforms using 3d
        $.each(this, function (idx, el) {
            var $el = $(el),
                t = getTransform(el),
                trans = [],
                getKey = function (i) {
                    return i == 0 ? "x" :
                      i == 1 ? "y" :
                      "z";
                },
                addedTrans = false;
            $.each(t, function (key, value) {
                var objValue = obj[getKey(key)];
                trans.push(typeof objValue !== "undefined" ? objValue : value);
            });
            if (!$el.css("transition")) {
                $el.css("transition", "all " + (typeof time !== "undefined" && time !== null ? time : _animationSpeed) + "ms ease");
                addedTrans = true;
            }
            $el.css("transform", "translate3d(" + trans.join("px,") + "px)");
            $el.one("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function() {
            	if(addedTrans){
            		$el.css("transition", "none");
            	}
                if ($.isFunction(callback)) {
                    callback(el);
                }
            });
        });
    };
}(window.jQuery || window.$));
