// COMPLAI — main app bootstrapper
// All logic is in inspector.js and tools.js
// All data is in data.js

document.addEventListener('DOMContentLoaded', function() {
  console.log('COMPLAI v3.0 loaded');
  // Init document generator fields
  if (typeof updateDocTemplate === 'function') updateDocTemplate();
});
