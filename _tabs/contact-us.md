---
# the default layout is 'page'
icon: fas fa-info-circle
order: 8
---

<title>Contact Us</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/emailjs-com/3.2.0/email.min.js"></script>
  <style>
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
      }
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}
.header {
  text-align: center;
      margin-bottom: 40px;
  }
  .header h1 {
      color: #333;
      font-size: 2.5em;
      margin-bottom: 15px;
  }
  .header p {
      color: #666;
      font-size: 1.1em;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
  }
  .content-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      justify-content: center;
  }
  .form-container {
      flex: 1;
      min-width: 300px;
      max-width: 600px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      padding: 40px;
  }
  .info-container {
      flex: 1;
      min-width: 300px;
      max-width: 500px;
  }
  .info-box {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      padding: 30px;
      margin-bottom: 20px;
  }
  .info-box h3 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1.2em;
  }
  .info-box p, .info-box li {
      color: #666;
      line-height: 1.6;
      margin-bottom: 10px;
  }
  .info-box ul {
      list-style: none;
  }
  .info-box ul li {
      margin-bottom: 8px;
  }
  .social-links {
      display: flex;
      gap: 15px;
      margin-top: 15px;
  }
  .social-links a {
      color: #4CAF50;
      text-decoration: none;
  }
  .form-group {
      margin-bottom: 20px;
  }
  label {
      display: block;
      margin-bottom: 5px;
      color: #555;
      font-weight: bold;
  }
  input, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      transition: border-color 0.3s ease;
  }
  input:focus, textarea:focus {
      outline: none;
      border-color: #4CAF50;
  }
  textarea {
      height: 150px;
      resize: vertical;
  }
  button {
      background-color: #4CAF50;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      font-size: 16px;
      transition: background-color 0.3s ease;
  }
  button:hover {
      background-color: #45a049;
  }
  .success-message {
      color: #4CAF50;
      text-align: center;
      margin-top: 20px;
      display: none;
  }
  .error-message {
      color: #f44336;
      text-align: center;
      margin-top: 20px;
      display: none;
  }
  @media (max-width: 768px) {
      .content-wrapper {
          flex-direction: column;
      }
      .form-container, .info-container {
          max-width: 100%;
      }
  }
</style>

  <div class="page-container">
      <div class="header">
          <h1>Contact Us</h1>
          <p>Whether you have a question about our services, need technical support, or want to explore how we can work together, we're eager to hear from you. Our dedicated team is ready to assist you with any inquiries you may have.</p>
      </div>

<div class="content-wrapper">
    <div class="form-container">
        <form id="contact-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" name="subject" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
            <div id="success-message" class="success-message">
                Message sent successfully!
            </div>
            <div id="error-message" class="error-message">
                Error sending message. Please try again.
            </div>
        </form>
    </div>

  
  <script>
      // Initialize EmailJS with your user ID
      (function() {
          emailjs.init("jkhppI7gM_PRgxnFo"); // Replace with your EmailJS user ID
      })();

      const form = document.getElementById('contact-form');
      const successMessage = document.getElementById('success-message');
      const errorMessage = document.getElementById('error-message');

      form.addEventListener('submit', function(event) {
          event.preventDefault();

          // Get form data
          const formData = {
              name: document.getElementById('name').value,
              email: document.getElementById('email').value,
              subject: document.getElementById('subject').value,
              message: document.getElementById('message').value
          };

          // Send email using EmailJS
          emailjs.send('service_ajmgjbn', 'template_76l11aq', formData)
              .then(function(response) {
                  // Show success message
                  successMessage.style.display = 'block';
                  errorMessage.style.display = 'none';
                  form.reset();

                  // Hide success message after 5 seconds
                  setTimeout(function() {
                      successMessage.style.display = 'none';
                  }, 5000);
              })
              .catch(function(error) {
                  // Show error message
                  errorMessage.style.display = 'block';
                  successMessage.style.display = 'none';
              });
      });
  </script>
