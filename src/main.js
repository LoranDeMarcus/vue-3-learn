import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
import router from '@/router/router'
const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

app
  .use(router)
  .mount('#app')

// https://www.youtube.com/watch?v=XzLuMtDelGk&t=44s 2.08.00