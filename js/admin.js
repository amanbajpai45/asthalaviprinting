// Demo only: saves an announcement in this browser's local storage.
const input = document.getElementById("announcementInput");
const save = document.getElementById("saveAnnouncement");
const output = document.getElementById("savedAnnouncement");
if (input && save && output) {
  input.value = localStorage.getItem("alPressAnnouncement") || "";
  if (input.value) output.textContent = "Saved announcement on this device: " + input.value;
  save.addEventListener("click", () => {
    const value = input.value.trim();
    localStorage.setItem("alPressAnnouncement", value);
    output.textContent = value ? "Announcement saved on this device." : "Announcement cleared.";
  });
}
