<script>
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value
  };

  try {
    const response = await fetch("/send", { // <-- changed from localhost
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
  } catch (err) {
    alert("Server error! Please try again later.");
  }
});
</script>
