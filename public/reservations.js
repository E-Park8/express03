document.getElementById('addRem').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/tables', {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    id: document.getElementById('id').value })
    .then(({ data }) => {

      document.getElementById('text').value = ''

      let itemElem = document.createElement('li')
      itemElem.classList.add('notDone')
      itemElem.innerHTML = `
        <span>${data.text}</span>
        <button 
          data-id="${data.id}"
          data-done="${data.isDone}"
          class="complete">✓</button>
        <button
          data-id="${data.id}" 
          class="delete">X</button>
      `
      document.getElementById('items').append(itemElem)
    })
    .catch(err => console.error(err))
})

document.addEventListener('click', event => {
  if (event.target.className === 'complete') {

    axios.put(`/api/items/${event.target.dataset.id}`, {
      isDone: event.target.dataset.done === 'false'
    })
      .then(() => {
        if (event.target.dataset.done === 'false') {
          event.target.dataset.done = 'true'
          event.target.parentNode.classList.add('done')
          event.target.parentNode.classList.remove('notDone')
        } else {
          event.target.dataset.done = 'false'
          event.target.parentNode.classList.add('notDone')
          event.target.parentNode.classList.remove('done')
        }
      })
      .catch(err => console.error(err))
  } else if (event.target.className === 'delete') {
    axios.delete(`/api/items/${event.target.dataset.id}`)
      .then(() => {
        event.target.parentNode.remove()
      })
      .catch(err => console.error(err))
  }
})