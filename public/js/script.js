// ============================================
// HELPER FUNCTIONS
// ============================================

// Format currency to Indonesian Rupiah
function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
}

// Format date to Indonesian format
function formatDate(dateString) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    locale: 'id-ID'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Show notification/alert
function showAlert(message, type = 'info') {
  const alertTypes = {
    'success': 'alert-success',
    'error': 'alert-danger',
    'warning': 'alert-warning',
    'info': 'alert-info'
  };

  const alertDiv = document.createElement('div');
  alertDiv.className = `alert ${alertTypes[type] || alertTypes['info']} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  // Insert at top of main content
  const main = document.querySelector('main');
  if (main) {
    main.insertBefore(alertDiv, main.firstChild);
  }

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Validate time inputs
function validateTimeInputs(startTime, endTime) {
  if (!startTime || !endTime) {
    showAlert('Jam mulai dan jam selesai harus diisi', 'warning');
    return false;
  }

  if (startTime >= endTime) {
    showAlert('Jam selesai harus lebih besar dari jam mulai', 'error');
    return false;
  }

  return true;
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize Bootstrap popovers
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Add event listener for form submissions if needed
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      // Add form validation here if needed
    });
  });
});

// ============================================
// NAVBAR ACTIVE STATE
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('active');
    }
  });
});

// ============================================
// CONFIRM DELETE
// ============================================

function confirmDelete(message = 'Yakin ingin menghapus data ini?') {
  return confirm(message);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Convert 12-hour time to 24-hour format
function convertTo24Hour(time12) {
  const [time, period] = time12.split(' ');
  let [hours, minutes] = time.split(':');

  if (period === 'PM' && hours !== '12') {
    hours = parseInt(hours) + 12;
  } else if (period === 'AM' && hours === '12') {
    hours = '00';
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

// Format time display
function formatTime(timeString) {
  if (!timeString) return '-';
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
}

// ============================================
// RESPONSIVE UTILITIES
// ============================================

// Check if mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Get viewport width
function getViewportWidth() {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

window.BookingApp = {
  togglePassword: function(elementId) {
    const input = document.getElementById(elementId);
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  },
  formatCurrency: formatCurrency,
  formatDate: formatDate,
  showAlert: showAlert,
  validateTimeInputs: validateTimeInputs,
  confirmDelete: confirmDelete,
  formatTime: formatTime,
  isMobile: isMobile,
  getViewportWidth: getViewportWidth
};
