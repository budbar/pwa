if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker zarejestrowany"))
      .catch(err => console.log("Błąd SW:", err));
  });
}
