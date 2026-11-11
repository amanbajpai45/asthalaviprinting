// WhatsApp order form for Astha & Lavi Printing Press
const BUSINESS_WHATSAPP = "919696549118";
const form = document.getElementById("orderForm");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const service = document.getElementById("serviceType").value;
    const quantity = document.getElementById("quantity").value;
    const requirements = document.getElementById("requirements").value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें। / Please enter a valid 10-digit mobile number.");
      return;
    }
    const message = [
      "नमस्ते Astha & Lavi Printing Press!",
      "मुझे प्रिंटिंग का ऑर्डर देना है।",
      `नाम / Name: ${name}`,
      `मोबाइल / Mobile: ${phone}`,
      `सेवा / Service: ${service}`,
      `मात्रा / Quantity: ${quantity}`,
      `अन्य जानकारी / Requirements: ${requirements || "Not provided"}`,
      "कृपया कीमत और आगे की प्रक्रिया बताएं। धन्यवाद!"
    ].join("\n");
    window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}
