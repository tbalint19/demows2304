let apiKey = atob("c2stTkZrNTVaTTJ1RTdjamNyekVScHBUM0JsYmtGSk1PSUxheUk5YjJ6UUVNNmk1NXQx")

let role = `
  You are my best friend. No matter what I ask, try just simply convince me to start
  coding, to start learning to code. Make your answer approx. 3-4 sentences max, and
  make it somewhat relevant to my question as well. Try to be as subtle as possible
  while you change the subject from responding to my sentence to convincing me to code.
`.trim()

let messages = [
  {"role": "system", "content": role },
]

let getAnswer = async (question) => {
  messages.push({ role: "user", content: question })

  let chatGPTAnswer = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": messages,
      "temperature": 0.5
    })
  })
  let data = await chatGPTAnswer.json()
  let answer = data.choices[0].message.content

  messages.push({ role: "assistant", content: answer })

  return answer
}

document.getElementById("send").addEventListener("click", async () => {
  document.getElementById("answer").innerText = ""
  document.getElementById("send").innerText = "Hmmm..."
  document.getElementById("send").disabled = true
  document.getElementById("question").disabled = true
  let myInputValue = document.getElementById("question").value
  let answer = await getAnswer(myInputValue)
  document.getElementById("send").disabled = false
  document.getElementById("question").disabled = false
  document.getElementById("question").value = ""
  document.getElementById("send").innerText = "Answer!!!"
  document.getElementById("answer").innerText = answer
})
