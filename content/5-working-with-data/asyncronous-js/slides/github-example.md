---
type: slide
title: Wikimedia search
---

<script type="module">
const url = "https://en.wikipedia.org/w/api.php"; 
const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: "JavaScript",
    format: "json",
    origin: location.origin
});


const response = await fetch(`${url}?${params}`);
const data = await response.json();
console.log(data);

</script>