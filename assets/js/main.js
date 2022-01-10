var windows = $(window);
$.fn.elExists = function () {
  return this.length > 0;
};

/*----------------------------------------*/
/*  Preloader  
/*----------------------------------------*/
windows.on("load", function () {
  $(".preloader-activate").removeClass("preloader-active");
});
jQuery(window).on("load", function () {
  setTimeout(function () {
    jQuery(".open_tm_preloader").addClass("loaded");
  }, 400);
});

$(document).ready(function () {
  $(".blog-container__pagination--item").on("click", function () {
    $(".blog-container__pagination--item.active").removeClass("active");
    $(this).addClass("active");
  });
  /*----------------------------------------*/
  /*  Check if element exists
  /*----------------------------------------*/
  $.fn.elExists = function () {
    return this.length > 0;
  };
  /*----------------------------------------*/
  /*  Main left bar
  /*----------------------------------------*/
  var $this = $(".left-bar__category");
  if ($this.find("div").length > 5) {
    $this.append(
      '<p><a href="javascript:;" class="cat-action showMore d-block"><i class="fa fa-angle-double-down d-block text-center pt-15" aria-hidden="true"></i></a></p>'
    );
  }

  $(".left-bar__category > div").slice(0, 6).addClass("shown");
  $(".left-bar__category > div").not(".shown").addClass("d-none");
  $(".left-bar__category .cat-action").on("click", function () {
    if ($(this).hasClass("showMore") == true) {
      $(".left-bar__category > div").not(".shown").removeClass("d-none");
      $(this).toggleClass("showLess").toggleClass("showMore");
      $(this)
        .find("i")
        .toggleClass("fa-angle-double-up")
        .toggleClass("fa-angle-double-down");
    } else {
      $(".left-bar__category > div").not(".shown").addClass("d-none");
      $(this).toggleClass("showLess").toggleClass("showMore");
      $(this)
        .find("i")
        .toggleClass("fa-angle-double-up")
        .toggleClass("fa-angle-double-down");
    }
  });
  //fix dynamic image
  var itemW = $(".item-dynamic").width();
  $(".item-dynamic").css({ height: itemW + 20 + "px" });
  var introW = $(".intro-content img").width();
  $(".intro-content img").css({ height: introW + "px" });
  if ($("body.template-product").length != 0) {
    let imgMain = $(".product-image-lg").width();
    $(".product-image-lg, .product-image-lg .carousel-item").css({
      height: imgMain + "px",
    });
    $(".product-image-lg img").css({ height: "100%" }, { width: "100%" });
  }
  //change link mobile
  if ($(document).width() < 993) {
    $("a").each(function () {
      $(this).attr("href").includes("index.html") == true
        ? $(this).attr("href", "/index.html")
        : null;
    });
  }
  //change grid or list product category
  if ($("body.template-category").length != 0) {
    $("button.list-products").click(function () {
      $(".category-products").hasClass("list-active") == false
        ? $(".category-products")
            .removeClass("grid-active row-cols-2 row-cols-lg-3 row-cols-xl-4")
            .addClass("list-active")
        : null;
      $("button.grid-products").removeClass("active");
      $(this).hasClass("active") == true ? null : $(this).addClass("active");
    });
    $("button.grid-products").click(function () {
      $(".category-products").hasClass("grid-active") == false
        ? $(".category-products")
            .addClass("grid-active row-cols-2 row-cols-lg-3 row-cols-xl-4")
            .removeClass("list-active")
        : null;
      $("button.list-products").removeClass("active");
      $(this).hasClass("active") == true ? null : $(this).addClass("active");
    });
  }
});

/*---------------------------------------
Header Sticky
---------------------------------*/
var prevScrollpos = $(window).scrollTop();
$(window).on("scroll", function () {
  var currentScrollPos = $(window).scrollTop();
  if ($(document).width() > 992 && currentScrollPos < 200) {
    $("header").removeClass("sticky");
  } else if ($(document).width() < 992 && currentScrollPos < 80) {
    $("header").removeClass("sticky");
  } else if (prevScrollpos > currentScrollPos) {
    $("header").hasClass("sticky") == true
      ? null
      : $("header").addClass("sticky");
  } else {
    $("header").removeClass("sticky");
  }
  prevScrollpos = currentScrollPos;
});

