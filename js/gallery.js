// Browser-local gallery image manager. Shared hosting requires a server/cloud storage backend.
(() => {
  const KEY = "alPressGalleryImagesV1";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (_) { return []; } };
  const render = (target, canDelete) => {
    if (!target) return;
    target.innerHTML = "";
    read().forEach((item, index) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = item.data; img.alt = item.name || "Customer printing work"; img.loading = "lazy";
      const caption = document.createElement("figcaption"); caption.textContent = item.name || "Our Work";
      figure.append(img, caption);
      if (canDelete) {
        const btn = document.createElement("button"); btn.type = "button"; btn.className = "btn btn-dark gallery-delete";
        btn.textContent = "Delete";
        btn.addEventListener("click", () => {
          const list = read(); list.splice(index, 1); localStorage.setItem(KEY, JSON.stringify(list));
          render(document.getElementById("adminGalleryPreview"), true);
        });
        figure.append(btn);
      }
      target.append(figure);
    });
  };
  const gallery = document.getElementById("customerGalleryUploads");
  if (gallery) render(gallery, false);
  const input = document.getElementById("galleryImageInput");
  const save = document.getElementById("saveGalleryImages");
  const status = document.getElementById("galleryUploadStatus");
  const preview = document.getElementById("adminGalleryPreview");
  if (input && save && status && preview) {
    render(preview, true);
    save.addEventListener("click", async () => {
      const chosen = Array.from(input.files || []);
      if (!chosen.length) { status.textContent = "पहले फोटो चुनें।"; return; }
      const list = read();
      for (const file of chosen) {
        if (!file.type.startsWith("image/")) continue;
        try {
          const data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const image = new Image();
              image.onload = () => {
                const canvas = document.createElement("canvas");
                const max = 1500, scale = Math.min(1, max / Math.max(image.width, image.height));
                canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
                canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/jpeg", 0.82));
              };
              image.onerror = reject; image.src = reader.result;
            };
            reader.onerror = reject; reader.readAsDataURL(file);
          });
          list.push({name: file.name.replace(/\.[^.]+$/, ""), data});
        } catch (_) {}
      }
      try {
        localStorage.setItem(KEY, JSON.stringify(list));
        status.textContent = chosen.length + " फोटो इस डिवाइस में सेव हुईं। Gallery पेज खोलकर देखें।";
        input.value = ""; render(preview, true);
      } catch (_) {
        status.textContent = "Browser storage भर गया है। कम या छोटी फोटो चुनें।";
      }
    });
  }
})();
