let textArea = document.getElementById('text_to_summarize');
let submitButoon = document.getElementById('submit-button');
let summary = document.getElementById('summary');


submitButoon.disabled = true;

function verifyText(e) {
  console.log("Typing...");

  const text = e.target.value;
  console.log(text + " " + text.length);

  if (text.length > 200 && text.length < 100000) {
    submitButoon.disabled = false;

  }
  else {
    submitButoon.disabled = true;
  }

}

function submitData(e) {
  submitButoon.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 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");

  const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("/summary", requestOptions)
    .then((response) => response.text())
    .then((result) => summary.innerHTML = result)
    .catch((error) => console.error(error));


  submitButoon.classList.remove("submit-button--loading");




}




textArea.addEventListener('input', verifyText)


submitButoon.addEventListener('click', submitData)