var footer_width = $(".footer.container").width();
var fW = `calc(( 100vw - ${footer_width}px - 30px)/2)`;

$(".black-bg").css("width", fW);
/*----------------------------------------*/
/*  HasSub Item
/*----------------------------------------*/
$(".hassub-item li.hassub a, .frequently-item li.has-sub a").on(
  "click",
  function () {
    $(this).removeAttr("href");
    var element = $(this).parent("li");
    if (element.hasClass("open")) {
      element.removeClass("open");
      element.find("li").removeClass("open");
      element.find("ul").slideUp();
    } else {
      element.addClass("open");
      element.children("ul").slideDown();
      element.siblings("li").children("ul").slideUp();
      element.siblings("li").removeClass("open");
      element.siblings("li").find("li").removeClass("open");
      element.siblings("li").find("ul").slideUp();
    }
  }
);
/*------------------------------------
	Toolbar Button
	------------------------------------- */
var $overlay = $(".global-overlay");
$(".toolbar-btn").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);
  var target = $this.attr("href");
  var prevTarget = $this
    .parent()
    .siblings()
    .children(".toolbar-btn")
    .attr("href");
  $(target).toggleClass("open");
  $(prevTarget).removeClass("open");
  $($overlay).addClass("overlay-open");
  // $("#mobileMenu").show(200);
});
var $toggle_footer = $(".toggle-footer");
if ($(document).width() < 993) {
  //fix header scroll
  $("header").css("overflow-x", "hidden");
  $toggle_footer.on("click", function (e) {
    if ($(this).hasClass("active") == true) {
      $(this).removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(this).addClass("active");
      $(this).parent().addClass("active");
    }
  });
} else {
  $("html").css("overflow-x", "hidden");
}

/*----------------------------------------*/
/*  Click on Documnet
/*----------------------------------------*/
var $body = $(".global-overlay");

$body.on("click", function (e) {
  var $target = e.target;
  var dom = $(".main-wrapper").children();

  if (!$($target).is(".toolbar-btn") && !$($target).parents().is(".open")) {
    dom.removeClass("open");
    dom.find(".open").removeClass("open");
    $overlay.removeClass("overlay-open");
  }
});

/*----------------------------------------*/
/*  Close Button Actions
/*----------------------------------------*/
$(".button-close").on("click", function (e) {
  var dom = $(".main-wrapper").children();
  e.preventDefault();
  var $this = $(this);
  $this.parents(".open").removeClass("open");
  $(".global-overlay").removeClass("overlay-open");
});

/*----------------------------------------*/
/*  Offcanvas
/*----------------------------------------*/
var $offcanvasNav = $(".mobile-menu, .offcanvas-minicart_menu"),
  $offcanvasNavWrap = $(
    ".mobile-menu_wrapper, .offcanvas-minicart_wrapperm, .offcanvas-search_wrapper"
  ),
  $offcanvasNavSubMenu = $offcanvasNav.find(".sub-menu"),
  $menuToggle = $(".menu-btn"),
  $menuClose = $(".button-close");

$offcanvasNavSubMenu.slideUp();

$offcanvasNav.on("click", "li a, li .menu-expand", function (e) {
  var $this = $(this);
  if (
    $this
      .parent()
      .attr("class")
      .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
    ($this.attr("href") === "#" ||
      $this.attr("href") === "" ||
      $this.hasClass("menu-expand"))
  ) {
    e.preventDefault();
    if ($this.siblings("ul:visible").length) {
      $this.siblings("ul").slideUp("slow");
    } else {
      $this.closest("li").siblings("li").find("ul:visible").slideUp("slow");
      $this.closest("li").siblings("li").removeClass("menu-open");
      $this.siblings("ul").slideDown("slow");
      $this.parent().siblings().children("ul").slideUp();
    }
  }
  if (
    $this.is("a") ||
    $this.is("span") ||
    $this.attr("class").match(/\b(menu-expand)\b/)
  ) {
    $this.parent().toggleClass("menu-open");
  } else if (
    $this.is("li") &&
    $this.attr("class").match(/\b('menu-item-has-children')\b/)
  ) {
    $this.toggleClass("menu-open");
  }
});

