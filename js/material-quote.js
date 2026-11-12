// Flex roll material and quotation requests go directly to the owner's WhatsApp.
(() => {
  const form = document.getElementById("materialQuoteForm");
  if (!form) return;
  const ownerWhatsApp = "917985803315";
  form.addEventListener("submit", event => {
    event.preventDefault();
    const phone = document.getElementById("mqPhone").value.trim();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।");
      return;
    }
    const file = document.getElementById("mqFile").files[0];
    const data = [
      "नमस्ते Shubad जी, Astha & Lavi Printing Press.",
      "मुझे Flex Material / Quotation के लिए request भेजनी है।",
      "नाम: " + document.getElementById("mqName").value.trim(),
      "मोबाइल: " + phone,
      "Request: " + document.getElementById("mqRequest").value,
      "Material: " + document.getElementById("mqMaterial").value,
      "Roll width: " + (document.getElementById("mqWidth").value || "नहीं बताया"),
      "Quantity: " + (document.getElementById("mqQuantity").value.trim() || "नहीं बताया"),
      "मेरा rate / quotation: " + (document.getElementById("mqRate").value.trim() || "रेट बताएं"),
      "Delivery location: " + (document.getElementById("mqDelivery").value.trim() || "बाद में बताएँगे"),
      "Details: " + (document.getElementById("mqDetails").value.trim() || "नहीं दी"),
      "Attached file: " + (file ? file.name : "कोई फाइल नहीं"),
      file ? "मैं डिजाइन/quotation फाइल WhatsApp chat में अलग से attach करूँगा/करूँगी।" : "",
      "कृपया उपलब्धता, final rate और delivery की जानकारी दें।"
    ].filter(Boolean).join("\\n");
    window.open("https://wa.me/" + ownerWhatsApp + "?text=" + encodeURIComponent(data), "_blank", "noopener,noreferrer");
  });
})();