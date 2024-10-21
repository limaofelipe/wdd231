document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.card').forEach(trigger => {
      trigger.addEventListener('click', () => {
          const dialog = document.getElementById(trigger.dataset.dialog);
          dialog.showModal();
      });
  });

  document.querySelectorAll('.modal-close').forEach(close => {
      close.addEventListener('click', () => {
          close.closest('dialog').close();
      });
  });

  document.querySelectorAll('dialog').forEach(dialog => {
      dialog.addEventListener('click', (event) => {
          if (event.target === dialog) {
              dialog.close();
          }
      });
  });

  document.getElementById('timestamp').value = new Date().toISOString();
});