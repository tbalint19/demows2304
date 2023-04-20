let apiKey = atob("c2stTkZrNTVaTTJ1RTdjamNyekVScHBUM0JsYmtGSk1PSUxheUk5YjJ6UUVNNmk1NXQx")

let getAnswer = async (question) => {

  let chatGPTAnswer = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {"role": "system", "content": "you are my best friend, and whatever i ask, respond with max 2 sentences that convinces me to start coding"},
        {"role": "user", "content": question}
      ],
      "temperature": 0.7
    })
  })
  let data = await chatGPTAnswer.json()
  let answer = data.choices[0].message.content

  return answer
}

document.getElementById("send").addEventListener("click", async () => {
  let myInputValue = document.getElementById("question").value
  let answer = await getAnswer(myInputValue)
  document.getElementById("answer").innerText = answer
})

