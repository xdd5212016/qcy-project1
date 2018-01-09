(function($, window, undefined) {
  var $allDropdowns = $();

  $.fn.dropdownHover = function(options) {
    if ("ontouchstart" in document) return this; // don't want to affect chaining

    $allDropdowns = $allDropdowns.add(this.parent());

    return this.each(function() {
      var $this = $(this),
        $parent = $this.parent(),
        defaults = {
          delay: 500,
          hoverDelay: 0,
          instantlyCloseOthers: true
        },
        data = {
          delay: $(this).data("delay"),
          hoverDelay: $(this).data("hover-delay"),
          instantlyCloseOthers: $(this).data("close-others")
        },
        showEvent = "show.bs.dropdown",
        hideEvent = "hide.bs.dropdown",
        settings = $.extend(true, {}, defaults, options, data),
        timeout,
        timeoutHover;

      $parent.hover(
        function(event) {
          // so a neighbor can't open the dropdown
          if (!$parent.hasClass("open") && !$this.is(event.target)) {
            // stop this event, stop executing any code
            // in this callback but continue to propagate
            return true;
          }

          openDropdown(event);
        },
        function() {
          // clear timer for hover event
          window.clearTimeout(timeoutHover);
          timeout = window.setTimeout(function() {
            $this.attr("aria-expanded", "false");
            $parent.removeClass("open");
            $this.trigger(hideEvent);
          }, settings.delay);
        }
      );

      $this.hover(function(event) {
        if (!$parent.hasClass("open") && !$parent.is(event.target)) {
          return true;
        }

        openDropdown(event);
      });

      // handle submenus
      $parent.find(".dropdown-submenu").each(function() {
        var $this = $(this);
        var subTimeout;
        $this.hover(
          function() {
            window.clearTimeout(subTimeout);
            $this.children(".dropdown-menu").show();
            // always close submenu siblings instantly
            $this
              .siblings()
              .children(".dropdown-menu")
              .hide();
          },
          function() {
            var $submenu = $this.children(".dropdown-menu");
            subTimeout = window.setTimeout(function() {
              $submenu.hide();
            }, settings.delay);
          }
        );
      });

      function openDropdown(event) {
        if (
          $this
            .parents(".navbar")
            .find(".navbar-toggle")
            .is(":visible")
        ) {
          // If we're inside a navbar, don't do anything when the
          // navbar is collapsed, as it makes the navbar pretty unusable.
          return;
        }

        // clear dropdown timeout here so it doesnt close before it should
        window.clearTimeout(timeout);
        // restart hover timer
        window.clearTimeout(timeoutHover);

        // delay for hover event.
        timeoutHover = window.setTimeout(function() {
          $allDropdowns.find(":focus").blur();

          if (settings.instantlyCloseOthers === true)
            $allDropdowns.removeClass("open");

          // clear timer for hover event
          window.clearTimeout(timeoutHover);
          $this.attr("aria-expanded", "true");
          $parent.addClass("open");
          $this.trigger(showEvent);
        }, settings.hoverDelay);
      }
    });
  };

  $(document).ready(function() {
    $('[data-hover="dropdown"]').dropdownHover();
  });
})(jQuery, window);
