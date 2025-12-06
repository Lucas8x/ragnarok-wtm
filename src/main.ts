import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import './locales/i18n'
import {  waitLocale } from 'svelte-i18n'

await waitLocale();

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