$(".button-close").on("click", function (e) {
  e.preventDefault();
  $(".mobile-menu .sub-menu").slideUp();
  $(".mobile-menu .menu-item-has-children").removeClass("menu-open");
});
function changeTitle(text) {
  $("#titleContent").text(text);
  $("#subBreadcrumb").text(text);
}

/*----------------------------------------*/
/*  QTY Button
/*----------------------------------------*/
$(".cart-plus-minus").append(
  '<div class="dec qtybutton"><i class="fa fa-minus"></i></div><div class="inc qtybutton"><i class="fa fa-plus"></i></div>'
);
$(".qtybutton").on("click", function () {
  var $button = $(this);
  var oldValue = $button.parent().find("input").val();
  if ($button.hasClass("inc")) {
    var newVal = parseFloat(oldValue) + 1;
  } else {
    // Don't allow decrementing below zero
    if (oldValue > 1) {
      var newVal = parseFloat(oldValue) - 1;
    } else {
      newVal = 1;
    }
  }
  $button.parent().find("input").val(newVal);
});

/* ---Single Product Slider--- */
if ($(".single-product-slider").elExists()) {
  const multipleSwiperSlides = function () {
    let sliderMain = document.querySelectorAll(".single-product-slider");
    let sliderNav = document.querySelectorAll(".single-product-thumbs");

    let mainArray = [];
    let navArray = [];

    sliderMain.forEach(function (element, i) {
      mainArray.push(
        new Swiper(element, {
          loop: true,
          loopedSlides: 3,
          spaceBetween: 1,
        })
      );
    });

    sliderNav.forEach(function (element, i) {
      var self = sliderNav;
      navArray.push(
        new Swiper(element, {
          slidesPerView: 3,
          loop: true,
          loopedSlides: 3,
          slideToClickedSlide: true,
          spaceBetween: 10,
          navigation: {
            nextEl: ".thums-product-n",
            prevEl: ".thums-product-p",
          },
          breakpoints: {
            991: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          },
        })
      );
    });

    const checkOnPage = function () {
      if (sliderMain.length > 0 && sliderNav.length > 0) {
        let numberOfSlides = mainArray.length || navArray.length || 0;
        for (let i = 0; i < numberOfSlides; i++) {
          mainArray[i].controller.control = navArray[i];
          navArray[i].controller.control = mainArray[i];
        }
      }
    };

    checkOnPage();
  };

  multipleSwiperSlides();
}

/* ---Modal Slider--- */
if ($(".modal-slider").elExists()) {
  var mySwiper = new Swiper(".modal-slider", {
    autoplay: false,
    delay: 5000,
    slidesPerView: 1,
    slidesPerGroup: 1,
    observer: true,
    observeParents: true,
    loop: false,
    navigation: {
      nextEl: ".thumbs-button-next",
      prevEl: ".thumbs-button-prev",
    },
  });
}
/* ---feedback Slider--- */
if ($(".feedbacks-bottom").elExists()) {
  var mySwiper = new Swiper(".feedbacks-bottom", {
    autoplay: true,
    delay: 1000,
    slidesPerView: 1,
    slidesPerGroup: 1,
    // observer: true,
    // observeParents: true,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
    },
  });
}
/* ---Scene--- */
$(".scene").each(function () {
  new Parallax($(this)[0]);
});
/*------------------------------------
	    Magnific Popup
	  ------------------------------------- */

if ($(".gallery-popup").elExists()) {
  $(".gallery-popup").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });
}

/*----------------------------------------*/
/*  ion Range Slider 
/*----------------------------------------*/
$(".pronia-range-slider").ionRangeSlider({
  postfix: "k",
});
$(".mac365-range-dashboard").ionRangeSlider({
  postfix: " point",
});
