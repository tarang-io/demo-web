// Smooth scrolling for anchor links and simple booking demo
document.addEventListener('DOMContentLoaded', function(){
  // smooth scroll
  document.querySelectorAll('a[href^="#"], button#bookTop').forEach(function(el){
    el.addEventListener('click', function(e){
      var href = el.getAttribute('href') || '#appointment';
      if(href.startsWith('#')){
        e.preventDefault();
        var target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  toggle && toggle.addEventListener('click', function(){ nav.classList.toggle('open'); });

  // IntersectionObserver for fade-in
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(function(el){ obs.observe(el); });

  // Sticky header shadow
  var header = document.querySelector('.nav-wrap');
  var lastScroll = 0;
  window.addEventListener('scroll', function(){
    if(window.scrollY > 10) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  });

  // Demo booking handler (front-end only)
  window.handleBooking = function(e){
    e.preventDefault();
    var data = new FormData(e.target);
    var summary = 'Booking request:\n';
    summary += 'Name: ' + data.get('name') + '\n';
    summary += 'Phone: ' + data.get('phone') + '\n';
    summary += 'Service: ' + data.get('service') + '\n';
    summary += 'When: ' + data.get('datetime') + '\n\n';
    alert('Thank you! (Demo)\n' + summary + 'This is a front-end demo. Integrate with your backend or Calendly/WhatsApp for real bookings.');
    e.target.reset();
    return false;
  };
});