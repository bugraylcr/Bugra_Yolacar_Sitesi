<script>
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
  });
});
	
	
	(function(){
  const track = document.getElementById('projTrack');
  if(!track) return;

  const cards = Array.from(track.querySelectorAll('.proj-card'));
  const leftBtn = document.querySelector('.proj-arrow.left');
  const rightBtn = document.querySelector('.proj-arrow.right');

  let index = 0;

  function visibleCount(){
    return window.matchMedia('(max-width: 900px)').matches ? 1 : 2;
  }

  function cardStep(){
    // 1 kart + gap kadar ilerle
    const first = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap || '0');
    return first.getBoundingClientRect().width + gap;
  }

  function clampIndex(i){
    const max = Math.max(0, cards.length - visibleCount());
    return Math.min(Math.max(0, i), max);
  }

  function render(){
    index = clampIndex(index);
    const x = -(index * cardStep());
    track.style.transform = `translateX(${x}px)`;
  }

  leftBtn && leftBtn.addEventListener('click', () => { index--; render(); });
  rightBtn && rightBtn.addEventListener('click', () => { index++; render(); });

  window.addEventListener('resize', () => { render(); }, {passive:true});
  render();
})();
	
	
	document.addEventListener("DOMContentLoaded", function () {
  const FORM_ID = 157;

  const form = document.querySelector(`#wpforms-form-${FORM_ID}`);
  if (!form) return;

  const container = form.closest(".wpforms-container") || document.body;

  function bringBackForm() {
    const conf = container.querySelector(".wpforms-confirmation-container-full");
    const f = container.querySelector(`#wpforms-form-${FORM_ID}`);

    // confirmation'ı gizle
    if (conf) conf.style.display = "none";

    // formu geri göster
    if (f) {
      f.style.display = "block";
      if (typeof f.reset === "function") f.reset();
      return;
    }

    // form DOM'dan silinmişse son çare: sayfayı yenile
    location.reload();
  }

  function onSuccessDetected() {
    // 10 sn confirmation görünsün (WPForms zaten gösteriyor)
    setTimeout(bringBackForm, 10000);
  }

  // 1) WPForms confirmation DOM'a gelince yakala (en sağlam yöntem)
  const obs = new MutationObserver(() => {
    const conf = container.querySelector(".wpforms-confirmation-container-full");
    if (!conf) return;

    // confirmation görünür hale geldi mi?
    const isVisible = conf.offsetParent !== null && getComputedStyle(conf).display !== "none";
    if (isVisible) {
      onSuccessDetected();
    }
  });

  obs.observe(container, { childList: true, subtree: true });

  // 2) Ek güvenlik: AJAX event gelirse de yakala (bazı sürümlerde çalışır)
  document.addEventListener("wpformsAjaxSubmitSuccess", function (e) {
    try {
      const f = e.detail && e.detail.form;
      if (f && f.id === `wpforms-form-${FORM_ID}`) onSuccessDetected();
    } catch (_) {}
  });
});

	


</script>
