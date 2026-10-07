(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.ColeStudio = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var SERVICE_DETAILS = {
    "Natural manicure": {
      description: "A gentle reset for natural nails, from thoughtful shaping and cuticle care to a clean, polished finish.",
      time: "About 50 minutes",
      includes: "Shape, cuticle care, polish",
      best: "A simple, restorative refresh",
      accent: "var(--coral)"
    },
    "Painted nail details": {
      description: "A natural manicure finished with small, hand-painted accents designed around your colors and point of view.",
      time: "About 75 minutes",
      includes: "Full manicure, custom painted accents",
      best: "A personal detail or playful color story",
      accent: "var(--cobalt)"
    },
    "Nail care and repair": {
      description: "Focused natural-nail care for breakage, peeling, or a nail that needs a little more patient attention.",
      time: "About 40 minutes",
      includes: "Assessment, gentle care, repair plan",
      best: "Getting natural nails back on track",
      accent: "var(--marigold)"
    }
  };

  var SILK_SLIDES = [
    { src: "img-02.jpg", caption: "Color studies", alt: "Flowing painted silk studies in coral, gold, teal, and blue" },
    { src: "img-03.jpg", caption: "Coral & marigold detail", alt: "Close view of coral and marigold painted silk studies" },
    { src: "img-04.jpg", caption: "Teal & cobalt detail", alt: "Close view of teal and cobalt painted silk studies" }
  ];

  function getServiceDetail(service) {
    var known = Object.prototype.hasOwnProperty.call(SERVICE_DETAILS, service);
    var title = known ? service : "Natural manicure";
    var detail = SERVICE_DETAILS[title];
    return {
      title: title,
      description: detail.description,
      time: detail.time,
      includes: detail.includes,
      best: detail.best,
      accent: detail.accent
    };
  }

  function wrapIndex(index, length) {
    if (!length) return 0;
    return ((index % length) + length) % length;
  }

  function buildBookingRequest(input) {
    var date = input && input.date;
    if (!date) return "";
    var service = String(input.service || "Natural manicure").toLowerCase();
    var time = String(input.timeOfDay || "Morning").toLowerCase();
    var formatted = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    return "Hi Cole, I’d like to request a " + service + " appointment on " + formatted + " in the " + time + ". Please let me know what you have available.";
  }

  function buildSilkInquiry(caption) {
    return "Hi Cole, I’m interested in the silk “" + caption + ".” Could you share availability and purchase details?";
  }

  function galleryToggleLabel(showGrid) {
    return showGrid ? "Detail view" : "View all";
  }

  function showToast(toast, message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 1800);
  }

  function copyText(text, toast, message) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(function () {
      showToast(toast, message);
    });
  }

  function init(root) {
    var doc = root || document;
    var dialog = doc.getElementById("booking-dialog");
    var careDialog = doc.getElementById("care-dialog");
    var silkDialog = doc.getElementById("silk-dialog");
    var notesDialog = doc.getElementById("notes-dialog");
    if (!dialog || !careDialog || !silkDialog) return;

    var form = doc.getElementById("booking-form");
    var preview = doc.getElementById("request-preview");
    var copy = doc.getElementById("copy-request");
    var toast = doc.getElementById("toast");
    var bookingServiceDetail = doc.getElementById("booking-service-detail");
    var silkImage = doc.getElementById("silk-gallery-image");
    var silkCount = doc.getElementById("silk-gallery-count");
    var silkDetailView = doc.getElementById("silk-detail-view");
    var silkGridView = doc.getElementById("silk-grid-view");
    var silkViewToggle = doc.getElementById("silk-view-toggle");
    var silkInquiryPanel = doc.getElementById("silk-inquiry-panel");
    var silkInquiryTitle = doc.getElementById("silk-inquiry-title");
    var requestText = "";
    var silkIndex = 0;

    function updateServiceDetail(service) {
      var detail = getServiceDetail(service);
      doc.getElementById("booking-service-title").textContent = detail.title;
      doc.getElementById("booking-service-description").textContent = detail.description;
      doc.getElementById("booking-service-time").textContent = detail.time;
      doc.getElementById("booking-service-includes").textContent = detail.includes;
      doc.getElementById("booking-service-best").textContent = detail.best;
      bookingServiceDetail.style.setProperty("--service-accent", detail.accent);
    }

    function showSilkSlide(index) {
      silkIndex = wrapIndex(index, SILK_SLIDES.length);
      var slide = SILK_SLIDES[silkIndex];
      silkImage.src = slide.src;
      silkImage.alt = slide.alt;
      silkCount.textContent = (silkIndex + 1) + " / " + SILK_SLIDES.length;
      silkInquiryTitle.textContent = "Ask about " + slide.caption;
      silkInquiryPanel.classList.remove("show");
    }

    function setSilkGridView(showGrid) {
      silkDetailView.hidden = showGrid;
      silkGridView.classList.toggle("show", showGrid);
      silkDialog.classList.toggle("silk-grid-open", showGrid);
      silkViewToggle.setAttribute("aria-pressed", String(showGrid));
      silkViewToggle.textContent = galleryToggleLabel(showGrid);
    }

    function resetBookingPreview() {
      requestText = "";
      preview.textContent = "";
      preview.classList.remove("show");
      copy.hidden = true;
      doc.getElementById("make-request").textContent = "Create request";
    }

    function openBooking(service) {
      if (service) {
        var option = form.querySelector('input[name="service"][value="' + service + '"]');
        if (option) option.checked = true;
      }
      resetBookingPreview();
      updateServiceDetail(form.querySelector('input[name="service"]:checked').value);
      if (careDialog.open) careDialog.close();
      dialog.showModal();
    }

    form.querySelectorAll('input[name="service"]').forEach(function (option) {
      option.addEventListener("change", function () {
        if (option.checked) updateServiceDetail(option.value);
      });
    });

    doc.querySelectorAll("[data-book]").forEach(function (button) {
      button.addEventListener("click", function () {
        openBooking(button.getAttribute("data-service"));
      });
    });

    doc.querySelectorAll("[data-silk-gallery]").forEach(function (button) {
      button.addEventListener("click", function () {
        showSilkSlide(0);
        setSilkGridView(false);
        silkDialog.showModal();
      });
    });

    doc.querySelectorAll("[data-nail-care]").forEach(function (button) {
      button.addEventListener("click", function () {
        careDialog.showModal();
      });
    });

    doc.querySelectorAll("[data-studio-notes]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (notesDialog) notesDialog.showModal();
      });
    });

    doc.getElementById("close-silk-gallery").addEventListener("click", function () {
      silkDialog.close();
    });
    doc.getElementById("silk-gallery-prev").addEventListener("click", function () {
      showSilkSlide(silkIndex - 1);
    });
    doc.getElementById("silk-gallery-next").addEventListener("click", function () {
      showSilkSlide(silkIndex + 1);
    });
    silkViewToggle.addEventListener("click", function () {
      setSilkGridView(!silkGridView.classList.contains("show"));
    });
    doc.querySelectorAll("[data-silk-index]").forEach(function (button) {
      button.addEventListener("click", function () {
        showSilkSlide(Number(button.getAttribute("data-silk-index")));
        setSilkGridView(false);
      });
    });
    doc.getElementById("silk-inquire").addEventListener("click", function () {
      silkInquiryPanel.classList.toggle("show");
    });
    doc.getElementById("copy-silk-inquiry").addEventListener("click", function () {
      copyText(buildSilkInquiry(SILK_SLIDES[silkIndex].caption), toast, "Silk inquiry copied");
    });
    silkDialog.addEventListener("click", function (event) {
      if (event.target === silkDialog) silkDialog.close();
    });

    doc.getElementById("close-care").addEventListener("click", function () {
      careDialog.close();
    });
    careDialog.addEventListener("click", function (event) {
      if (event.target === careDialog) careDialog.close();
    });

    if (notesDialog) {
      doc.getElementById("close-notes").addEventListener("click", function () {
        notesDialog.close();
      });
      notesDialog.addEventListener("click", function (event) {
        if (event.target === notesDialog) notesDialog.close();
      });
    }

    doc.getElementById("close-dialog").addEventListener("click", function () {
      dialog.close();
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      requestText = buildBookingRequest({
        service: form.querySelector('input[name="service"]:checked').value,
        date: doc.getElementById("date").value,
        timeOfDay: doc.getElementById("time").value
      });
      if (!requestText) return;
      preview.textContent = requestText;
      preview.classList.add("show");
      copy.hidden = false;
      doc.getElementById("make-request").textContent = "Update request";
    });

    copy.addEventListener("click", function () {
      copyText(requestText, toast, "Booking request copied");
    });
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        init(document);
      });
    } else {
      init(document);
    }
  }

  return {
    SERVICE_DETAILS: SERVICE_DETAILS,
    SILK_SLIDES: SILK_SLIDES,
    getServiceDetail: getServiceDetail,
    wrapIndex: wrapIndex,
    buildBookingRequest: buildBookingRequest,
    buildSilkInquiry: buildSilkInquiry,
    galleryToggleLabel: galleryToggleLabel,
    init: init
  };
});
