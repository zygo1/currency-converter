const heading = document.createElement('h1')
heading.textContent = 'Interesting!'

const app = document.querySelector('#root')
if (!app) throw new Error('Root element #root not found')
app.append(heading)