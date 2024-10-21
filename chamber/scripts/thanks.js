document.addEventListener('DOMContentLoaded', function () {
  // Get the URL search parameters
  const urlParams = new URLSearchParams(window.location.search);
  // Get the form information from the URL search parameters
  const firstName = urlParams.get('firstName');
  const lastName = urlParams.get('lastName');
  const email = urlParams.get('email');
  const phone = urlParams.get('mobile');
  const organization = urlParams.get('organization');
  const membership = urlParams.get('membership');
  const timestamp = urlParams.get('timestamp');

  // Display the form information on the page
  document.getElementById('firstName').textContent = firstName;
  document.getElementById('lastName').textContent = lastName;
  document.getElementById('email').textContent = email;
  document.getElementById('phone').textContent = phone;
  document.getElementById('organization').textContent = organization;
  document.getElementById('membership').textContent = membership;
  document.getElementById('timestamp').textContent = new Date(timestamp).toLocaleString();
});