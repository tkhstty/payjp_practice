const pay = () => {
  Payjp.setPublicKey(process.env.PAYJP_PUBLIC_KEY)
  const submit = document.getElementById("button")
  submit.addEventListener('click', (e) => {
    e.preventDefault()

    const formRequest = document.getElementById("charge-form")
    const formData = new FormData(formRequest)

    const card = {
      number: formData.get("order[number]"),
      cvc: formData.get("order[cvc]"),
      exp_month: formData.get("order[exp_month]"),
      exp_year: `20${formData.get("order[exp_year]")}`,
    }

    Payjp.createToken(card, (status, response) => {
      if (status == 200) {
        const token = response.id
        const renderDom = document.getElementById("charge-form")
        const tokenObj = `<input value=${token} name='token' type="hidden">`
        renderDom.insertAdjacentHTML("beforeend", tokenObj)
      }

      document.getElementById("order_number").removeAttribute("name")
      document.getElementById("order_cvc").removeAttribute("name")
      document.getElementById("order_exp_month").removeAttribute("name")
      document.getElementById("order_exp_year").removeAttribute("name")

      document.getElementById("charge-form").submit()
    })
  })
}

window.addEventListener('load', pay)