$(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 70, disable: reduce });
  $('#year').text(new Date().getFullYear());

  // Navbar state + back to top
  var $nav = $('#nav'), $top = $('#toTop');
  function onScroll() {
    var y = window.scrollY;
    $nav.toggleClass('scrolled', y > 60);
    $top.toggleClass('show', y > 600);
  }
  $(window).on('scroll', onScroll); onScroll();
  $top.on('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  // Smooth scroll + close mobile menu
  $('a[href^="#"]').on('click', function (e) {
    var id = this.getAttribute('href');
    if (id.length < 2 || !$(id).length) return;
    e.preventDefault();
    var menu = bootstrap.Offcanvas.getInstance(document.getElementById('menu'));
    if (menu) menu.hide();
    $('html, body').stop().animate({ scrollTop: $(id).offset().top - 70 }, reduce ? 0 : 700);
    history.replaceState(null, '', id);
  });

  // Active navigation
  var sections = $('main section[id], header[id]');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          $('.navbar-nav .nav-link').removeClass('active');
          $('.navbar-nav .nav-link[href="#' + en.target.id + '"]').addClass('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.each(function () { spy.observe(this); });
  }

  // Count-up (years since 2007 is calculated; team size is approximate)
  function countUp($el, to) {
    if (reduce) { $el.text(to); return; }
    $({ n: 0 }).animate({ n: to }, { duration: 1800, easing: 'swing', step: function (v) { $el.text(Math.floor(v)); }, complete: function () { $el.text(to); } });
  }
  var yrs = new Date().getFullYear() - 2007;
  $('[data-count="years"]').text(yrs);
  var done = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en, ob) {
      if (en[0].isIntersecting && !done) {
        done = true;
        countUp($('[data-count="years"]'), yrs);
        countUp($('[data-count="40"]'), 40);
        countUp($('[data-count="3"]'), 3);
        ob.disconnect();
      }
    }, { threshold: .4 }).observe(document.querySelector('.stats'));
  }

  // Gallery lightbox
  var modal = new bootstrap.Modal(document.getElementById('lightbox'));
  $('.gal').on('click', function (e) {
    e.preventDefault();
    var $img = $(this).find('img');
    if (!$img.length) return; // no photo added yet
    $('#lightboxImg').attr({ src: this.href, alt: $img.attr('alt') });
    $('#lightboxCap').text($(this).data('title'));
    modal.show();
  });

  // Enquiry form: validate, then open WhatsApp with the message
  $('#enquiryForm').on('submit', function (e) {
    e.preventDefault();
    this.classList.add('was-validated');
    if (!this.checkValidity()) {
      $(this).find(':invalid').first().trigger('focus');
      return;
    }
    var text = 'Hello Kom Handicrafts,%0A' +
      'Name: ' + encodeURIComponent($('#name').val().trim()) + '%0A' +
      'Email: ' + encodeURIComponent($('#email').val().trim()) + '%0A' +
      'Phone: ' + encodeURIComponent($('#phone').val().trim()) + '%0A' +
      'Interested in: ' + encodeURIComponent($('#interest').val()) + '%0A' +
      'Message: ' + encodeURIComponent($('#message').val().trim());
    window.open('https://wa.me/919694459572?text=' + text, '_blank', 'noopener');
    $('#formOk').removeClass('d-none');
    this.reset();
    this.classList.remove('was-validated');
  });
});
