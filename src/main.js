import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

app.mount('#app')

// https://www.youtube.com/watch?v=XzLuMtDelGk&t=44s 1.32.59